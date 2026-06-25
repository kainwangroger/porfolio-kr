import sys
from datetime import datetime
import httpx
from sqlalchemy.orm import Session
from app.core.database import SessionLocal, Base, engine
from app.models.project import Project

def slugify(name: str) -> str:
    slug = "".join(c if c.isalnum() else "-" for c in name.lower()).strip("-")
    while "--" in slug:
        slug = slug.replace("--", "-")
    return slug

def import_github_projects(username: str):
    print(f"Fetching public repositories for GitHub user: {username}...")
    url = f"https://api.github.com/users/{username}/repos?per_page=100&sort=updated"
    
    headers = {
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "FastAPI-Portfolio-Importer"
    }
    
    try:
        response = httpx.get(url, headers=headers)
        response.raise_for_status()
        repos = response.json()
    except Exception as e:
        print(f"Error fetching data from GitHub: {e}")
        sys.exit(1)
        
    print(f"Found {len(repos)} public repositories. Importing to database...")
    
    db: Session = SessionLocal()
    try:
        imported_count = 0
        updated_count = 0
        
        for repo in repos:
            if repo.get("fork"):
                print(f"  ⏭️  {repo['name']} : fork ignoré")
                continue

            repo_name = repo["name"]
            slug = slugify(repo_name)
            github_url = repo["html_url"]
            description = repo["description"] or ""
            language = repo["language"] or ""
            created_at_str = repo["created_at"]
            
            try:
                # GitHub dates are in format 'YYYY-MM-DDTHH:MM:SSZ'
                year = datetime.strptime(created_at_str, "%Y-%m-%dT%H:%M:%SZ").year
            except ValueError:
                year = datetime.now().year
                
            content = f"""## À propos de ce projet

{description or 'Ce projet a été importé automatiquement depuis GitHub.'}

## Technologies et fonctionnalités

- **Langage principal** : {language or 'Non spécifié'}
- **Lien du dépôt** : [GitHub]({github_url})
"""
            
            # Check if project already exists by slug or github_url
            project = db.query(Project).filter(
                (Project.slug == slug) | (Project.github_url == github_url)
            ).first()
            
            if project:
                project.title = repo_name
                project.description = description
                project.content = content
                if language:
                    project.tech_stack = language
                project.github_url = github_url
                project.year = year
                updated_count += 1
            else:
                project = Project(
                    title=repo_name,
                    slug=slug,
                    description=description,
                    content=content,
                    tech_stack=language,
                    github_url=github_url,
                    year=year,
                    featured=0
                )
                db.add(project)
                imported_count += 1
                
        db.commit()
        print(f"Import process finished successfully!")
        print(f"-> Created: {imported_count} projects")
        print(f"-> Updated: {updated_count} projects")
        
    except Exception as e:
        db.rollback()
        print(f"Database error during import: {e}")
        sys.exit(1)
    finally:
        db.close()

if __name__ == "__main__":
    import_github_projects("kainwangroger")
