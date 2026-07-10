# Backend — Portfolio KAINWANG Roger

API REST construite avec **FastAPI**, **SQLAlchemy** et **PostgreSQL**. Le backend gère l'authentification admin (JWT), les projets, les compétences, le blog, les messages de contact et les statistiques.

---

## Stack technique

| Technologie | Version | Rôle |
|-------------|---------|------|
| Python | 3.12+ | Langage |
| FastAPI | 0.115.0 | Framework REST API |
| SQLAlchemy | 2.0.36 | ORM (accès aux données) |
| Alembic | 1.13.3 | Migrations de base de données |
| PostgreSQL | 16 | Base de données (prod) |
| SQLite | — | Base de données (développement local) |
| Pydantic | 2.10.0 | Validation des données |
| python-jose | 3.3.0 | Gestion des tokens JWT |
| passlib + bcrypt | 1.7.4 | Hachage des mots de passe |
| Uvicorn | 0.31.0 | Serveur ASGI |
| httpx | 0.28.0 | Client HTTP (GitHub API) |
| Resend | 0.8.0 | Envoi d'emails (optionnel) |

---

## Prérequis

- **Python** ≥ 3.12
- **pip** (gestionnaire de paquets)
- **PostgreSQL** (production) ou **SQLite** (développement, inclus par défaut)
- **Docker** (optionnel, pour PostgreSQL via docker-compose)

---

## Installation

```bash
cd backend

# Créer un environnement virtuel
python3 -m venv venv
source venv/bin/activate  # Linux/Mac
# venv\Scripts\activate   # Windows

# Installer les dépendances
pip install -r requirements.txt
```

---

## Configuration

Créer un fichier `.env` à la racine de `backend/` :

```env
# Base de données
DATABASE_URL=sqlite:///./porfolio.db

# Sécurité
SECRET_KEY=change-me-in-production-avec-openssl-rand-hex-32
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440

# CORS (origines autorisées)
CORS_ORIGINS=["http://localhost:3003","http://localhost:3000"]

# Email (optionnel — Resend)
RESEND_API_KEY=
CONTACT_EMAIL_TO=kainwangr@gmail.com

# Debug
DEBUG=True
```

### Variables d'environnement

| Variable | Description | Défaut |
|----------|-------------|--------|
| `DATABASE_URL` | URI de connexion à la base de données | `sqlite:///./porfolio.db` |
| `SECRET_KEY` | Clé secrète pour signer les tokens JWT | `change-me-in-production` |
| `ALGORITHM` | Algorithme de signature JWT | `HS256` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Durée de validité des tokens (en minutes) | `1440` (24h) |
| `CORS_ORIGINS` | Liste des origines CORS autorisées | `["http://localhost:3000"]` |
| `RESEND_API_KEY` | Clé API Resend pour l'envoi d'emails | (vide) |
| `CONTACT_EMAIL_TO` | Adresse email de réception des messages | (vide) |
| `DEBUG` | Mode debug | `True` |

---

## Démarrage

### Développement local

```bash
# Avec SQLite (par défaut, pas de configuration nécessaire)
uvicorn app.main:app --reload --host 0.0.0.0 --port 8001

# Ou via le Makefile (à la racine du projet)
make dev-backend
```

L'API est accessible sur `http://localhost:8001`.

### Avec Docker (PostgreSQL)

```bash
# À la racine du projet
docker compose up -d

# Le backend démarre sur le port 8001
# PostgreSQL tourne sur le port 5432
```

### Documentation interactive

FastAPI génère automatiquement une documentation :

- **Swagger UI** : `http://localhost:8001/docs`
- **ReDoc** : `http://localhost:8001/redoc`

---

