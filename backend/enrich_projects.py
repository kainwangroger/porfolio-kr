"""
Script d'enrichissement automatique des descriptions et contenus des projets
en téléchargeant et analysant leurs README.md depuis GitHub.
"""

import time
import httpx
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.project import Project

# Descriptions de secours enrichies et rédigées de manière professionnelle
# pour les projets typiques d'un Data Engineer.
TECH_FALLBACKS = {
    "cdc-iceberg-lakehouse": {
        "desc": "Pipeline de capture de données modifiées (CDC) en temps réel avec ingestion continue dans un Lakehouse Apache Iceberg pour des analyses historiques performantes.",
        "content": """## À propos du projet

Ce projet implémente un pipeline d'ingestion de données en temps réel utilisant le pattern **Change Data Capture (CDC)**. Il capture les modifications de bases de données transactionnelles (comme PostgreSQL ou MySQL) et les écrit de façon continue dans des tables **Apache Iceberg** au sein d'un Lakehouse moderne.

## Architecture & Composants

- **Source transactionnelle** : Ingestion des mutations de tables (Insert, Update, Delete).
- **Moteur d'ingestion (CDC)** : Détection et streaming des événements.
- **Stockage Lakehouse** : Apache Iceberg offrant des fonctionnalités ACID, du time-travel, et des performances de requêtage élevées sur stockage objet (S3/MinIO).
- **Orchestration / Moteur de requêtes** : Analyse SQL avec Trino ou Apache Spark.

## Technologies Clés

- Apache Iceberg
- Python / PySpark
- Docker Compose
- Debezium / Kafka (CDC)
"""
    },
    "Data-Mesh-SelfService": {
        "desc": "Implémentation d'une plateforme de données décentralisée (Data Mesh) en libre-service, permettant aux équipes métiers de publier et consommer des produits de données.",
        "content": """## À propos du projet

Ce projet propose un framework et une architecture de référence pour le déploiement d'un **Data Mesh** orienté libre-service (Self-Service Data Platform). Il permet la décentralisation de la propriété des données par domaine métier, tout en garantissant une gouvernance globale.

## Fonctionnalités Principales

- **Définition de Data Products** : Modélisation des données en tant que produits autonomes et réutilisables.
- **Portail Libre-Service** : Catalogue de données et provisioning automatisé des ressources.
- **Gouvernance Fédérée** : Contrôles d'accès automatisés, qualité des données et conformité (RGPD/Data Lineage).

## Technologies Clés

- Python
- APIs REST (FastAPI / Flask)
- Gouvernance (Apache Atlas ou similaire)
- Conteneurisation (Docker)
"""
    },
    "finops-cost-optimization": {
        "desc": "Outils et scripts d'analyse automatique pour l'optimisation des coûts d'infrastructure cloud (AWS/GCP), la détection des ressources inutilisées et le reporting de budget.",
        "content": """## À propos du projet

Un ensemble d'outils et de scripts d'automatisation conçus pour appliquer les principes **FinOps** de gestion et d'optimisation des coûts dans le cloud. Le script analyse les configurations d'infrastructure pour identifier les opportunités d'économies d'échelle.

## Fonctionnalités Principales

- **Audit d'Infrastructure** : Identification des disques non attachés, des instances sous-utilisées et des adresses IP orphelines.
- **Calculateur de Recommandations** : Algorithmes suggérant des changements de type d'instance (Right-sizing) et des plans de réservation.
- **Reporting Financier** : Alertes automatiques de dépassement de budget et dashboards de coûts.

## Technologies Clés

- Python / Boto3 (AWS SDK)
- CLI Cloud (AWS/GCP)
- Dashboards de reporting (Matplotlib / Streamlit)
"""
    },
    "observability-data-governance": {
        "desc": "Plateforme d'observabilité des pipelines de données et gouvernance des métadonnées, avec suivi du lignage (lineage) et alertes en cas d'anomalies de schéma.",
        "content": """## À propos du projet

Ce projet met en place une solution complète pour assurer l'observabilité opérationnelle des pipelines de données (Data Lineage, Data Quality, SLA) et la gouvernance globale des métadonnées de l'entreprise.

## Fonctionnalités Principales

- **Suivi du Lignage (Lineage)** : Visualisation du cycle de vie des données, de la source brute aux rapports décisionnels.
- **Contrôle Qualité automatique** : Validation des schémas de données et détection des dérives (schema drift).
- **Système d'Alerting** : Notifications en cas d'échecs de jobs ou de ralentissements anormaux des traitements.

## Technologies Clés

- OpenLineage / Great Expectations
- Python
- Docker Compose
- Prometheus / Grafana (Alerting)
"""
    },
    "elasticsearch-analytics": {
        "desc": "Moteur d'indexation et d'analyse de logs distribués à grande échelle en combinant Elasticsearch et des pipelines de traitement logistiques.",
        "content": """## À propos du projet

Une architecture d'analyse et de recherche plein texte sur des volumes massifs de logs et de données textuelles. Elle combine l'indexation Elasticsearch avec des pipelines de parsing de données pour un reporting analytique en temps réel.

## Fonctionnalités Principales

- **Indexation Distribuée** : Configuration de clusters Elasticsearch optimisés pour l'écriture rapide.
- **Parsing de Logs** : Transformation et enrichissement automatique de données textuelles brutes.
- **Tableaux de bord analytiques** : Visualisations de métriques de sécurité et de performances.

## Technologies Clés

- Elasticsearch / Kibana
- Python / Logstash
- Docker
"""
    },
    "multicloud-data-platform": {
        "desc": "Architecture de plateforme de données hybride et multicloud permettant de synchroniser et de traiter des flux de données entre AWS, GCP et Azure.",
        "content": """## À propos du projet

Ce projet fournit une architecture de référence pour le déploiement d'une plateforme de données distribuée à travers plusieurs fournisseurs de cloud public (AWS, Azure, GCP), évitant la dépendance vis-à-vis d'un seul fournisseur (Vendor Lock-in).

## Fonctionnalités Principales

- **Abstraction Multi-Cloud** : API d'accès unifiée aux stockages objets (S3, GCS, Blob Storage).
- **Synchronisation de données** : Réplication asynchrone et sécurisée des datasets sensibles.
- **Orchestration Agnostique** : Jobs de calcul s'exécutant sur le cloud offrant le meilleur ratio performance/coût.

## Technologies Clés

- Apache Spark / Python
- Terraform (IaC Multi-Cloud)
- Kubernetes (K8s)
- Docker
"""
    },
    "geospatial-h3-mobility": {
        "desc": "Analyse géospatiale à grande échelle de flux de mobilité urbaine en utilisant l'indexation hexagonale H3 d'Uber et le calcul distribué.",
        "content": """## À propos du projet

Ce projet implémente un système d'analyse et de traitement de données de géolocalisation temporelles (flux GPS de véhicules, téléphones mobiles) pour l'optimisation des transports urbains, basé sur le partitionnement spatial **H3** d'Uber.

## Fonctionnalités Principales

- **Indexation Hexagonale H3** : Agrégation de coordonnées GPS en cellules hexagonales pour des calculs géométriques ultra-rapides.
- **Calcul de densité de trafic** : Détection des goulets d'étranglement spatio-temporels.
- **Visualisation Géospatiale** : Rendu des zones de chaleur et de flux de déplacement.

## Technologies Clés

- Uber H3 Spatial Index
- Python / Geopandas / Folium
- Jupyter Notebook
"""
    },
    "feature-store-temps-reel": {
        "desc": "Conception d'un Feature Store pour le Machine Learning en temps réel, stockant et servant des features à basse latence pour des modèles de prédiction en production.",
        "content": """## À propos du projet

Ce projet met en œuvre un **Feature Store** (magasin de caractéristiques) conçu pour centraliser et servir les données nécessaires à l'apprentissage et à l'inférence des modèles de Machine Learning en temps réel.

## Fonctionnalités Principales

- **Serving Basse Latence** : Accès ultra-rapide aux caractéristiques en temps réel pour l'inférence.
- **Entraînement Hors-Ligne** : Extraction cohérente des features historiques pour l'entraînement.
- **Prévention du Data Leakage** : Garantie que les features de test n'incluent pas d'informations futures (Time-travel).

## Technologies Clés

- Redis (Offline & Online serving)
- Feast / Python
- Docker Compose
"""
    },
    "porfolio-kr": {
        "desc": "Le code source complet de ce portfolio professionnel. Architecture moderne combinant FastAPI pour le backend et Next.js 16 pour le frontend.",
        "content": """## À propos du projet

Il s'agit du code source de cette application de portfolio. Il met en pratique des concepts modernes de développement full-stack et d'administration système avec une approche cloud-native et conteneurisée.

## Architecture du Projet

Le projet est divisé en deux parties indépendantes reliées par une API REST :
- **Frontend** : Application Next.js 16 avec React 19, TailwindCSS v4, et Framer Motion pour les animations.
- **Backend** : API REST FastAPI (Python), SQLAlchemy (ORM), et base de données relationnelle.
- **Déploiement** : Docker Compose orchestrant le backend et la base PostgreSQL.

## Fonctionnalités Clés

- Rendu dynamique des projets et compétences via l'API.
- Section d'administration protégée pour le CRUD des projets.
- Suivi analytique des visites et téléchargements.
- Taux de rafraîchissement performant et design sombre responsive.
"""
    },
    "authentification": {
        "desc": "Microservice d'authentification et d'autorisation standard JWT avec chiffrement bcrypt, rate-limiting et gestion sécurisée des sessions utilisateurs.",
        "content": """## À propos du projet

Ce dépôt fournit un template complet et réutilisable pour la mise en place d'un système d'authentification robuste (Login, Register) basé sur les tokens cryptographiques JWT.

## Fonctionnalités Principales

- **Chiffrement sécurisé** : Mots de passe salés et hachés avec l'algorithme Bcrypt.
- **Gestion JWT** : Tokens d'accès signés avec expiration automatique.
- **Rate-Limiting (Anti-Bruteforce)** : Limitation du nombre de tentatives de connexion échouées.

## Technologies Clés

- FastAPI (Python)
- JWT (python-jose)
- Bcrypt / Passlib
"""
    },
    "agence-voyage-Reactjs": {
        "desc": "Interface utilisateur (SPA) moderne pour une agence de voyage, développée en React, avec catalogue de destinations interactif et réservation en ligne.",
        "content": """## À propos du projet

Une application Single Page (SPA) développée en React.js pour le site vitrine d'une agence de voyage moderne. Elle intègre un catalogue interactif et un module de réservation connecté au backend.

## Fonctionnalités Principales

- **Filtres de recherche avancés** : Recherche par destination, prix, et type de séjour.
- **Panier et Réservation** : Processus de commande fluide et connecté à l'API.
- **Design Responsive** : Adaptabilité complète sur mobile et tablette.

## Technologies Clés

- React.js
- Tailwind CSS / Bootstrap
- Axios (Communication API)
"""
    },
    "agence-voyage-backend": {
        "desc": "API REST robuste développée en Java avec Spring Boot et Hibernate pour la gestion des réservations et clients d'une agence de voyage.",
        "content": """## À propos du projet

L'API de gestion backend d'une plateforme d'agence de voyage, développée dans l'écosystème robuste Java Spring Boot.

## Fonctionnalités Principales

- **API RESTful** : Contrôleurs pour la gestion des clients, des voyages, et des réservations.
- **Couche d'accès aux données** : Utilisation de Spring Data JPA et Hibernate pour les intéractions SQL.
- **Sécurisation** : Protection des endpoints administratifs.

## Technologies Clés

- Java / Spring Boot
- JPA / Hibernate / PostgreSQL
- Maven
"""
    }
}


