# Portfolio — KAINWANG Roger

Portfolio personnel data engineer & data scientist, construit avec **Next.js** (frontend), **FastAPI** (backend) et **PostgreSQL**.

## Stack

| Frontend | Backend | Base de données |
|----------|---------|----------------|
| Next.js 16 | FastAPI | PostgreSQL |
| React 19 | SQLAlchemy | |
| Tailwind CSS 4 | JWT Auth | |
| Framer Motion | Docker | |

## Fonctionnalités

- Page d'accueil avec présentation et carousel de projets
- Parcours : bio, compétences, formation, certifications, expérience
- Projets : liste avec images + page détaillée
- Backoffice admin : dashboard (stats visites, CV, messages), gestion projets/compétences
- Téléchargement du CV avec compteur
- Thème clair/sombre
- Tracking des visites

## Démarrage rapide

```bash
# Backend (avec Docker)
docker compose up -d

# Frontend
cd frontend
npm install
npm run dev
```

Le frontend est sur `http://localhost:3003`, le backend sur `http://localhost:8001`.

## Structure

```
porfolio-kr/
├── backend/
│   ├── app/
│   │   ├── api/v1/     # Routes REST
│   │   ├── core/        # Config, DB, sécurité
│   │   ├── models/      # SQLAlchemy models
│   │   └── schemas/     # Pydantic schemas
│   ├── Dockerfile
│   ├── requirements.txt
│   └── seed.py
├── frontend/
│   ├── src/
│   │   ├── app/         # Pages Next.js
│   │   ├── components/  # Composants UI
│   │   └── lib/         # API client, utils
│   └── package.json
├── docker-compose.yml
└── README.md
```
