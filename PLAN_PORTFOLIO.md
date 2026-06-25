# Plan du Portfolio - Porfolio_Kr

## 1. Architecture Globale

```
┌──────────────────────────────────────────────────┐
│                 CLIENT (Navigateur)               │
└──────────────────────┬───────────────────────────┘
                       │
          ┌────────────┴────────────┐
          │                         │
          ▼                         ▼
┌──────────────────┐    ┌──────────────────────┐
│   Next.js App    │    │   FastAPI Backend     │
│   (Frontend)     │◄──►│   (REST API)          │
│                  │    │                      │
│  Port 3000       │    │  Port 8000           │
│                  │    │                      │
│  • Pages SSR     │    │  • /api/contact      │
│  • UI React      │    │  • /api/blog         │
│  • Tailwind      │    │  • /api/projects     │
│  • Framer Motion │    │  • /api/auth         │
│  • SEO           │    │  • /api/stats        │
└──────────────────┘    └──────────┬───────────┘
                                   │
                                   ▼
                          ┌──────────────────┐
                          │   PostgreSQL /    │
                          │   SQLite (dev)    │
                          └──────────────────┘
```

---

## 2. Stack Technique

### Frontend (Next.js)
| Technologie | Rôle |
|---|---|
| **Next.js 15 (App Router)** | SSR/SSG, routing, React |
| **TypeScript** | Typage statique |
| **Tailwind CSS** | Styling utilitaire |
| **Framer Motion** | Animations |
| **Shadcn/ui** (optionnel) | Composants UI réutilisables |

### Backend (FastAPI)
| Technologie | Rôle |
|---|---|
| **Python 3.12+** | Langage |
| **FastAPI** | Framework REST API |
| **SQLAlchemy + Alembic** | ORM + migrations |
| **PostgreSQL** (prod) / **SQLite** (dev) | Base de données |
| **Pydantic** | Validation données |
| **JWT / OAuth2** | Authentification backoffice |
| **Uvicorn** | Serveur ASGI |

### Déploiement
| Service | Usage |
|---|---|
| **Vercel** | Frontend Next.js |
| **Railway / Render / Azure** | Backend FastAPI |

---

## 3. Structure du Projet (Monorepo)

```
porfolio-kr/
├── frontend/                    # Next.js
│   ├── public/
│   │   ├── images/
│   │   └── fonts/
│   ├── src/
│   │   ├── app/
│   │   │   ├── (marketing)/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── about/page.tsx
│   │   │   │   ├── projects/page.tsx
│   │   │   │   └── contact/page.tsx
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── admin/           # Backoffice
│   │   │   ├── layout.tsx
│   │   │   └── globals.css
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   ├── home/
│   │   │   ├── blog/
│   │   │   └── ui/
│   │   ├── lib/
│   │   │   ├── api.ts           # Client HTTP → FastAPI
│   │   │   └── utils.ts
│   │   └── types/
│   ├── .env.local
│   ├── next.config.ts
│   ├── tailwind.config.ts
│   └── package.json
│
├── backend/                     # FastAPI
│   ├── app/
│   │   ├── api/
│   │   │   ├── v1/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── contact.py
│   │   │   │   ├── blog.py
│   │   │   │   ├── projects.py
│   │   │   │   ├── auth.py
│   │   │   │   └── stats.py
│   │   │   └── deps.py
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   ├── security.py
│   │   │   └── database.py
│   │   ├── models/
│   │   │   ├── blog.py
│   │   │   ├── project.py
│   │   │   ├── contact.py
│   │   │   └── user.py
│   │   ├── schemas/
│   │   │   ├── blog.py
│   │   │   ├── project.py
│   │   │   └── contact.py
│   │   └── main.py
│   ├── alembic/
│   │   └── versions/
│   ├── tests/
│   ├── requirements.txt
│   ├── Dockerfile
│   └── alembic.ini
│
├── docker-compose.yml           # PostgreSQL + Backend (dev)
├── Makefile                     # Commandes racines
└── PLAN_PORTFOLIO.md
```

---

## 4. Pages et Fonctionnalités

### 4.1 Page d'Accueil (`/`)
- Hero section : nom, titre, phrase d'accroche, CTA
- Projets à la une (data → FastAPI)
- Tech stack (icônes animées)
- Derniers articles blog (data → FastAPI)

### 4.2 À Propos (`/about`)
- Photo + biographie
- Timeline expérience / formation (data → FastAPI)
- Compétences catégorisées
- Téléchargement CV

### 4.3 Projets (`/projects`)
- Grille filtrée (tech, année)
- Projets depuis BDD via FastAPI (admin → CRUD)
- Page détail `/projects/[slug]`

### 4.4 Blog (`/blog`)
- Liste paginée depuis FastAPI
- Sidebar : catégories, tags, récents
- Article `/blog/[slug]` avec MDX rendu côté frontend
- Backoffice admin pour CRUD articles

### 4.5 Contact (`/contact`)
- Formulaire (nom, email, message)
- Envoi → FastAPI API → Email (Resend/SendGrid)
- Sauvegarde en BDD

### 4.6 Backoffice Admin (`/admin`)
- Dashboard stats (visites, messages, articles)
- CRUD Projets
- CRUD Articles blog
- Messages reçus
- Auth JWT (FastAPI) + session Next.js

---

## 5. API Endpoints (FastAPI)

| Méthode | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/projects` | Liste projets |
| GET | `/api/v1/projects/{slug}` | Détail projet |
| POST | `/api/v1/contact` | Envoyer message |
| GET | `/api/v1/blog` | Liste articles (paginated) |
| GET | `/api/v1/blog/{slug}` | Article |
| POST | `/api/v1/auth/login` | Login admin |
| GET | `/api/v1/stats/github` | Stats GitHub |
| GET | `/api/v1/health` | Health check |

---

## 6. Fonctionnalités Transversales

| Fonctionnalité | Détail |
|---|---|
| **Mode sombre/clair** | next-themes + Tailwind dark mode |
| **Responsive** | Mobile-first |
| **SEO** | Meta dynamiques, sitemap.xml |
| **Animations** | Framer Motion (scroll reveal, page transitions) |
| **Accessibilité** | ARIA, clavier, contrastes |
| **CORS** | FastAPI configuré pour le frontend |
| **Docker** | docker-compose pour dev local |

---

## 7. Roadmap de Réalisation

| Phase | Tâches | Statut |
|---|---|---|
| **1 - Setup** | Create Next.js + FastAPI projets, config outils | ⏳ |
| **2 - Backend Core** | BDD, models, migrations, API CRUD de base | ⬜ |
| **3 - Frontend Core** | Layout, Navbar, Footer, ThemeToggle, pages statiques | ⬜ |
| **4 - Connexion FE/BE** | Client API frontend → affichage données | ⬜ |
| **5 - Blog** | CRUD articles (admin), affichage public (front) | ⬜ |
| **6 - Contact** | Formulaire + API + email | ⬜ |
| **7 - Backoffice Admin** | Dashboard, CRUD projets/articles, auth | ⬜ |
| **8 - Animations & UI** | Framer Motion, polish | ⬜ |
| **9 - Contenu réel** | Remplir projets, bio, articles, CV | ⬜ |
| **10 - Déploiement** | Vercel (front) + Railway/Render (back) | ⬜ |

---

## 8. Commandes

```bash
# Frontend
cd frontend && npm run dev          # Dev sur :3000

# Backend
cd backend && uvicorn app.main:app --reload  # Dev sur :8000

# Docker (full stack local)
docker-compose up -d

# Migrations BDD
cd backend && alembic upgrade head
```
