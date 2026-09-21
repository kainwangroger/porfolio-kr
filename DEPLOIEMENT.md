# Guide de déploiement — Portfolio KAINWANG Roger

Architecture cible :

```
Navigateur ──HTTPS──▶ Frontend Next.js (Vercel)
                          │  NEXT_PUBLIC_API_URL
                          ▼
                      Backend FastAPI (Render Free)
                          │  DATABASE_URL
                          ▼
                      PostgreSQL 16 (Neon)
```

Le frontend est prérendu (ISR, 1 h) et purge son cache à chaque écriture
depuis le back-office via `POST /api/revalidate`. Le backend n'est donc
sollicité qu'au build, à la revalidation, et pour le back-office : c'est ce
qui rend un hébergement modeste suffisant.

---

## 1. État du projet

| Critère | Statut |
|---|---|
| Migrations Alembic | ✅ `001_initial_schema`, `002_events`, appliquées au démarrage du conteneur |
| Tests | ✅ 58 tests pytest, `ruff` propre |
| CI | ✅ `.github/workflows/ci.yml` — ruff, pytest, tsc, eslint, `next build` |
| Sécurité | ✅ `SECRET_KEY` obligatoire (≥ 32 car.), admin sans mot de passe en dur, rate limiting, Markdown assaini |
| Health check | ✅ `GET /api/v1/health` vérifie la base |
| SEO | ✅ `sitemap.xml`, `robots.txt`, un `h1` par page |
| Docker | ✅ `backend/Dockerfile` (honore `$PORT`) ; pas de Dockerfile frontend (inutile sur Vercel) |
| Config prod | ⚠️ `DEBUG` vaut `True` par défaut : le forcer à `False` |

**Le build Next.js échoue si l'API ne répond pas.** C'est voulu (une panne ne
doit pas passer pour un catalogue vide), mais ça impose de déployer le
backend *avant* le frontend, et de le garder éveillé.

---

## 2. Déploiement retenu : Vercel + Render Free + Neon (0 €/mois)

### 2.1 Base de données — Neon

1. https://neon.tech → **New project** (région `eu-central-1`, Postgres 16).
2. Copier l'URI de connexion, avec `?sslmode=require` :
   ```
   postgresql://user:motdepasse@ep-xxx.eu-central-1.aws.neon.tech/neondb?sslmode=require
   ```

### 2.2 Backend — Render

1. https://render.com → **New → Blueprint** → choisir `kainwangroger/porfolio-kr`.
   Render lit `render.yaml` : service Docker, répertoire `backend`, région
   Frankfurt, plan free, health check `/api/v1/health`.
2. Render demande les variables marquées `sync: false` ; `SECRET_KEY` est
   générée automatiquement (64 caractères) et `DEBUG` vaut déjà `False` :

   | Variable | Valeur |
   |---|---|
   | `DATABASE_URL` | l'URI Neon |
   | `CORS_ORIGINS` | `["https://porfolio-kr.vercel.app"]` — à compléter après 2.3 |
   | `RESEND_API_KEY` | clé Resend (formulaire de contact) |
   | `CONTACT_EMAIL_TO` | adresse de réception |
   | `GITHUB_TOKEN` | PAT sans scope, évite le rate limit de l'API GitHub |

3. **Apply**. Le premier build prend ~3 min ; noter l'URL, ex.
   `https://porfolio-kr-api.onrender.com`.
4. Vérifier : `curl https://<api>/api/v1/health` → `{"status":"ok","database":"healthy"}`.

### 2.2 bis — Empêcher la mise en veille (obligatoire)

Le plan free s'endort après 15 min sans requête : réveil ≈ 30–50 s, et un
build Vercel lancé pendant le sommeil **échoue**. Les 750 h/mois offertes
couvrent un service 24 h/24, il suffit donc de le solliciter régulièrement :

1. https://uptimerobot.com (gratuit) → **New Monitor**, type HTTP(s).
2. URL : `https://<api>/api/v1/health`, intervalle 5 min.
3. Le moniteur sert aussi d'alerte mail si l'API ou la base tombe.

### 2.3 Frontend — Vercel

