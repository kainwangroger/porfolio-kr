from sqlalchemy import Column, DateTime, Integer, String, Text, func

from app.core.database import Base


class Event(Base):
    """Un événement auquel le propriétaire du portfolio a participé.

    Hackathons, conférences, écoles d'été : ce qui atteste d'une pratique et
    d'une reconnaissance, par opposition aux projets, qui attestent d'un
    travail livré.
    """

    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, nullable=False, index=True)
    # Qui organise : c'est souvent le nom qui donne son poids à l'événement.
    organizer = Column(String(255), default="")
    location = Column(String(255), default="")
    # Texte libre plutôt que date : « Avril 2026 » ou « 12–14 avril 2026 » selon
    # ce qui est connu, sans forcer une précision qu'on n'a pas toujours.
    period = Column(String(100), default="")
    role = Column(String(255), default="")
    description = Column(Text, default="")
    # Galerie : une URL par ligne. Le reste du modèle stocke déjà ses listes
    # en texte (tech_stack, tags) ; une table dédiée compliquerait le
    # back-office pour un gain nul à cette échelle.
    images = Column(Text, default="")
    link_url = Column(String(500), default="")
    # Ordre d'affichage décroissant : le plus grand passe en premier.
    sort_order = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
