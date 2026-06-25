"""Seed script: crée l'admin et des exemples de données."""

from app.core.database import Base, SessionLocal, engine
from app.core.security import hash_password
from app.models.user import User
from app.models.skill import Skill
from app.models.project import Project

Base.metadata.create_all(bind=engine)
db = SessionLocal()

# Créer l'admin (si pas déjà fait)
admin = db.query(User).filter(User.username == "admin").first()
if not admin:
    db.add(User(
        username="admin",
        email="admin@example.com",
        hashed_password=hash_password("admin123"),
    ))
    print("✅ Admin créé (admin / admin123)")

# Compétences par défaut
skills_data = [
    ("Data Engineering", "Python"),
    ("Data Engineering", "SQL"),
    ("Data Engineering", "Spark"),
    ("Data Engineering", "Airflow"),
    ("Data Engineering", "Kafka"),
    ("Data Engineering", "dbt"),
    ("Data Science", "Machine Learning"),
    ("Data Science", "Scikit-learn"),
    ("Data Science", "Pandas"),
    ("Data Science", "NumPy"),
    ("Cloud & Infra", "Azure"),
    ("Cloud & Infra", "AWS"),
    ("Cloud & Infra", "Docker"),
    ("Cloud & Infra", "Terraform"),
    ("Visualisation", "Power BI"),
    ("Visualisation", "Tableau"),
    ("Visualisation", "Matplotlib"),
    ("Visualisation", "Streamlit"),
]
existing_skills = {s.name for s in db.query(Skill).all()}
for cat, name in skills_data:
    if name not in existing_skills:
        db.add(Skill(category=cat, name=name))
        print(f"✅ Skill ajoutée: {cat} → {name}")

# Projet exemple
existing_project = db.query(Project).filter(Project.slug == "portfolio").first()
if not existing_project:
    db.add(Project(
        title="Mon Portfolio",
        slug="portfolio",
        description="Site portfolio data engineer / data scientist avec Next.js, FastAPI et PostgreSQL.",
        content="""
## Contexte

Projet personnel pour présenter mes compétences et projets data.

## Technologies

- Frontend: Next.js, TypeScript, Tailwind CSS
- Backend: FastAPI, SQLAlchemy, PostgreSQL
- DevOps: Docker

## Fonctionnalités

- Design responsive avec mode sombre/clair
- Blog avec articles
- Backoffice admin pour CRUD
- Formulaire de contact
- Stats GitHub intégrées
        """,
        tech_stack="Next.js,FastAPI,PostgreSQL,Docker",
        github_url="https://github.com",
        featured=1,
        year=2025,
    ))
    print("✅ Projet exemple créé")

db.commit()
db.close()
print("\n🎉 Seed terminé !")