1. https://vercel.com → **Add New → Project** → importer le dépôt.
2. **Root Directory** = `frontend`, preset Next.js (détecté).
3. **Environment Variables** :

   | Variable | Valeur |
   |---|---|
   | `NEXT_PUBLIC_API_URL` | `https://<api>/api/v1` |
   | `NEXT_PUBLIC_SITE_URL` | `https://<projet>.vercel.app` (ou le domaine perso) |

4. **Deploy**. Puis reporter l'URL Vercel définitive dans `CORS_ORIGINS` côté
   Render → **Environment** (le service redéploie tout seul).

### 2.4 Initialiser les données (une seule fois)

Le plan free n'offre pas de shell dans le conteneur : on lance les scripts en
local, contre la base Neon. Dans `backend/.env`, renseigner temporairement
`DATABASE_URL` (l'URI Neon) et une `SECRET_KEY` quelconque de 32 caractères,
puis :

```bash
cd backend
ADMIN_USERNAME=admin ADMIN_EMAIL=kainwangr@gmail.com ADMIN_PASSWORD="$(openssl rand -base64 24)" python seed.py
python seed_events.py      # HSIL Hackathon
python import_github.py    # projets GitHub
```

Remettre ensuite `backend/.env` en configuration locale. Ne **pas** lancer
`seed_demo_events.py` : ce sont des événements fictifs.

### 2.5 Vérifications

- [ ] `/` , `/projects`, `/evenements`, `/about` s'affichent avec le contenu
- [ ] Formulaire `/contact` → mail reçu
- [ ] `/admin/login` → créer un projet → visible sur `/projects` au rechargement
      suivant (revalidation, pas d'attente d'1 h)
- [ ] `/sitemap.xml` et `/robots.txt` pointent vers le bon domaine
- [ ] Thème sombre/clair, mobile

---

## 3. Montée en gamme : Railway (~5 €/mois)

Si le réveil ou la limite des 750 h devient gênant, remplacer Render par
Railway — pas de mise en veille, shell dans le conteneur :

1. https://railway.app → **New Project → Deploy from GitHub repo**.
2. **Settings → Root Directory** = `backend` ; Railway lit `backend/railway.json`.
3. Mêmes variables qu'en 2.2, plus `SECRET_KEY` (`openssl rand -hex 32`) et
   `DEBUG=False`.
4. **Networking → Generate Domain**, puis mettre à jour `NEXT_PUBLIC_API_URL`
   sur Vercel.

Le seed peut alors se faire via la CLI : `railway run python seed.py`.

---

## 4. Option VPS (Hetzner CX22, ~4 €/mois)

Pour tout héberger soi-même (Nginx + Certbot + Docker Compose). Nécessite en
plus un `frontend/Dockerfile` (`output: "standalone"` dans `next.config.ts`)
et un `docker-compose.prod.yml` sans `--reload` ni montage de volume source.
À ne choisir que pour la valeur pédagogique : le chemin le plus court reste
l'option 2.

---

## 5. Domaine personnalisé (optionnel)

1. Vercel → **Settings → Domains** → ajouter `kainwangroger.com` ; suivre les
   enregistrements DNS indiqués (A ou CNAME).
2. Mettre à jour `NEXT_PUBLIC_SITE_URL` (Vercel) et `CORS_ORIGINS` (Render).
3. Pour l'API, un sous-domaine `api.kainwangroger.com` se configure dans
   Render → **Settings → Custom Domains** (CNAME).

---

## 6. Checklist finale

### Bloquant
- [ ] Moniteur UptimeRobot sur `/api/v1/health` toutes les 5 min (Render Free)
- [ ] `fix/frontend-audit` fusionnée dans `main` (Vercel et Render déploient `main`)
- [ ] `DEBUG=False` sur le backend
- [ ] `SECRET_KEY` de 64 caractères, jamais commitée
- [ ] `CORS_ORIGINS` = URL exacte du frontend (schéma + hôte, sans `/` final)
- [ ] Mot de passe admin fort passé via `ADMIN_PASSWORD` au seed
- [ ] Backend en ligne **avant** le premier build Vercel

### Recommandé
- [ ] Domaine personnalisé
- [ ] Analytics (Vercel Analytics est en un clic, ou Umami/Plausible)

---

*Dernière mise à jour : septembre 2026*
