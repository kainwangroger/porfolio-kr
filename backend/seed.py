"""Seed script: crée l'admin et des exemples de données.

Le mot de passe administrateur se lit dans l'environnement. Il a été codé en
dur ici (« admin123 ») : publié dans le dépôt, il n'en était plus un.

    ADMIN_PASSWORD=... python seed.py

Variables reconnues : ADMIN_USERNAME (défaut « admin »), ADMIN_EMAIL,
ADMIN_PASSWORD (obligatoire à la création).
"""

import os
import sys

from app.core.database import Base, SessionLocal, engine
from app.core.security import hash_password
from app.models.user import User
from app.models.skill import Skill
from app.models.project import Project

MIN_PASSWORD_LENGTH = 12

Base.metadata.create_all(bind=engine)
db = SessionLocal()

# Créer l'admin (si pas déjà fait)
admin_username = os.getenv("ADMIN_USERNAME", "admin")
admin = db.query(User).filter(User.username == admin_username).first()
if not admin:
    password = os.getenv("ADMIN_PASSWORD", "")
    if len(password) < MIN_PASSWORD_LENGTH:
        print(
            f"❌ ADMIN_PASSWORD manquant ou trop court "
            f"({MIN_PASSWORD_LENGTH} caractères minimum).\n"
            f"   Exemple : ADMIN_PASSWORD=\"$(openssl rand -base64 24)\" python seed.py"
        )
        sys.exit(1)

    db.add(User(
        username=admin_username,
        email=os.getenv("ADMIN_EMAIL", "admin@example.com"),
        hashed_password=hash_password(password),
    ))
    print(f"✅ Admin créé ({admin_username})")

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
