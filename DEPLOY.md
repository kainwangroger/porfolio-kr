# Déploiement gratuit

## Architecture

```
Frontend (Next.js)  ─►  Backend (FastAPI)  ─►  PostgreSQL
    Vercel                  Render                  Neon
```

## 1. Base de données — Neon (gratuit)

1. Crée un compte sur https://neon.tech
2. Crée un projet → récupère l'URI de connexion :
   `postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require`
3. Garde cette URI pour la suite

## 2. Backend FastAPI — Render (gratuit)

1. Va sur https://render.com → "New +" → "Web Service"
2. Connecte ton repo GitHub `kainwangroger/porfolio-kr`
3. Configure :
   - **Name**: `porfolio-kr-api`
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port 10000`
4. Ajoute les variables d'environnement :
   - `DATABASE_URL` = l'URI Neon de l'étape 1
   - `SECRET_KEY` = une clé secrète (genere avec `openssl rand -hex 32`)
   - `CORS_ORIGINS` = `["https://porfolio-kr.vercel.app"]`
   - `RESEND_API_KEY` = (optionnel, pour les emails)
   - `CONTACT_EMAIL_TO` = `kainwangr@gmail.com`
5. **Plan**: Free
6. "Create Web Service"

⚠️ Render free tier met le service en veille après 15 min d'inactivité. Le premier appel après une veille prend ~30s.

## 3. Frontend Next.js — Vercel (gratuit)

1. Va sur https://vercel.com → "Add New" → "Project"
2. Importe le repo `kainwangroger/porfolio-kr`
3. Configure :
   - **Root Directory**: `frontend`
   - **Framework Preset**: `Next.js`
4. Ajoute la variable d'environnement :
   - `NEXT_PUBLIC_API_URL` = `https://porfolio-kr-api.onrender.com/api/v1`
5. "Deploy"

## 4. Seed la base de données

Après déploiement, il faut créer l'admin et les données initiales :

```bash
# Depuis ton local, une fois le backend déployé :
curl -X POST https://porfolio-kr-api.onrender.com/api/v1/seed
```

Ou utilise le script `backend/seed.py` en modifiant temporairement `DATABASE_URL` vers Neon.

## URLs finales

| Service | URL |
|---------|-----|
| Frontend | `https://porfolio-kr.vercel.app` |
| Backend  | `https://porfolio-kr-api.onrender.com` |
| Admin    | `https://porfolio-kr.vercel.app/admin` |

## Alternatives gratuites

| Service | Alternative |
|---------|-------------|
| Base de données | **Supabase** (https://supabase.com) — 500 Mo gratuits |
| Backend | **Railway** (https://railway.app) — $5 de crédit/mois, ou **Fly.io** |
| Frontend | **Netlify** (https://netlify.com) — compatible Next.js |

## Notes

- **Ne pas utiliser SQLite** en production → utiliser PostgreSQL (Neon)
- Render redémarre automatiquement au push sur la branche `main`
- Pour Vercel, configure un domaine personnalisé si tu veux
- Les placeholders d'images (`placehold.co`) fonctionnent sans backend
