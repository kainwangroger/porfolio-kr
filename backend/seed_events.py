"""Seed des événements : hackathons, conférences, écoles d'été.

Idempotent — les événements déjà en base sont laissés tels quels, pour ne pas
écraser ce qui aurait été retouché depuis le back-office.

    python seed_events.py
"""

from app.core.database import SessionLocal
from app.models.event import Event

EVENTS = [
    {
        "slug": "hsil-hackathon-accra-2026",
        "title": "HSIL Hackathon — Global Health Systems",
        "organizer": "Harvard T.H. Chan School of Public Health · Health Systems Innovation Lab",
        "location": "Accra, Ghana",
        "period": "Avril 2026",
        "role": "Participant — équipe Togo AI Lab",
        "description": (
            "Hackathon international consacré aux systèmes de santé à forte valeur "
            "ajoutée s'appuyant sur l'intelligence artificielle. Notre équipe y a "
            "présenté une solution de détection précoce de l'anémie à partir d'un "
            "simple scan de la paume de la main pris au smartphone, pensée pour "
            "réduire le coût du diagnostic et améliorer l'accès aux soins dans les "
            "zones sous-médicalisées.\n\n"
            "L'événement réunissait des équipes de plusieurs pays, avec le soutien "
            "de l'Université du Ghana, d'Academic City University, de l'University "
            "of Wisconsin et de la University of Ghana Medical School."
        ),
        "images": "\n".join(
            [
                "/events/hsil-hackathon-portrait.jpg",
                "/events/hsil-hackathon-equipe.jpg",
                "/events/hsil-hackathon-equipe-portrait.jpg",
                "/events/hsil-hackathon-groupe.jpg",
            ]
        ),
        "link_url": "",
        "sort_order": 100,
    },
]


def main() -> None:
    db = SessionLocal()
    try:
        created = 0
        for data in EVENTS:
            if db.query(Event).filter(Event.slug == data["slug"]).first():
                print(f"  = {data['slug']} : déjà présent, inchangé")
                continue
            db.add(Event(**data))
            created += 1
            print(f"  + {data['slug']} : créé")
        db.commit()
        print(f"\n✅ {created} événement(s) ajouté(s).")
    except Exception as exc:
        db.rollback()
        print(f"❌ Erreur : {exc}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    main()