## Structure du projet

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                    # Point d'entrée FastAPI
│   ├── api/
│   │   ├── deps.py                # Dépendances (auth, db)
│   │   └── v1/
│   │       ├── auth.py            # POST /auth/login
│   │       ├── projects.py        # CRUD /projects
│   │       ├── skills.py          # CRUD /skills
│   │       ├── blog.py            # CRUD /blog
│   │       ├── contact.py         # POST /contact, GET /contact
│   │       └── stats.py           # Stats (visites, CV, GitHub)
│   ├── core/
│   │   ├── config.py              # Configuration (pydantic-settings)
│   │   ├── database.py            # Engine SQLAlchemy, SessionLocal
│   │   └── security.py            # JWT, hachage mots de passe
│   ├── models/
│   │   ├── user.py                # Utilisateur admin
│   │   ├── project.py             # Projet
│   │   ├── skill.py               # Compétence
│   │   ├── blog.py                # Article de blog
│   │   ├── contact.py             # Message de contact
│   │   └── stats.py               # Statistiques (clé/valeur)
│   └── schemas/
│       ├── auth.py                # Schémas auth (LoginRequest, TokenResponse)
│       ├── project.py             # Schémas projets (CRUD)
│       ├── skill.py               # Schémas compétences
│       ├── blog.py                # Schémas blog
│       ├── contact.py             # Schémas contact
│       └── stats.py               # Schémas stats
├── tests/                         # Tests unitaires
├── seed.py                        # Script d'initialisation des données
├── import_github.py               # Import des projets depuis GitHub
├── Dockerfile                     # Image Docker pour le backend
├── requirements.txt               # Dépendances Python
└── .env                           # Variables d'environnement
```

---

## Endpoints API

### Authentification

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| `POST` | `/api/v1/auth/login` | Connexion admin, retourne un token JWT | Non |

### Projets

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| `GET` | `/api/v1/projects` | Liste des projets (pagination: `skip`, `limit`) | Non |
| `GET` | `/api/v1/projects/featured` | Projets mis en avant (max 4) | Non |
| `GET` | `/api/v1/projects/{slug}` | Détail d'un projet | Non |
| `POST` | `/api/v1/projects` | Créer un projet | Oui (JWT) |
| `PUT` | `/api/v1/projects/{slug}` | Modifier un projet | Oui (JWT) |
| `DELETE` | `/api/v1/projects/{slug}` | Supprimer un projet | Oui (JWT) |

### Compétences

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| `GET` | `/api/v1/skills` | Liste des compétences | Non |
| `POST` | `/api/v1/skills` | Créer une compétence | Oui (JWT) |
| `PUT` | `/api/v1/skills/{id}` | Modifier une compétence | Oui (JWT) |
| `DELETE` | `/api/v1/skills/{id}` | Supprimer une compétence | Oui (JWT) |

### Blog

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| `GET` | `/api/v1/blog` | Articles publiés (pagination) | Non |
| `GET` | `/api/v1/blog/all` | Tous les articles (admin) | Oui (JWT) |
| `GET` | `/api/v1/blog/{slug}` | Détail d'un article | Non |
| `POST` | `/api/v1/blog` | Créer un article | Oui (JWT) |
| `PUT` | `/api/v1/blog/{slug}` | Modifier un article | Oui (JWT) |
| `DELETE` | `/api/v1/blog/{slug}` | Supprimer un article | Oui (JWT) |

### Contact

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| `POST` | `/api/v1/contact` | Envoyer un message | Non |
| `GET` | `/api/v1/contact` | Liste des messages (admin) | Oui (JWT) |

### Statistiques

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| `POST` | `/api/v1/stats/page-visit` | Enregistrer une visite | Non |
| `POST` | `/api/v1/stats/cv-download` | Enregistrer un téléchargement CV | Non |
| `GET` | `/api/v1/stats/all` | Toutes les statistiques | Oui (JWT) |
| `GET` | `/api/v1/stats/github?username=...` | Stats GitHub d'un utilisateur | Non |

### Santé

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| `GET` | `/api/v1/health` | Vérification de l'état de l'API | Non |

---

## Base de données

### Modèles

| Table | Description |
|-------|-------------|
| `users` | Utilisateurs admin (id, username, email, hashed_password) |
| `projects` | Projets (id, title, slug, description, content, tech_stack, image_url, github_url, demo_url, featured, year) |
| `skills` | Compétences (id, category, name) |
| `blog_posts` | Articles de blog (id, title, slug, excerpt, content, cover_image, tags, published, read_time) |
| `contact_messages` | Messages de contact (id, name, email, message, read) |
| `stats` | Statistiques (id, key, value) — clé/valeur |

### Migrations (Alembic)

```bash
# Créer une migration après modification d'un modèle
alembic revision --autogenerate -m "description"

# Appliquer les migrations
alembic upgrade head

# Retourner en arrière
alembic downgrade -1
```

---

## Scripts utilitaires

### Seed — Initialiser les données

```bash
python seed.py
```

Crée :
- Un compte admin (`admin` / `admin123`)
- Des compétences par défaut (Python, SQL, Spark, Airflow, etc.)
- Un projet exemple "Mon Portfolio"

> **Identifiants par défaut** : `admin` / `admin123`

### Import GitHub — Récupérer les projets

```bash
python import_github.py
```

- Récupère tous les dépôts publics de `kainwangroger` via l'API GitHub
- Crée ou met à jour un projet pour chaque dépôt non-fork
- Génère automatiquement slug, description, contenu et tech_stack

---

## Authentification

L'authentification utilise des **tokens JWT** (JSON Web Tokens) :

1. L'admin se connecte via `POST /api/v1/auth/login` avec username + password
2. L'API retourne un `access_token` (durée de vie : 24h par défaut)
3. Le token est envoyé dans le header `Authorization: Bearer <token>` pour les routes protégées

Le mot de passe est haché avec **bcrypt** via `passlib`.

---

## Déploiement

### Docker (développement)

```bash
# À la racine du projet
docker compose up -d
```

Services :
- **backend** : FastAPI sur le port `8001`
- **db** : PostgreSQL 16 sur le port `5432`

### Production (Render)

1. Push sur la branche `main`
2. Render détecte le changement et redéploye automatiquement
3. Utiliser une base de données PostgreSQL externe (Neon, Supabase)

Variables d'environnement à configurer sur Render :
```
DATABASE_URL=postgresql://user:pass@host/dbname
SECRET_KEY=<genere-avec-openssl-rand-hex-32>
CORS_ORIGINS=["https://ton-frontend.vercel.app"]
```

---

## Tests

```bash
cd backend
pytest
```

---

## Dockerfile

```dockerfile
FROM python:3.12-slim
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends gcc libpq-dev
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

L'image utilise Python 3.12-slim, installe les dépendances système pour PostgreSQL (`libpq-dev`), puis les dépendances Python. Le serveur Uvicorn expose le port 8000 (mapped sur 8001 via docker-compose).
