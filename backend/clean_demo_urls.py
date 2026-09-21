"""Purge les URLs de démo qui ne mènent nulle part.

L'ancienne heuristique de `import_github.py` fabriquait un `demo_url` quand
GitHub n'en fournissait pas : un port local, ou une adresse Hugging Face
construite à partir du nom du dépôt. Le front affichait alors un bouton
« Tester » vers la machine du visiteur ou vers une page inexistante.

Le script vide ces champs. Il est idempotent : le relancer ne change rien.

    python clean_demo_urls.py            # aperçu, aucune écriture
    python clean_demo_urls.py --apply    # applique les changements
"""

import sys
from urllib.parse import urlparse

from app.core.database import SessionLocal
from app.core.demo_url import PLACEHOLDER_DEMO_HOSTS, is_public_demo_url
from app.models.project import Project


def reason_to_clear(url: str) -> str | None:
    """Motif de purge de l'URL, ou None si elle peut rester."""
    if not url:
        return None
    if not is_public_demo_url(url):
        return "adresse locale, injoignable depuis un navigateur"
    host = (urlparse(url).hostname or "").lower()
    if host.endswith(PLACEHOLDER_DEMO_HOSTS):
        return "URL devinée par l'ancien import, jamais vérifiée"
    return None


def main(apply: bool) -> int:
    db = SessionLocal()
    try:
        to_clear = []
        for project in db.query(Project).order_by(Project.slug).all():
            reason = reason_to_clear(project.demo_url or "")
            if reason:
                to_clear.append((project, reason))

        if not to_clear:
            print("✅ Aucune URL de démo à purger.")
            return 0

        print(f"{len(to_clear)} projet(s) concerné(s) :\n")
        for project, reason in to_clear:
            print(f"  {project.slug}")
            print(f"      {project.demo_url}")
            print(f"      → {reason}")

        if not apply:
            print("\nAperçu uniquement. Relancez avec --apply pour écrire en base.")
            return 0

        for project, _ in to_clear:
            project.demo_url = ""
        db.commit()
        print(f"\n✅ {len(to_clear)} URL(s) de démo purgée(s).")
        return 0
    except Exception as exc:
        db.rollback()
        print(f"❌ Erreur : {exc}")
        return 1
    finally:
        db.close()


if __name__ == "__main__":
    sys.exit(main(apply="--apply" in sys.argv))
