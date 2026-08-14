"""
Script d'import des projets GitHub vers la base de données portfolio.

Améliorations v2:
- Récupère les topics GitHub pour enrichir le tech_stack
- Préserve le statut featured défini manuellement
- Génère un contenu markdown plus riche avec les topics
- Affiche un résumé clair de l'import
"""

import sys
from datetime import datetime
import httpx
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.core.config import settings
from app.core.demo_url import is_public_demo_url
from app.models.project import Project

# Mapping de langues GitHub → noms plus lisibles
LANGUAGE_MAP = {
    "Jupyter Notebook": "Python,Jupyter",
    "TypeScript": "TypeScript,Next.js",
    "JavaScript": "JavaScript",
    "Java": "Java,Spring Boot",
    "Python": "Python",
    "Go": "Go",
    "Rust": "Rust",
    "Shell": "Bash",
}


def slugify(name: str) -> str:
    slug = "".join(c if c.isalnum() else "-" for c in name.lower()).strip("-")
    while "--" in slug:
        slug = slug.replace("--", "-")
    return slug


def build_tech_stack(language: str, topics: list[str]) -> str:
    """Construit un tech_stack enrichi à partir du langage et des topics GitHub."""
    techs = set()

    # Langage principal
    if language:
        mapped = LANGUAGE_MAP.get(language, language)
        for t in mapped.split(","):
            techs.add(t.strip())

    # Topics GitHub (filtrage des topics non-tech)
    skip_topics = {"portfolio", "project", "github", "open-source", "hacktoberfest"}
    for topic in topics:
        if topic.lower() not in skip_topics:
            # Capitalisation basique
            pretty = topic.replace("-", " ").title()
            techs.add(pretty)

    result = ",".join(sorted(techs))
    # Limite à 500 chars (contrainte du modèle)
    return result[:497] + "..." if len(result) > 500 else result


def build_content(description: str, language: str, topics: list[str], github_url: str) -> str:
    """Génère un contenu markdown structuré pour la page projet."""
    topics_str = ", ".join(f"`{t}`" for t in topics) if topics else "_non spécifié_"
    lang_str = language or "_non spécifié_"

    return f"""## À propos du projet

{description or "Ce projet fait partie de mes travaux de recherche et réalisations open-source. Retrouvez l'intégralité du code source et de l'architecture sur mon dépôt GitHub ci-dessous."}

## Technologies et fonctionnalités

- **Langage principal** : {lang_str}
- **Topics GitHub** : {topics_str}
"""


def import_github_projects(username: str):
    print(f"🔍 Fetching public repositories for GitHub user: {username}...")

    headers = {
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "FastAPI-Portfolio-Importer/2.0",
    }
    
    # Ajout du token GitHub s'il est présent en config pour éviter le rate limit (60 req/h -> 5000 req/h)
    if settings.GITHUB_TOKEN:
        headers["Authorization"] = f"token {settings.GITHUB_TOKEN}"
        print("🔑 GitHub Token détecté et appliqué aux requêtes API.")

    # 1. Récupère la liste des repos
    try:
        response = httpx.get(
            f"https://api.github.com/users/{username}/repos?per_page=100&sort=updated",
            headers=headers,
            timeout=30,
        )
        response.raise_for_status()
        repos = response.json()
    except Exception as e:
        print(f"❌ Error fetching repos from GitHub: {e}")
        sys.exit(1)

    print(f"📦 Found {len(repos)} public repositories. Importing...\n")

    db: Session = SessionLocal()
    try:
        imported_count = 0
        updated_count = 0
        skipped_forks = 0

        for repo in repos:
            if repo.get("fork"):
                print(f"  ⏭️  {repo['name']} : fork ignoré")
                skipped_forks += 1
                continue

            repo_name = repo["name"]
            slug = slugify(repo_name)
            github_url = repo["html_url"]
            description = repo.get("description") or ""
            language = repo.get("language") or ""
            homepage = repo.get("homepage") or ""

            # Parse year from created_at
            try:
                year = datetime.strptime(repo["created_at"], "%Y-%m-%dT%H:%M:%SZ").year
            except (ValueError, KeyError):
                year = datetime.now().year

            # 2. Récupère les topics GitHub pour ce repo
            topics: list[str] = []
            try:
                topics_res = httpx.get(
                    f"https://api.github.com/repos/{username}/{repo_name}/topics",
                    headers={**headers, "Accept": "application/vnd.github.mercy-preview+json"},
                    timeout=10,
                )
                if topics_res.status_code == 200:
                    topics = topics_res.json().get("names", [])
            except Exception:
                pass  # Topics sont optionnels

            tech_stack = build_tech_stack(language, topics)
            content = build_content(description, language, topics, github_url)

            # Le lien de démo provient uniquement du champ `homepage` de GitHub.
            # Il a existé ici une heuristique qui devinait une URL (port local,
            # Hugging Face Spaces construit à partir du nom du dépôt) : elle
            # produisait des boutons « Tester » pointant vers la machine du
            # visiteur ou vers des pages inexistantes. On ne devine plus.
            if not is_public_demo_url(homepage):
                homepage = ""

            # 3. Upsert en base de données
            project = db.query(Project).filter(
                (Project.slug == slug) | (Project.github_url == github_url)
            ).first()

            if project:
                project.title = repo_name
                
                # N'écrase la description que si celle de GitHub est non vide ET que l'ancienne est courte
                if description and (not project.description or len(project.description) < len(description)):
                    project.description = description
                
                # N'écrase le contenu détaillé que s'il est vide ou trop court en base de données
                if not project.content or len(project.content) < 200:
                    project.content = content
                    
                project.tech_stack = tech_stack
                project.github_url = github_url
                
                # GitHub fait autorité : on pose l'URL quand elle existe, et on
                # purge celle en base si elle n'est plus (ou n'a jamais été)
                # atteignable depuis un navigateur.
                if homepage:
                    project.demo_url = homepage
                elif not is_public_demo_url(project.demo_url):
                    project.demo_url = ""

                project.year = year
                updated_count += 1
                print(f"  🔄 Updated : {repo_name} (featured={project.featured})")
            else:
                project = Project(
                    title=repo_name,
                    slug=slug,
                    description=description or f"Dépôt de code pour {repo_name}. Retrouvez l'architecture et les sources.",
                    content=content,
                    tech_stack=tech_stack,
                    github_url=github_url,
                    demo_url=homepage,
                    year=year,
                    featured=0,
                )
                db.add(project)
                imported_count += 1
                print(f"  ✅ Created  : {repo_name}")

        db.commit()
        print(f"\n{'='*50}")
        print("✅ Import terminé avec succès !")
        print(f"   ➕ Créés    : {imported_count} projets")
        print(f"   🔄 Mis à jour : {updated_count} projets")
        print(f"   ⏭️  Forks ignorés : {skipped_forks}")
        print(f"{'='*50}")

    except Exception as e:
        db.rollback()
        print(f"\n❌ Database error during import: {e}")
        sys.exit(1)
    finally:
        db.close()


if __name__ == "__main__":
    import_github_projects("kainwangroger")