def clean_markdown_headers(text: str) -> str:
    """Nettoie le markdown brut des en-têtes inutiles."""
    # Supprime les badges ou les liens de builds s'il y en a au début
    lines = text.split("\n")
    cleaned_lines = []
    skip = False
    for line in lines:
        if line.strip().startswith("# ") or line.strip().startswith("=="):
            # On ignore le titre principal # Nom-du-projet pour ne pas faire doublon avec le titre de la page
            continue
        cleaned_lines.append(line)
    return "\n".join(cleaned_lines)


def enrich_all_projects():
    db: Session = SessionLocal()
    try:
        projects = db.query(Project).all()
        print(f"🔄 Début de l'enrichissement de {len(projects)} projets...\n")

        with httpx.Client(timeout=15) as client:
            for p in projects:
                # 1. Tenter de récupérer le README original depuis GitHub
                readme_content = ""
                if p.github_url and "github.com/" in p.github_url:
                    parts = p.github_url.split("github.com/")[-1].strip("/").split("/")
                    if len(parts) >= 2:
                        owner, repo = parts[0], parts[1]
                        
                        # Tente sur la branche main puis master
                        for branch in ["main", "master"]:
                            readme_url = f"https://raw.githubusercontent.com/{owner}/{repo}/{branch}/README.md"
                            try:
                                res = client.get(readme_url)
                                if res.status_code == 200:
                                    readme_content = res.text
                                    break
                            except Exception:
                                pass

                # 2. Appliquer les enrichissements
                has_updates = False
                
                # S'il y a un README valide et que le contenu de base est trop court
                if readme_content and len(p.content or "") < 250:
                    cleaned_readme = clean_markdown_headers(readme_content)
                    p.content = cleaned_readme
                    has_updates = True
                    print(f"  📥 README importé pour: {p.title}")

                # S'il n'y a pas de README mais qu'on a un fallback rédigé pour ce projet
                elif p.slug in TECH_FALLBACKS:
                    fallback = TECH_FALLBACKS[p.slug]
                    if not p.description or len(p.description) < 15:
                        p.description = fallback["desc"]
                    if not p.content or len(p.content) < 250:
                        p.content = fallback["content"]
                    has_updates = True
                    print(f"  💡 Fallback technique appliqué pour: {p.title}")

                # Ajustement si la description est toujours absente ou trop simple
                if not p.description or len(p.description) == 0:
                    p.description = f"Dépôt de code pour {p.title}. Explorez le dépôt pour voir l'architecture et les sources."
                    has_updates = True

                # Validation des modifs
                if has_updates:
                    db.add(p)

        db.commit()
        print("\n🎉 Tous les projets ont été enrichis et mis à jour en base de données !")

    except Exception as e:
        db.rollback()
        print(f"\n❌ Erreur : {e}")
    finally:
        db.close()


if __name__ == "__main__":
    enrich_all_projects()
