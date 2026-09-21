"""Événements de DÉMONSTRATION — à supprimer avant toute mise en ligne.

⚠️  Ces deux événements sont FICTIFS. Ils servent à voir la page /evenements
avec plusieurs entrées et des galeries de tailles différentes. Les personnes
et les faits décrits ne correspondent à aucune participation réelle : les
laisser en ligne reviendrait à afficher de fausses références sur un
portfolio professionnel.

Les photos pointent vers picsum.photos, un service de placeholders libre et
prévu pour le lien direct. Elles exercent au passage le chemin « URL
distante » de la galerie, celui qui n'utilise pas next/image.

    python seed_demo_events.py            # ajoute les événements de démo
    python seed_demo_events.py --remove   # les retire
"""

import sys

from app.core.database import SessionLocal
from app.models.event import Event

#: Préfixe commun, pour retrouver et supprimer ces entrées sans ambiguïté.
DEMO_PREFIX = "demo-"

DEMO_EVENTS = [
    {
        "slug": f"{DEMO_PREFIX}deep-learning-indaba",
        "title": "Deep Learning Indaba",
        "organizer": "Deep Learning Indaba",
        "location": "Kigali, Rwanda",
        "period": "Août 2025",
        "role": "Participant — atelier NLP pour les langues africaines",
        "description": (
            "Rencontre annuelle de la communauté africaine de l'apprentissage "
            "automatique : une semaine de cours, d'ateliers pratiques et de "
            "sessions posters réunissant chercheurs, étudiants et ingénieurs "
            "du continent.\n\n"
            "Participation aux ateliers consacrés au traitement automatique des "
            "langues peu dotées, et présentation d'un poster sur la constitution "
            "de corpus pour les langues d'Afrique de l'Ouest."
        ),
        "images": "\n".join(
            [
                "https://picsum.photos/id/20/1200/800",
                "https://picsum.photos/id/3/1200/800",
                "https://picsum.photos/id/119/1200/800",
            ]
        ),
        "link_url": "https://deeplearningindaba.com",
        "sort_order": 80,
    },
    {
        "slug": f"{DEMO_PREFIX}data-engineering-summit",
        "title": "Data Engineering Summit",
        "organizer": "Communauté Data Afrique",
        "location": "Lomé, Togo",
        "period": "Novembre 2025",
        "role": "Intervenant — retour d'expérience sur un pipeline CDC",
        "description": (
            "Rencontre professionnelle autour des architectures de données "
            "modernes. Intervention sur la mise en place d'un pipeline de "
            "capture de données modifiées vers un lakehouse Apache Iceberg, et "
            "sur les arbitrages de coût que suppose ce type d'architecture."
        ),
        "images": "\n".join(
            [
                "https://picsum.photos/id/180/1200/800",
                "https://picsum.photos/id/60/1200/800",
            ]
        ),
        "link_url": "",
        "sort_order": 60,
    },
]


def add(db) -> int:
    created = 0
    for data in DEMO_EVENTS:
        if db.query(Event).filter(Event.slug == data["slug"]).first():
            print(f"  = {data['slug']} : déjà présent")
            continue
        db.add(Event(**data))
        created += 1
        print(f"  + {data['slug']}")
    return created


def remove(db) -> int:
    events = db.query(Event).filter(Event.slug.like(f"{DEMO_PREFIX}%")).all()
    for event in events:
        print(f"  - {event.slug}")
        db.delete(event)
    return len(events)


def main(removing: bool) -> None:
    db = SessionLocal()
    try:
        count = remove(db) if removing else add(db)
        db.commit()
        if removing:
            print(f"\n✅ {count} événement(s) de démo retiré(s).")
        else:
            print(f"\n⚠️  {count} événement(s) FICTIF(S) ajouté(s).")
            print("   À retirer avant mise en ligne : python seed_demo_events.py --remove")
    except Exception as exc:
        db.rollback()
        print(f"❌ Erreur : {exc}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    main(removing="--remove" in sys.argv)
