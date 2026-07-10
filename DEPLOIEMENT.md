# Guide de Déploiement — Portfolio KAINWANG Roger

Guide complet de déploiement avec 5 options, de la plus simple à la plus avancée.

---

## Table des matières

1. [Évaluation du projet](#1-évaluation-du-projet)
2. [Option 1 : Vercel + Render + Neon (Gratuit — Recommandé)](#option-1-vercel--render--neon-gratuit--recommandé)
3. [Option 2 : Vercel + Railway + Supabase](#option-2-vercel--railway--supabase)
4. [Option 3 : VPS (Hetzner/OVH) + Docker Compose](#option-3-vps-hetznerovh--docker-compose)
5. [Option 4 : AWS (Production Enterprise)](#option-4-aws-production-enterprise)
6. [Option 5 : Azure (Gratuit pour étudiants)](#option-5-azure-gratuit-pour-étudiants)
7. [Checklist avant déploiement](#7-checklist-avant-déploiement)
8. [Améliorations recommandées](#8-améliorations-recommandées)

---

## 1. Évaluation du projet

### État actuel

| Critère | Statut | Détail |
|---------|--------|--------|
| Code fonctionnel | ✅ | Frontend + Backend opérationnels en local |
| Docker | ✅ | docker-compose.yml fonctionnel |
| Base de données | ⚠️ | SQLite (dev) / PostgreSQL (Docker) — pas de migrations Alembic en place |
| Authentification | ✅ | JWT fonctionnel |
| API REST | ✅ | CRUD complet projets, skills, blog, contact, stats |
| CI/CD | ❌ | Pas de pipeline CI/CD |
| Variables d'environnement | ⚠️ | `.env` en dur, pas de gestion des secrets en prod |
| Tests | ❌ | Pas de tests unitaires ni d'intégration |
| Monitoring | ❌ | Pas de health check externe |
| Documentation API | ✅ | Swagger/ReDoc via FastAPI |
| HTTPS | ❌ | Pas configuré (nécessaire en prod) |
| CORS | ⚠️ | Configuré pour localhost, pas pour la prod |
| Error handling | ⚠️ | Basique, pas de logging structuré |
| SEO | ✅ | Meta tags configurés dans layout.tsx |
| Responsive | ✅ | Mobile-first avec Tailwind |
| Performance | ⚠️ | Pas d'optimisation d'images, pas de lazy loading avancé |

### Verdict

**Le projet est déployable** pour un portfolio personnel. Pour un projet en production enterprise, il manque des éléments (tests, CI/CD, monitoring, error handling).

---

## Option 1 : Vercel + Render + Neon (Gratuit — Recommandé)

Architecture la plus simple et gratuite.

```
Frontend (Vercel)  →  Backend (Render)  →  PostgreSQL (Neon)
     Port 443              Port 8000              Port 5432
```

### Étape 1 : Base de données — Neon (gratuit)

1. Créer un compte sur https://neon.tech
2. Créer un projet
3. Récupérer l'URI de connexion :
   ```
   postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

### Étape 2 : Backend — Render (gratuit)

1. Créer un compte sur https://render.com
2. **New +** → **Web Service**
3. Connecter le dépôt GitHub `kainwangroger/porfolio-kr`
4. Configurer :

| Paramètre | Valeur |
|-----------|--------|
| Name | `porfolio-kr-api` |
| Region | Oregon (US West) ou Frankfurt (EU) |
| Root Directory | `backend` |
| Runtime | Python 3 |
| Build Command | `pip install -r requirements.txt` |
| Start Command | `uvicorn app.main:app --host 0.0.0.0 --port $PORT` |

5. Variables d'environnement :

```env
DATABASE_URL=postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
SECRET_KEY=<generer-avec-openssl-rand-hex-32>
CORS_ORIGINS=["https://ton-nom.vercel.app"]
DEBUG=False
RESEND_API_KEY=<optionnel>
CONTACT_EMAIL_TO=kainwangr@gmail.com
```

6. **Create Web Service**

> ⚠️ Render free tier met le service en veille après 15 min d'inactivité. Le premier appel prend ~30s.

### Étape 3 : Frontend — Vercel (gratuit)

1. Créer un compte sur https://vercel.com
2. **Add New** → **Project**
3. Importer le dépôt `kainwangroger/porfolio-kr`
4. Configurer :

| Paramètre | Valeur |
|-----------|--------|
| Root Directory | `frontend` |
| Framework Preset | Next.js |

5. Variable d'environnement :

```env
NEXT_PUBLIC_API_URL=https://porfolio-kr-api.onrender.com/api/v1
```

6. **Deploy**

### Étape 4 : Initialiser les données

```bash
# Seed via l'API
curl -X POST https://porfolio-kr-api.onrender.com/api/v1/seed

# Ou modifier temporairement DATABASE_URL dans backend/.env
# puis lancer : cd backend && python seed.py && python import_github.py
```

### Étape 5 : Domaine personnalisé (optionnel)

1. Acheter un domaine (ex: `kainwangroger.com`)
2. Sur Vercel : Settings → Domains → Ajouter le domaine
3. Configurer les DNS chez le registrar pour pointer vers Vercel

### Coût

| Service | Plan | Coût |
|---------|------|------|
| Vercel | Hobby | Gratuit |
| Render | Free | Gratuit |
| Neon | Free | Gratuit |
| **Total** | | **0 €/mois** |

---

## Option 2 : Vercel + Railway + Supabase

Plus fiable que l'option 1 (pas de veille sur Railway).

```
Frontend (Vercel)  →  Backend (Railway)  →  PostgreSQL (Supabase)
```

### Étape 1 : Base de données — Supabase

1. Créer un compte sur https://supabase.com
2. Créer un projet
3. Récupérer l'URI : `postgresql://postgres:password@db.xxx.supabase.co:5432/postgres`

### Étape 2 : Backend — Railway

1. Créer un compte sur https://railway.app
2. **New Project** → **Deploy from GitHub**
3. Sélectionner le dépôt
4. Configurer le **Root Directory** : `backend`
5. Variables d'environnement (même que l'option 1 avec l'URI Supabase)
6. Railway offre $5 de crédit gratuit par mois

### Étape 3 : Frontend — Vercel

Même procédure que l'option 1.

### Coût

| Service | Plan | Coût |
|---------|------|------|
| Vercel | Hobby | Gratuit |
| Railway | Trial | ~0-5 €/mois |
| Supabase | Free | Gratuit |
| **Total** | | **0-5 €/mois** |

---

## Option 3 : VPS (Hetzner/OVH) + Docker Compose

Tout sur un seul serveur. Contrôle total.

```
VPS (Hetzner) → Docker Compose → Frontend + Backend + PostgreSQL + Nginx
```

### Étape 1 : Créer un VPS

1. Créer un compte sur https://hetzner.com (ou https://ovh.com)
2. Créer un Cloud Server :

| Paramètre | Valeur |
|-----------|--------|
| Type | CPX21 (2 vCPU, 4 GB RAM) |
| OS | Ubuntu 22.04 |
| Région | Nuremberg ou Helsinki |
| Coût | ~4.5 €/mois |

3. Configurer SSH :
```bash
ssh root@<IP_DU_VPS>
```

### Étape 2 : Installer Docker

```bash
# Installer Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
newgrp docker

# Installer Docker Compose
sudo apt install docker-compose-plugin -y
```

### Étape 3 : Cloner le projet

```bash
cd /opt
git clone https://github.com/kainwangroger/porfolio-kr.git
cd porfolio-kr
```

### Étape 4 : Configurer les variables d'environnement

```bash
# Backend
cat > backend/.env << 'EOF'
DATABASE_URL=postgresql://postgres:postgres@db:5432/porfolio
SECRET_KEY=$(openssl rand -hex 32)
CORS_ORIGINS=["https://kainwangroger.com","https://www.kainwangroger.com"]
DEBUG=False
RESEND_API_KEY=
CONTACT_EMAIL_TO=kainwangr@gmail.com
EOF

# Frontend
cat > frontend/.env.local << 'EOF'
NEXT_PUBLIC_API_URL=https://api.kainwangroger.com/api/v1
EOF
```

### Étape 5 : Créer docker-compose.prod.yml

```yaml
# docker-compose.prod.yml
services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=https://api.kainwangroger.com/api/v1
    restart: always

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/porfolio
      - SECRET_KEY=${SECRET_KEY}
      - CORS_ORIGINS=["https://kainwangroger.com"]
      - DEBUG=False
    depends_on:
      db:
        condition: service_healthy
    restart: always

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: porfolio
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5
    restart: always

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./nginx/ssl:/etc/nginx/ssl
    depends_on:
      - frontend
      - backend
    restart: always

volumes:
  pgdata:
```

### Étape 6 : Configurer Nginx

```bash
mkdir -p nginx/ssl

cat > nginx/nginx.conf << 'EOF'
events {}
http {
    upstream frontend {
        server frontend:3000;
    }
    upstream backend {
        server backend:8000;
    }

    server {
        listen 80;
        server_name kainwangroger.com www.kainwangroger.com;

        location / {
            proxy_pass http://frontend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        location /api/ {
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
EOF
```

### Étape 7 : SSL avec Certbot

```bash
# Installer Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtenir le certificat
sudo certbot --nginx -d kainwangroger.com -d www.kainwangroger.com

# Auto-renewal
sudo crontab -e
# Ajouter : 0 12 * * * /usr/bin/certbot renew --quiet
```

### Étape 8 : Lancer

```bash
docker compose -f docker-compose.prod.yml up -d --build

# Initialiser la base
docker compose -f docker-compose.prod.yml exec backend python seed.py
docker compose -f docker-compose.prod.yml exec backend python import_github.py
```

### Étape 9 : DNS

Chez votre registrar, configurer :

| Type | Nom | Valeur |
|------|-----|--------|
| A | @ | <IP_DU_VPS> |
| A | www | <IP_DU_VPS> |
| A | api | <IP_DU_VPS> |

### Coût

| Service | Coût |
|---------|------|
| VPS Hetzner CPX21 | 4.50 €/mois |
| Domaine | ~10 €/an |
| **Total** | **~5 €/mois** |

---

## Option 4 : AWS (Production Enterprise)

Pour une mise en production sérieuse avec haute disponibilité.

```
CloudFront + S3 (Frontend) → ALB → ECS/Fargate (Backend) → RDS PostgreSQL
```

### Architecture

```
Utilisateur → Route 53 → CloudFront → S3 (Frontend Next.js)
                                  ↓
                               ALB → ECS Fargate (Backend FastAPI)
                                          ↓
                                      RDS PostgreSQL
```

### Étape 1 : Infrastructure avec Terraform

```hcl
# infrastructure/main.tf
provider "aws" {
  region = "eu-west-1"
}

# VPC
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.0.0"
  name = "portfolio-vpc"
  cidr = "10.0.0.0/16"
  azs = ["eu-west-1a", "eu-west-1b"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24"]
  enable_nat_gateway = true
}

# RDS PostgreSQL
resource "aws_db_instance" "portfolio" {
  identifier = "portfolio-db"
  engine = "postgres"
  engine_version = "16"
  instance_class = "db.t3.micro"
  allocated_storage = 20
  db_name = "porfolio"
  username = "admin"
  password = var.db_password
  skip_final_snapshot = true
}

# ECS Cluster
resource "aws_ecs_cluster" "portfolio" {
  name = "portfolio-cluster"
}

# ECR Repository
resource "aws_ecr_repository" "backend" {
  name = "portfolio-backend"
}
```

### Étape 2 : Déployer le frontend sur S3 + CloudFront

```bash
# Build le frontend
cd frontend
npm run build

# Créer un bucket S3
aws s3 mb s3://kainwangroger-frontend

# Sync les fichiers
aws s3 sync .next/static s3://kainwangroger-frontend/_next/static
aws s3 sync public s3://kainwangroger-frontend

# Activer le hosting web
aws s3 website s3://kainwangroger-frontend --index-document index.html --error-document 404.html
```

### Coût estimé

| Service | Coût mensuel |
|---------|-------------|
| RDS db.t3.micro | ~12 €/mois |
| ECS Fargate | ~5-15 €/mois |
| CloudFront | ~1-5 €/mois |
| S3 | ~0.50 €/mois |
| **Total** | **~20-35 €/mois** |

---

## Option 5 : Azure (Gratuit pour étudiants)

Microsoft offre 200$ de crédit gratuit + services gratuits.

### Étape 1 : Créer un compte Azure

1. Créer un compte sur https://portal.azure.com
2. Activer les 200$ de crédit gratuit
3. (Optionnel) Vérifier le statut étudiant pour 100$ de plus via https://azure.microsoft.com/free/students/

### Étape 2 : Déployer le backend sur Azure App Service

```bash
# Installer Azure CLI
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
az login

# Créer un groupe de ressources
az group create --name portfolio-rg --location westeurope

# Créer un App Service Plan
az appservice plan create --name portfolio-plan --resource-group portfolio-rg --sku B1

# Créer l'App Service
az webapp create --name portfolio-api --resource-group portfolio-rg --plan portfolio-plan --runtime "PYTHON:3.12"

# Configurer les variables d'environnement
az webapp config appsettings set --name portfolio-api --resource-group portfolio-rg \
  --settings DATABASE_URL="postgresql://..." SECRET_KEY="..." CORS_ORIGINS='["https://..."]'
```

### Étape 3 : Base de données Azure Database for PostgreSQL

```bash
az postgres server create --name portfolio-db --resource-group portfolio-rg \
  --location westeurope --sku-name B_Gen5_1 --storage-size 5128 \
  --admin-user admin --admin-password MonPass123!
```

### Coût estimé

| Service | Coût mensuel |
|---------|-------------|
| Azure App Service B1 | ~12 €/mois |
| Azure Database for PostgreSQL | ~12 €/mois |
| **Total (avec crédit gratuit)** | **0 € les premiers mois** |

---

## 7. Checklist avant déploiement

### Critique (bloquant)

- [ ] Générer un `SECRET_KEY` sécurisé : `openssl rand -hex 32`
- [ ] Configurer `DATABASE_URL` vers PostgreSQL (pas SQLite)
- [ ] Configurer `CORS_ORIGINS` avec l'URL du frontend en production
- [ ] Configurer `NEXT_PUBLIC_API_URL` avec l'URL du backend en production
- [ ] Changer le mot de passe admin (`admin123` → mot de passe fort)
- [ ] Activer HTTPS

### Important

- [ ] Seed la base de données (admin, skills, projets)
- [ ] Importer les projets GitHub (`import_github.py`)
- [ ] Vérifier que le CV se télécharge correctement
- [ ] Tester le formulaire contact
- [ ] Vérifier le thème sombre/clair
- [ ] Tester sur mobile

### Optionnel mais recommandé

- [ ] Configurer un domaine personnalisé
- [ ] Ajouter Google Analytics ou Umami
- [ ] Configurer un health check monitoring
- [ ] Ajouter des headers de sécurité (HSTS, CSP)
- [ ] Optimiser les images (Next.js Image component)
- [ ] Ajouter un sitemap.xml
- [ ] Ajouter un robots.txt

---

## 8. Améliorations recommandées

### Priorité haute

| Améliation | Détail | Impact |
|------------|--------|--------|
| **Migrations Alembic** | Pas de migrations en place. Les tables sont créées via `create_all()`. En prod, il faut des migrations pour évoluer le schéma. | Fiabilité |
| **Tests** | Aucun test unitaire ou d'intégration. Ajouter pytest pour le backend. | Qualité |
| **Secrets management** | Le `SECRET_KEY` est en dur dans `.env`. Utiliser les secrets du cloud provider. | Sécurité |
| **Rate limiting** | Pas de protection contre le brute force sur `/auth/login`. Ajouter slowapi ou nginx rate limiting. | Sécurité |
| **Logging structuré** | Pas de logging centralisé. Ajouter structlog ou JSON logging. | Observabilité |

### Priorité moyenne

| Améliation | Détail | Impact |
|------------|--------|--------|
| **CI/CD** | Pas de pipeline. Ajouter GitHub Actions pour les tests et le déploiement automatique. | Productivité |
| **Health check** | Ajouter un endpoint `/health` plus détaillé (vérifier la DB). | Monitoring |
| **Error handling** | Les erreurs API sont basiques. Ajouter des erreurs structurées. | UX |
| **Image optimization** | Utiliser `next/image` pour optimiser les images. | Performance |
| **SEO** | Ajouter sitemap.xml, robots.txt, meta tags dynamiques. | Visibilité |

### Priorité basse

| Améliation | Détail | Impact |
|------------|--------|--------|
| **Cache** | Ajouter Redis pour cacher les réponses API. | Performance |
| **CDN** | Utiliser CloudFront ou Cloudflare pour le cache static. | Performance |
| **Analytics** | Intégrer Umami ou Plausible pour le tracking. | Insights |
| **Contact email** | Configurer Resend pour l'envoi d'emails. | Fonctionnalité |

---

## Résumé des options

| Option | Difficulté | Coût | Fiabilité | Recommandé pour |
|--------|-----------|------|-----------|-----------------|
| **Vercel + Render + Neon** | ⭐ Facile | 0 €/mois | ⭐⭐ | Portfolio personnel |
| **Vercel + Railway + Supabase** | ⭐ Facile | 0-5 €/mois | ⭐⭐⭐ | Portfolio + side projects |
| **VPS Hetzner + Docker** | ⭐⭐ Moyen | 5 €/mois | ⭐⭐⭐ | Control total, apprenez DevOps |
| **AWS** | ⭐⭐⭐ Complexe | 20-35 €/mois | ⭐⭐⭐⭐⭐ | Production enterprise |
| **Azure** | ⭐⭐ Moyen | 0 € (crédit) | ⭐⭐⭐⭐ | Étudiants, POC |

**Recommandation** : Commencez par l'**Option 1** (gratuit), puis migrez vers l'**Option 3** (VPS) quand vous voulez plus de contrôle.

---

*Dernière mise à jour : Juillet 2026*
