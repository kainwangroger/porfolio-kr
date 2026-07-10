# Frontend — Portfolio KAINWANG Roger

Application web construite avec **Next.js 16** (App Router), **React 19**, **TypeScript** et **Tailwind CSS 4**. Le frontend communique avec une API FastAPI pour afficher les projets, compétences, articles de blog et statistiques.

---

## Stack technique

| Technologie | Version | Rôle |
|-------------|---------|------|
| Next.js | 16.2.6 | Framework React (SSR/SSG, App Router) |
| React | 19.2.4 | Bibliothèque UI |
| TypeScript | 5.x | Typage statique |
| Tailwind CSS | 4.x | Styling utilitaire |
| Framer Motion | 12.x | Animations |
| Lucide React | 0.468 | Icônes |
| next-themes | 0.4.6 | Thème clair/sombre |

---

## Prérequis

- **Node.js** ≥ 18
- **npm** ou **yarn**
- Le **backend FastAPI** doit être accessible (par défaut `http://localhost:8001/api/v1`)

---

## Installation

```bash
cd frontend
npm install
```

---

## Configuration

Créer un fichier `.env.local` à la racine de `frontend/` :

```env
# URL de l'API backend (FastAPI)
NEXT_PUBLIC_API_URL=http://localhost:8001/api/v1
```

En production (Vercel), cette variable doit pointer vers l'URL du backend déployé.

---

## Démarrage

```bash
# Développement (port 3003)
npm run dev

# Build de production
npm run build

# Démarrer le build de production
npm start

# Lint
npm run lint
```

L'application est accessible sur `http://localhost:3003`.

---

## Structure du projet

```
frontend/
├── public/                        # Fichiers statiques
│   └── cv_kainwang_linkedin.pdf   # CV téléchargeable
├── src/
│   ├── app/                       # Pages Next.js (App Router)
│   │   ├── page.tsx               # Page d'accueil (Hero, FeaturedProjects, TechStack)
│   │   ├── layout.tsx             # Layout racine (Navbar, Footer, ThemeProvider)
│   │   ├── globals.css            # Styles globaux Tailwind
│   │   ├── about/page.tsx         # Page Parcours (bio, formations, certifications)
│   │   ├── projects/
│   │   │   ├── page.tsx           # Liste des projets
│   │   │   └── [slug]/page.tsx    # Détail d'un projet
│   │   └── admin/                 # Backoffice admin (protégé par JWT)
│   │       ├── layout.tsx
│   │       ├── page.tsx           # Dashboard (stats: visites, CV, messages)
│   │       ├── login/page.tsx     # Page de connexion
│   │       ├── projects/          # CRUD projets
│   │       │   ├── page.tsx       # Liste des projets
│   │       │   ├── new/page.tsx   # Créer un projet
│   │       │   └── [slug]/page.tsx# Modifier un projet
│   │       ├── skills/page.tsx    # CRUD compétences
│   │       └── messages/page.tsx  # Liste des messages contact
│   ├── components/
│   │   ├── layout/                # Composants de mise en page
│   │   │   ├── Navbar.tsx         # Barre de navigation
│   │   │   ├── Footer.tsx         # Pied de page
│   │   │   ├── ThemeToggle.tsx    # Bascule clair/sombre
│   │   │   ├── ThemeProvider.tsx  # Provider de thème
│   │   │   └── PageTracker.tsx    # Tracking des visites
│   │   ├── home/                  # Composants page d'accueil
│   │   │   ├── Hero.tsx           # Section hero + téléchargement CV
│   │   │   ├── FeaturedProjects.tsx# Projets à la une
│   │   │   └── TechStack.tsx      # Technologies (depuis API)
│   │   ├── projects/              # Composants projets
│   │   └── ui/                    # Composants UI réutilisables
│   │       ├── Button.tsx
│   │       ├── Badge.tsx
│   │       ├── SectionTitle.tsx
│   │       └── ThemeToggle.tsx
│   └── lib/
│       ├── api.ts                 # Client API public (→ FastAPI)
│       ├── admin-api.ts           # Client API admin (JWT auth)
│       ├── utils.ts               # Utilitaires (cn, etc.)
│       └── project-image.ts       # Logique d'image par défaut
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
└── .env.local
```

---

## Pages publiques

| Route | Description |
|-------|-------------|
| `/` | Page d'accueil : Hero avec nom/titre, projets à la une, tech stack |
| `/about` | Parcours : bio, formations, certifications, compétences, langues, centres d'intérêt |
| `/projects` | Liste de tous les projets avec filtres |
| `/projects/[slug]` | Détail d'un projet (description, tech stack, lien GitHub/demo) |

## Pages admin

| Route | Description |
|-------|-------------|
| `/admin` | Dashboard : nombre de visites, téléchargements CV, messages non lus |
| `/admin/login` | Connexion admin (JWT) |
| `/admin/projects` | Liste des projets (CRUD) |
| `/admin/projects/new` | Créer un nouveau projet |
| `/admin/projects/[slug]` | Modifier un projet existant |
| `/admin/skills` | Gérer les compétences affichées sur la page Parcours |
| `/admin/messages` | Voir les messages reçus via le formulaire contact |

---

## Composants principaux

### Hero (`components/home/Hero.tsx`)
- Affiche le nom et le titre "Data Engineer & Data Scientist"
- Bouton de téléchargement du CV (`public/cv_kainwang_linkedin.pdf`)
- Enregistre chaque téléchargement via l'API (`POST /stats/cv-download`)

### TechStack (`components/home/TechStack.tsx`)
- Récupère les compétences depuis l'API (`GET /skills`)
- Affiche chaque technologie avec une icône et un effet d'animation

### PageTracker (`components/layout/PageTracker.tsx`)
- Enregistre automatiquement chaque visite de page via l'API (`POST /stats/page-visit`)

---

## Communication avec le backend

Le frontend communique avec le backend via deux clients API :

### Client public (`lib/api.ts`)
- Utilisé pour les pages publiques (pas d'authentification requise)
- Endpoints : `/projects`, `/skills`, `/blog`, `/contact`, `/stats`, `/health`

### Client admin (`lib/admin-api.ts`)
- Utilisé pour le backoffice admin
- Stocke le token JWT dans `localStorage`
- Redirige vers `/admin/login` en cas d'erreur 401
- Endpoints : CRUD complet sur `/projects`, `/skills`, `/blog`, `/contact`, `/stats`

---

## Déploiement sur Vercel

1. Connecter le dépôt GitHub sur Vercel
2. Configurer :
   - **Root Directory** : `frontend`
   - **Framework Preset** : Next.js
3. Ajouter la variable d'environnement :
   ```
   NEXT_PUBLIC_API_URL=https://ton-backend.onrender.com/api/v1
   ```
4. Déployer

---

## Docker

Le frontend n'a pas de Dockerfile dédié — il est géré directement par Vercel en production. En développement local, il tourne via `npm run dev`.

Pour lancer tout le stack (backend + base de données) :

```bash
# À la racine du projet
docker compose up -d
```

Puis lancer le frontend séparément :

```bash
cd frontend
npm install
npm run dev
```

---

## Variables d'environnement

| Variable | Description | Défaut |
|----------|-------------|--------|
| `NEXT_PUBLIC_API_URL` | URL de base de l'API backend | `http://localhost:8001/api/v1` |
