# Guide Complet des Technologies — Data Engineer / DevOps / Cloud Engineer

Description détaillée, contexte d'utilisation et installation de chaque technologie.

---

## Table des matières

1. [Langages de programmation](#1-langages-de-programmation)
2. [Bases de données relationnelles](#2-bases-de-données-relationnelles)
3. [Bases de données NoSQL](#3-bases-de-données-nosql)
4. [Data Engineering & Big Data](#4-data-engineering--big-data)
5. [Orchestration & ETL](#5-orchestration--etl)
6. [Messaging & Event Streaming](#6-messaging--event-streaming)
7. [Cloud — AWS](#7-cloud--aws)
8. [Cloud — GCP](#8-cloud--gcp)
9. [Cloud — Azure](#9-cloud--azure)
10. [Conteneurs](#10-conteneurs)
11. [Kubernetes & Orchestration](#11-kubernetes--orchestration)
12. [CI/CD](#12-cicd)
13. [Infrastructure as Code](#13-infrastructure-as-code)
14. [Monitoring & Observabilité](#14-monitoring--observabilité)
15. [Logging](#15-logging)
16. [Sécurité](#16-sécurité)
17. [Machine Learning & IA](#17-machine-learning--ia)
18. [Business Intelligence & Visualisation](#18-business-intelligence--visualisation)
19. [LLM & Generative AI](#19-llm--generative-ai)
20. [Web Servers & Reverse Proxies](#20-web-servers--reverse-proxies)
21. [Réseau & DNS](#21-réseau--dns)
22. [Stockage](#22-stockage)
23. [GitOps & Configuration Management](#23-gitops--configuration-management)
24. [Outils de Développement](#24-outils-de-développement)
25. [Concepts & Patterns](#25-concepts--patterns)

---

# 1. Langages de programmation

---

## Python

**Description** : Langage de programmation interprété, polyvalent, connu pour sa syntaxe claire et sa vaste bibliothèque de modules.

**Contexte d'utilisation** :
- Scripting et automatisation
- Data engineering (pipelines ETL, traitement de données)
- Machine learning et data science
- Développement d'API (FastAPI, Flask, Django)
- DevOps (scripts d'infrastructure)

**Dans quels projets** :
- Scripts de nettoyage de données
- APIs REST pour servir des modèles ML
- Pipelines Airflow / Dagster
- Analyse de données avec Pandas
- Scripts d'infrastructure avec Boto3 (AWS), google-cloud (GCP)

**Installation** :

```bash
# Linux (Ubuntu/Debian)
sudo apt update && sudo apt install python3 python3-pip python3-venv

# macOS
brew install python@3.12

# Windows
# Télécharger depuis python.org ou winget install Python.Python.3.12

# Vérifier
python3 --version

# Créer un environnement virtuel
python3 -m venv venv
source venv/bin/activate  # Linux/Mac
# venv\Scripts\activate   # Windows

# Installer des paquets
pip install pandas requests fastapi
```

**Configuration** :
- `pyproject.toml` ou `setup.py` pour les projets
- `.python-version` avec pyenv
- `ruff` pour le linting, `mypy` pour le typage

---

## SQL

**Description** : Langage de requête structuré pour interroger et manipuler des bases de données relationnelles.

**Contexte d'utilisation** :
- Interrogation de données (SELECT)
- Manipulation (INSERT, UPDATE, DELETE)
- Définition de schémas (CREATE TABLE, ALTER)
- Analyse de données (GROUP BY, WINDOW functions)
- ETL / ELT (transformations dans dbt)

**Dans quels projets** :
- Requêtes analytiques sur un data warehouse
- Pipelines dbt pour transformer des données
- Scripts d'initialisation de bases de données
- Dashboards (requêtes sous-jacentes)

**Installation** :
SQL fait partie d'un SGBD. Installer PostgreSQL, MySQL ou SQLite.

```bash
# PostgreSQL
sudo apt install postgresql postgresql-client

# MySQL
sudo apt install mysql-server

# SQLite (déjà inclus dans Python)
python3 -c "import sqlite3; print('SQLite OK')"
```

**Configuration** :
- Client : DBeaver, pgAdmin, DataGrip
- Configuration : `postgresql.conf`, `pg_hba.conf`

---

## Bash / Shell

**Description** : Langage de scripting pour les systèmes UNIX/Linux.

**Contexte d'utilisation** :
- Automatisation de tâches système
- Scripts de déploiement
- Pipeline CI/CD (GitHub Actions, Jenkins)
- Configuration d'infrastructure

**Dans quels projets** :
- Scripts de build et déploiement
- Cron jobs de maintenance
- Scripts de backup de bases de données
- Provisionnement d'instances cloud

**Installation** :

```bash
# Bash est inclus par défaut sur Linux/macOS
bash --version

# Windows : Git Bash ou WSL
```

**Configuration** :
- `.bashrc` / `.bash_profile` pour les aliases et exports
- `shellcheck` pour linting

---

## YAML

**Description** : Format de sérialisation lisible par l'homme, utilisé pour la configuration.

**Contexte d'utilisation** :
- Configuration de Docker Compose
- Manifests Kubernetes
- Pipelines CI/CD (GitHub Actions, GitLab CI)
- Ansible playbooks
- Terraform (HCL est similaire)

**Dans quels projets** :
- `docker-compose.yml` pour les stacks multi-conteneurs
- `*.yaml` pour les déploiements K8s
- `.github/workflows/*.yml` pour CI/CD

**Installation** :
C'est un format de fichier, pas un outil. L'éditeur VS Code a une coloration syntaxique intégrée.

---

## HCL (HashiCorp Configuration Language)

**Description** : Langage de configuration utilisé par Terraform et Vault.

**Contexte d'utilisation** :
- Infrastructure as Code avec Terraform
- Gestion de secrets avec Vault
- Configuration de Packer

**Dans quels projets** :
- Définition d'infrastructures cloud (VPC, EC2, etc.)
- Provisionnement de bases de données
- Gestion d'identités et de politiques

**Installation** :
```bash
# Terraform (inclut le parsing HCL)
brew install terraform  # macOS
# ou
sudo snap install terraform
```

**Configuration** :
- VS Code avec l'extension HashiCorp Terraform
- `terraform fmt` pour formater
- `terraform validate` pour valider

---

## Go (Golang)

**Description** : Langage compilé, performant, créé par Google. Utilisé pour les outils cloud-native.

**Contexte d'utilisation** :
- Outils DevOps (Docker, Kubernetes, Terraform sont écrits en Go)
- Microservices haute performance
- CLI tools
- Outils réseau

**Dans quels projets** :
- Développement d'outils CLI personnalisés
- Microservices pour le traitement de données
- Outils de monitoring

**Installation** :
```bash
# Linux
wget https://go.dev/dl/go1.22.0.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.22.0.linux-amd64.tar.gz
export PATH=$PATH:/usr/local/go/bin

# macOS
brew install go

# Vérifier
go version
```

**Configuration** :
- `go.mod` pour les dépendances
- `GOPATH` pour le workspace

---

## Java

**Description** : Langage compilé, orienté objet, base de l'écosystème Big Data.

**Contexte d'utilisation** :
- Écosystème Hadoop / Spark / Kafka (écrits en Java/Scala)
- Spring Boot pour les APIs
- Applications enterprise

**Dans quels projets** :
- APIs avec Spring Boot
- Consuméurs/producteurs Kafka
- Applications Spark

**Installation** :
```bash
# JDK
sudo apt install openjdk-17-jdk

# Vérifier
java -version
javac -version
```

---

## Scala

**Description** : Langage fonctionnel + objet orienté, fonctionne sur la JVM. Langage natif de Spark.

**Contexte d'utilisation** :
- Apache Spark (langage natif)
- Apache Flink
- Akka (actors model)

**Dans quels projets** :
- Scripts Spark haute performance
- Streaming avec Flink
- Applications distribuées

**Installation** :
```bash
# Installer sbt (build tool)
echo "deb https://repo.scala-sbt.org/scalasbt/debian all main" | sudo tee /etc/apt/sources.list.d/sbt.list
curl -sL "https://keyserver.ubuntu.com/pks/lookup?op=get&search=0x2EE0EA64E40A89B84B2DF73499E82A75642AC823" | sudo apt-key add
sudo apt update && sudo apt install sbt
```

---

# 2. Bases de données relationnelles

---

## PostgreSQL

**Description** : Base de données open-source avancée, connue pour sa fiabilité, ses fonctionnalités et sa conformité aux standards SQL.

**Contexte d'utilisation** :
- Base de données principale pour les applications web
- Data warehouse (avec des extensions)
- Données géospatiales (PostGIS)
- Données vectorielles (pgvector pour l'IA)
- OLTP et OLAP

**Dans quels projets** :
- Backend d'application (API FastAPI, Django, Spring Boot)
- Stockage de données structurées pour pipelines data
- Data warehouse pour entreprises de taille moyaine
- Base de données pour Kubernetes (operators)

**Installation** :

```bash
# Ubuntu/Debian
sudo apt install postgresql postgresql-contrib

# Docker
docker run -d --name postgres \
  -e POSTGRES_PASSWORD=monpass \
  -p 5432:5432 \
  -v pgdata:/var/lib/postgresql/data \
  postgres:16-alpine

# Docker Compose
# docker-compose.yml
services:
  db:
    image: postgres:16-alpine
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: mondb
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

**Configuration** :
- `/etc/postgresql/16/main/postgresql.conf` : paramètres principaux
- `/etc/postgresql/16/main/pg_hba.conf` : authentification
- Client : DBeaver, pgAdmin, DataGrip, psql

**Extensions utiles** :
- `postgis` : données géospatiales
- `pgvector` : recherche vectorielle (IA)
- `pg_trgm` : recherche floue
- `timescaledb` : time-series
- `citus` : distribution

---

## MySQL

**Description** : Système de gestion de bases de données open-source, le plus utilisé au monde pour les applications web.

**Contexte d'utilisation** :
- Applications web (WordPress, Drupal, etc.)
- E-commerce
- CMS
- Applications mobiles backend

**Dans quels projets** :
- Sites web avec PHP/Python
- Applications e-commerce
- APIs REST

**Installation** :

```bash
# Ubuntu/Debian
sudo apt install mysql-server

# Docker
docker run -d --name mysql \
  -e MYSQL_ROOT_PASSWORD=monpass \
  -e MYSQL_DATABASE=mondb \
  -p 3306:3306 \
  -v mysqldata:/var/lib/mysql \
  mysql:8.0
```

---

## SQLite

**Description** : Base de données embarquée, serverless, stockée dans un seul fichier.

**Contexte d'utilisation** :
- Développement local
- Applications mobiles
- Applications de bureau
- Tests et prototypage
- Stockage de configuration

**Dans quels projets** :
- Développement local avant PostgreSQL en production
- Applications mobiles (Room/SQLite sur Android)
- Cache local

**Installation** :
```bash
# Inclus dans Python
python3 -c "import sqlite3; conn = sqlite3.connect('test.db')"

# CLI
sudo apt install sqlite3
sqlite3 ma_base.db
```

---

## ClickHouse

**Description** : Base de données OLAP column-oriented ultra-rapide pour l'analyse en temps réel.

**Contexte d'utilisation** :
- Analytics en temps réel
- Logs analysis
- Métriques time-series
- Data warehousing haute performance

**Dans quels projets** :
- Dashboard analytics en temps réel
- Analyse de logs (remplace ELK pour les gros volumes)
- Tableau de bord business

**Installation** :
```bash
# Docker
docker run -d --name clickhouse \
  -p 8123:8123 -p 9000:9000 \
  clickhouse/clickhouse-server

# Ubuntu
curl https://packages.clickhouse.com/rpm/lts/repodata/repomd.xml.key | sudo apt-key add -
echo "deb https://packages.clickhouse.com/deb stable main" | sudo tee /etc/apt/sources.list.d/clickhouse.list
sudo apt update && sudo apt install clickhouse-server clickhouse-client
```

---

## DuckDB

**Description** : Base de données OLAP in-process (comme SQLite mais pour l'analyse). Ultra-rapide pour les requêtes analytiques sur des fichiers.

**Contexte d'utilisation** :
- Analyse de fichiers Parquet/CSV/JSON
- Remplace Pandas pour les gros volumes
- Prototypage rapide de requêtes analytiques
- Embedded analytics

**Dans quels projets** :
- Analyse rapide de datasets
- Exploration de fichiers Parquet
- Remplacement de Pandas quand les données ne tiennent pas en RAM

**Installation** :
```bash
pip install duckdb

# Python
import duckdb
duckdb.sql("SELECT * FROM 'fichier.parquet' WHERE colonne > 10")
```

---

## Apache Superset

**Description** : Plateforme de Business Intelligence open-source (Apache). Alternative à Power BI / Tableau.

**Contexte d'utilisation** :
- Dashboards interactifs
- Exploration de données SQL
- Visualisation de métriques business
- Alternative open-source à Tableau/Power BI

**Dans quels projets** :
- Dashboard interne pour une équipe data
- Visualisation de métriques de production
- Reporting automatisé

**Installation** :
```bash
# Docker (recommandé)
git clone https://github.com/apache/superset.git
cd superset
docker compose up -d

# Ou via pip
pip install apache-superset
superset db upgrade
superset fab create-admin --username admin --firstname Admin --lastname User --email admin@example.com --password admin
superset init
superset run -p 8088 --with-threads --reload
```

**Configuration** :
- `superset_config.py` : configuration principale
- Connecteurs : PostgreSQL, MySQL, BigQuery, Redshift, etc.

---

# 3. Bases de données NoSQL

---

## MongoDB

**Description** : Base de données document (JSON), flexible, orientée performance.

**Contexte d'utilisation** :
- Données semi-structurées (JSON/BSON)
- Catalogues de produits
- Contenu utilisateur
- IoT (données hétérogènes)
- Prototypage rapide (pas de schéma fixe)

**Dans quels projets** :
- Backend d'application avec des schémas qui évoluent souvent
- Stockage de logs au format JSON
- API pour applications mobiles

**Installation** :
```bash
# Docker
docker run -d --name mongo \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=admin \
  -v mongodata:/data/db \
  mongo:7

# Ubuntu
wget -qO- https://www.mongodb.org/static/pgp/server-7.0.asc | sudo tee /etc/apt/trusted.gpg.d/server-7.0.asc
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt update && sudo apt install mongodb-org
sudo systemctl start mongod
```

**Configuration** :
- Client : MongoDB Compass (GUI), mongosh (CLI)
- `/etc/mongod.conf` : configuration

---

## Redis

**Description** : Base de données key-value in-memory, ultra-rapide. Utilisée comme cache, session store, et file d'attente.

**Contexte d'utilisation** :
- Cache de données (réduire les requêtes DB)
- Sessions utilisateur
- File d'attente (Redis Lists, Streams)
- Rate limiting
- Pub/Sub pour les notifications temps réel
- Stockage de données temporaires

**Dans quels projets** :
- Cache pour une API (ex: stocker le résultat d'une requête SQL pendant 5 min)
- Sessions pour une application web
- File d'attente pour des tâches asynchrones
- Real-time leaderboard

**Installation** :
```bash
# Docker
docker run -d --name redis -p 6379:6379 redis:7-alpine redis-server --appendonly yes

# Ubuntu
sudo apt install redis-server
sudo systemctl enable redis-server
```

**Configuration** :
- `redis.conf` : configuration
- Client : RedisInsight (GUI), redis-cli (CLI)

---

## Elasticsearch

**Description** : Moteur de recherche et analytics distribué, basé sur Apache Lucene.

**Contexte d'utilisation** :
- Recherche full-text (type Google)
- Analyse de logs (ELK Stack)
- Analytics temps réel
- APM (Application Performance Monitoring)
- Dashboard de métriques

**Dans quels projets** :
- Moteur de recherche pour une application e-commerce
- Centralisation et recherche dans les logs
- Analyse de données de clics/utilisateurs
- Système de recommandation (avec les scores de pertinence)

**Installation** :
```bash
# Docker
docker run -d --name elasticsearch \
  -p 9200:9200 -p 9300:9300 \
  -e "discovery.type=single-node" \
  -e "xpack.security.enabled=false" \
  -v esdata:/usr/share/elasticsearch/data \
  elasticsearch:8.12.0

# Kibana (UI)
docker run -d --name kibana \
  -p 5601:5601 \
  -e ELASTICSEARCH_HOSTS=http://elasticsearch:9200 \
  kibana:8.12.0
```

---

## InfluxDB

**Description** : Base de données time-series optimisée pour les métriques, événements et données temporelles.

**Contexte d'utilisation** :
- Métriques d'infrastructure (CPU, RAM, réseau)
- Données IoT (capteurs)
- Monitoring d'applications
- Données financières (prix en temps réel)

**Dans quels projets** :
- Remplace Prometheus pour le stockage long terme
- Collecte de métriques personnalisées
- IoT dashboard

**Installation** :
```bash
# Docker
docker run -d --name influxdb \
  -p 8086:8086 \
  -v influxdata:/var/lib/influxdb2 \
  influxdb:2.7
```

---

# 4. Data Engineering & Big Data

---

## Apache Spark

**Description** : Moteur de calcul distribué open-source pour le traitement de données à grande échelle. Supporte batch, streaming, ML et graphes.

**Contexte d'utilisation** :
- Traitement de données massives (batch)
- ETL à grande échelle
- Machine Learning distribué (Spark MLlib)
- Traitement de données en streaming (Structured Streaming)

**Dans quels projets** :
- Pipeline ETL quotidien sur des téraoctets de données
- Nettoyage et transformation de données brutes
- Entraînement de modèles ML sur de gros datasets
- Analyse de logs distribués

**Installation** :
```bash
# Via Docker (recommandé pour débuter)
docker run -d --name spark \
  -p 8080:8080 -p 7077:7077 \
  bitnami/spark:3.5

# PySpark (Python)
pip install pyspark

# Local mode
from pyspark.sql import SparkSession
spark = SparkSession.builder.master("local[*]").appName("MonApp").getOrCreate()
```

**Configuration** :
- `spark-defaults.conf` : paramètres par défaut
- `spark-env.sh` : variables d'environnement
- Spark Master UI : `http://localhost:8080`

---

## Apache Kafka

**Description** : Plateforme de streaming distribuée pour la gestion d'événements en temps réel. Stocke des flux de données comme un log distribué.

**Contexte d'utilisation** :
- Event streaming temps réel
- Intégration de données (Kafka Connect)
- Microservices communication (event-driven)
- CDC (Change Data Capture)
- File d'attente distribuée

**Dans quels projets** :
- Pipeline temps réel : données → Kafka → Flink/Spark → Base de données
- Intégration entre systèmes hétérogènes
- Collecte de logs en temps réel
- Notification d'événements (nouvelle commande, nouveau utilisateur)

**Installation** :
```bash
# Docker Compose
# docker-compose.yml
services:
  zookeeper:
    image: confluentinc/cp-zookeeper:7.5.0
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
  kafka:
    image: confluentinc/cp-kafka:7.5.0
    ports:
      - "9092:9092"
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
    depends_on:
      - zookeeper

docker compose up -d

# Créer un topic
docker exec kafka kafka-topics --create --topic mon-topic --bootstrap-server localhost:9092 --partitions 3 --replication-factor 1
```

**Configuration** :
- `server.properties` : configuration du broker
- Schema Registry pour la gestion des schémas
- Kafka Connect pour les connecteurs

---

## dbt (data build tool)

**Description** : Outil de transformation de données SQL. Permet de documenter, tester et versionner les transformations de données dans un data warehouse.

**Contexte d'utilisation** :
- Transformation de données dans un data warehouse (ELT)
- Documentation automatique du lineage des données
- Tests de qualité de données
- Versioning des transformations SQL

**Dans quels projets** :
- Transformations dans BigQuery / Snowflake / Redshift / PostgreSQL
- Création de vues matérialisées
- Nettoyage et agrégation de données brutes
- Data modeling (dimensions, faits)

**Installation** :
```bash
pip install dbt-core dbt-postgresql  # ou dbt-bigquery, dbt-snowflake, etc.

# Initialiser un projet
dbt init mon_projet
cd mon_projet

# Structure
# models/
#   staging/    ← Nettoyage des données brutes
#   marts/      ← Tables métier
# tests/
# macros/
# dbt_project.yml

# Exécuter
dbt run          # Exécute les transformations
dbt test         # Lance les tests
dbt docs generate  # Génère la documentation
dbt docs serve     # Ouvre la doc dans le navigateur
```

**Configuration** :
- `dbt_project.yml` : configuration du projet
- `profiles.yml` : connexion à la base de données
- `packages.yml` : dépendances (macros communautaires)

---

## Apache Airflow

**Description** : Plateforme d'orchestration de workflows (DAGs). Permet de planifier et exécuter des pipelines de données programmablement.

**Contexte d'utilisation** :
- Orchestration de pipelines ETL
- Planification de tâches (cron-like)
- Dépendances entre tâches
- Monitoring des pipelines
- Retry automatique en cas d'échec

**Dans quels projets** :
- Pipeline quotidien : extract → transform → load → test
- Orchestration de jobs Spark
- Envoi d'emails/rapports automatisés
- Synchronisation de données entre systèmes

**Installation** :
```bash
# Docker Compose (recommandé)
curl -LfO 'https://airflow.apache.org/docs/apache-airflow/2.8.0/docker-compose.yaml'
mkdir -p ./dags ./logs ./plugins
echo -e "AIRFLOW_UID=$(id -u)" > .env
docker compose up airflow-init
docker compose up -d

# Ou via pip
pip install apache-airflow
airflow db migrate
airflow users create --username admin --password admin --firstname Admin --lastname User --role Admin --email admin@example.com
airflow scheduler &
airflow webserver &
```

**Configuration** :
- `airflow.cfg` : configuration principale
- `dags/` : dossier contenant les DAGs Python
- UI : `http://localhost:8080`

---

## Apache Flink

**Description** : Framework de stream processing distribué, conçu pour le traitement de données en temps réel avec exactement-once semantics.

**Contexte d'utilisation** :
- Stream processing temps réel
- Analyse de données en continu
- Détection de fraudes
- Calcul de métriques en temps réel
- Traitement d'événements

**Dans quels projets** :
- Pipeline temps réel : Kafka → Flink → Base de données
- Agrégation de données en temps réel
- Détection d'anomalies

**Installation** :
```bash
# Docker
docker run -d --name flink \
  -p 8081:8081 \
  flink:1.17-jobmanager

docker run -d --name flink-taskmanager \
  --link flink:jobmanager \
  -e JOB_MANAGER_RPC_ADDRESS=flink \
  flink:1.17-taskmanager

# PyFlink (Python)
pip install apache-flink
```

---

## Apache NiFi

**Description** : Outil d'automatisation de flux de données. Interface visuelle pour concevoir des pipelines de données.

**Contexte d'utilisation** :
- Ingestion de données depuis des sources hétérogènes
- Routing et transformation de données
- Intégration de systèmes
- Collecte de logs

**Dans quels projets** :
- Collecte de données depuis des APIs vers un data lake
- Transformation de formats (CSV → JSON → Parquet)
- Intégration entre systèmes legacy et modernes

**Installation** :
```bash
# Docker
docker run -d --name nifi \
  -p 8080:8080 \
  apache/nifi:1.23.0

# UI : http://localhost:8080/nifi
```

---

## MinIO

**Description** : Serveur d'objet S3-compatible, open-source. Alternative self-hosted à Amazon S3.

**Contexte d'utilisation** :
- Data lake on-premise
- Stockage d'objets (images, vidéos, fichiers)
- Backup
- Remplacement de S3 en développement local

**Dans quels projets** :
- Data lake local pour Spark/Flink
- Stockage de fichiers pour des pipelines ETL
- Backup de bases de données
- Alternative à S3 pour les environnements on-premise

**Installation** :
```bash
# Docker
docker run -d --name minio \
  -p 9000:9000 -p 9001:9001 \
  -e MINIO_ROOT_USER=admin \
  -e MINIO_ROOT_PASSWORD=admin123 \
  -v miniodata:/data \
  minio/minio server /data --console-address ":9001"

# UI : http://localhost:9001
# API : http://localhost:9000

# Installer mc (MinIO Client)
wget https://dl.min.io/client/mc/release/linux-amd64/mc
chmod +x mc && sudo mv mc /usr/local/bin/
mc alias set local http://localhost:9000 admin admin123
mc mb local/mon-bucket
```

---

## Apache Iceberg

**Description** : Format de table open-source pour les data lakes. Permet des opérations ACID sur des données stockées dans S3/GCS/ADLS.

**Contexte d'utilisation** :
- Data lakehouse (combiner data lake + data warehouse)
- Time travel (requêter les données à un instant T)
- Schema evolution
- Partition evolution
- Upsert/delete sur des données Parquet

**Dans quels projets** :
- Table format pour un data lake Spark/Flink
- Migration d'un data lake HDFS vers un lakehouse
- Gestion de versions de données

**Installation** :
Iceberg est une bibliothèque, pas un serveur.

```python
# Spark + Iceberg
# spark-defaults.conf
spark.jars.packages=org.apache.iceberg:iceberg-spark-runtime-3.5_2.12:1.4.3
spark.sql.catalog.glue_catalog=org.apache.iceberg.spark.SparkCatalog
spark.sql.catalog.glue_catalog.warehouse=s3://mon-bucket/iceberg

# Créer une table
spark.sql("CREATE TABLE mon_catalog.ma_table (id INT, nom STRING) USING iceberg")
```

---

# 5. Orchestration & ETL

Voir [Apache Airflow](#apache-airflow), [dbt](#dbt-data-build-tool), [Apache NiFi](#apache-nifi) ci-dessus.

---

## Dagster

**Description** : Framework moderne d'orchestration de données. Permet de définir des pipelines comme des graphes d'assets (asset-oriented).

**Contexte d'utilisation** :
- Orchestration de pipelines data modernes
- Asset-based orchestration (vs task-based comme Airflow)
- Data quality intégrée
- Développement local avec test hot-reload

**Dans quels projets** :
- Pipeline ETL moderne avec assets matérialisés
- Orchestration dbt + Spark + Python
- Data platform avec monitoring des assets

**Installation** :
```bash
pip install dagster dagster-webserver dagster-postgres dagster-docker

# Créer un projet
dagster project scaffold --name mon_projet
cd mon_projet

# Lancer
dagster dev
# UI : http://localhost:3000
```

---

## Airbyte

**Description** : Plateforme d'intégration de données (ELT) open-source. Connector hub pour extraire des données de sources vers des destinations.

**Contexte d'utilisation** :
- ELT : extraction de données depuis des sources (APIs, BDD, fichiers)
- Sync de données entre systèmes
- CDC (Change Data Capture)
- 300+ connecteurs prêts à l'emploi

**Dans quels projets** :
- Synchronisation de données Salesforce → Snowflake
- CDC de MySQL vers PostgreSQL
- Extraction de données depuis des APIs REST

**Installation** :
```bash
# Docker Compose
git clone https://github.com/airbytehq/airbyte.git
cd airbyte
docker compose up -d
# UI : http://localhost:8000
```

---

# 6. Messaging & Event Streaming

Voir [Apache Kafka](#apache-kafka) ci-dessus.

---

## RabbitMQ

**Description** : Message broker open-source implémentant AMQP. Gère les files d'attente, le routage de messages et le pub/sub.

**Contexte d'utilisation** :
- File d'attente de tâches (workers)
- Communication inter-services
- Routing complexe de messages
- Job queue pour traitement asynchrone

**Dans quels projets** :
- File d'attente pour l'envoi d'emails
- Traitement asynchrone de commandes
- Communication entre microservices

**Installation** :
```bash
# Docker
docker run -d --name rabbitmq \
  -p 5672:5672 -p 15672:15672 \
  -e RABBITMQ_DEFAULT_USER=admin \
  -e RABBITMQ_DEFAULT_PASS=admin \
  rabbitmq:3-management

# UI : http://localhost:15672
```

---

## Redis Streams

**Description** : Structure de données Redis pour le streaming d'événements. Alternative légère à Kafka pour les cas d'usage simples.

**Contexte d'utilisation** :
- Streaming d'événements léger
- File d'attente temps réel
- Pub/Sub avec historique
- IoT data ingestion

**Installation** :
Redis inclut les Streams nativement. Voir [Redis](#redis).

---

# 7. Cloud — AWS

---

## Amazon S3 (Simple Storage Service)

**Description** : Service de stockage d'objets infiniment scalable. Le pilier du stockage dans AWS.

**Contexte d'utilisation** :
- Data lake (stockage brut de données)
- Backup et archivage
- Hébergement de sites web statiques
- Stockage de logs
- Distribution de contenu (avec CloudFront)

**Dans quels projets** :
- Data lake pour un pipeline Spark/Flink
- Stockage de datasets pour ML
- Hébergement de fichiers statiques
- Backup de bases de données

**Configuration AWS CLI** :
```bash
# Installer AWS CLI
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip && sudo ./aws/install

# Configurer
aws configure
# AWS Access Key ID: ***
# AWS Secret Access Key: ***
# Default region name: us-east-1

# Créer un bucket
aws s3 mb s3://mon-bucket --region us-east-1

# Uploader un fichier
aws s3 cp fichier.parquet s3://mon-bucket/donnees/

# Lister les objets
aws s3 ls s3://mon-bucket/
```

---

## Amazon EC2 (Elastic Compute Cloud)

**Description** : Service de VMs (instances virtuelles) à la demande.

**Contexte d'utilisation** :
- Hébergement d'applications
- Serveurs de développement
- Clusters de calcul
- Environnements de test

**Installation** :
Via la console AWS ou AWS CLI :
```bash
# Lancer une instance
aws ec2 run-instances \
  --image-id ami-0c55b159cbfafe1f0 \
  --instance-type t3.micro \
  --key-name ma-cle \
  --security-group-ids sg-xxxxx \
  --subnet-id subnet-xxxxx
```

---

## AWS Lambda

**Description** : Compute serverless. Exécute du code sans provisionner de serveur. Pay-as-you-go.

**Contexte d'utilisation** :
- APIs serverless (avec API Gateway)
- Traitement d'événements (S3, SQS, DynamoDB Streams)
- ETL léger
- Scheduled tasks (cron)
- Webhooks

**Dans quels projets** :
- API pour récupérer des données depuis S3
- Traitement automatique de fichiers uploadés
- Nettoyage de données programmé

**Installation** :
```bash
# AWS SAM (Serverless Application Model)
pip install aws-sam-cli
sam init
sam build
sam deploy --guided
```

---

## Amazon RDS (Relational Database Service)

**Description** : Service de bases de données relationnelles managé. Supporte PostgreSQL, MySQL, MariaDB, Oracle, SQL Server.

**Contexte d'utilisation** :
- Base de données managée pour applications web
- Backups automatiques
- Multi-AZ pour haute disponibilité
- Read replicas pour performance

**Configuration** :
```bash
# Créer une instance RDS
aws rds create-db-instance \
  --db-instance-identifier ma-base \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username admin \
  --master-user-password monpass \
  --allocated-storage 20
```

---

## Amazon Redshift

**Description** : Data warehouse cloud managé. Columnar storage, parallélisme massif, optimisé pour l'analyse.

**Contexte d'utilisation** :
- Data warehouse pour analytics
- Requêtes SQL sur de gros volumes
- Intégration avec S3 (Redshift Spectrum)
- BI et reporting

**Configuration** :
```bash
# Cluster Redshift
aws redshift create-cluster \
  --cluster-identifier mon-cluster \
  --node-type dc2.large \
  --number-of-nodes 2 \
  --master-username admin \
  --master-user-password MonPass123
```

---

## Amazon Athena

**Description** : Service de requête SQL serverless sur des données stockées dans S3.

**Contexte d'utilisation** :
- Requêtes ad-hoc sur des données dans S3
- Analyse de logs
- Exploration de données Parquet/CSV/JSON
- Alternative à un data warehouse pour des analyses ponctuelles

**Dans quels projets** :
- Analyse de logs d'application stockés dans S3
- Exploration rapide de datasets
- Création de tables partitionnées

**Configuration** :
```sql
-- Créer une table externe
CREATE EXTERNAL TABLE logs (
  timestamp TIMESTAMP,
  level STRING,
  message STRING
)
ROW FORMAT SERDE 'org.apache.hadoop.hive.serde2.lazy.LazySimpleSerDe'
LOCATION 's3://mon-bucket/logs/';
```

---

## AWS Glue

**Description** : Service ETL serverless. Catalog de données (Data Catalog), jobs ETL, et crawlers.

**Contexte d'utilisation** :
- ETL serverless (Spark sous-jacent)
- Data Catalog (métadonnées de tables)
- Crawl automatique de données dans S3
- Préparation de données pour Athena/Redshift

**Configuration** :
Via la console AWS ou AWS CLI.

---

## Amazon MSK (Managed Streaming for Kafka)

**Description** : Service managé pour Apache Kafka.

**Contexte d'utilisation** :
- Kafka sans gérer le cluster
- Production à haute disponibilité
- Intégration avec IAM

**Configuration** :
```bash
aws msk create-cluster \
  --cluster-name mon-cluster \
  --kafka-version 3.5.1 \
  --number-of-broker-nodes 3 \
  --broker-node-group-info InstanceType=kafka.m5.large,StorageInfo=VolumeSize=100,ClientSubnets=[subnet-xxx,subnet-yyy,subnet-zzz],SecurityGroups=[sg-xxx]
```

---

# 8. Cloud — GCP

---

## Google BigQuery

**Description** : Data warehouse serverless, scalable, avec paiement à la requête. Analyse de données massives en SQL.

**Contexte d'utilisation** :
- Data warehouse pour analytics
- ML intégré (BigQuery ML)
- Requêtes SQL sur des téraoctets
- Intégration avec Looker/Studio

**Dans quels projets** :
- Analyse de données business
- Dashboard avec Looker
- Modèles ML dans le data warehouse
-替代 Redshift/Snowflake

**Configuration** :
```bash
# Installer gcloud CLI
curl https://sdk.cloud.google.com | bash
gcloud init

# Requête
bq query --use_legacy_sql=false "
SELECT date, SUM(revenue) as total
FROM \`projet.dataset.sales\`
GROUP BY date
ORDER BY date DESC
"
```

---

## Google Cloud Storage (GCS)

**Description** : Service de stockage d'objets (équivalent S3).

**Configuration** :
```bash
# Créer un bucket
gsutil mb -l us-central1 gs://mon-bucket

# Uploader
gsutil cp fichier.parquet gs://mon-bucket/donnees/
```

---

## Google Cloud Composer

**Description** : Apache Airflow managé par Google.

**Configuration** :
Via la console GCP ou gcloud CLI.

---

## Google Pub/Sub

**Description** : Service de messaging asynchrone géré.

**Configuration** :
```bash
# Créer un topic
gcloud pubsub topics create mon-topic

# Créer un subscription
gcloud pubsub subscriptions create mon-sub --topic=mon-topic
```

---

## Google Dataproc

**Description** : Service managé pour Spark, Hadoop, Flink, Presto.

**Configuration** :
```bash
gcloud dataproc clusters create mon-cluster \
  --zone=us-central1-a \
  --master-machine-type=n1-standard-4 \
  --num-workers=2
```

---

# 9. Cloud — Azure

---

## Azure Synapse Analytics

**Description** : Service d'analyse cloud combinant data warehouse, data integration et analytics big data.

**Contexte d'utilisation** :
- Data warehouse
- ETL/ELT
- Analyse de données big data
- Intégration avec Power BI

---

## Azure Data Factory

**Description** : Service d'intégration et de transformation de données (ETL/ELT) managé.

**Contexte d'utilisation** :
- ETL/ELT managé
- Orchestration de pipelines de données
- Intégration entre systèmes hétérogènes
- Copie de données entre sources

---

## Azure Databricks

**Description** : Databricks sur Azure. Plateforme unifiée pour l'analyse de données et l'IA.

---

# 10. Conteneurs

---

## Docker

**Description** : Plateforme de conteneurisation. Permet d'empaqueter une application et toutes ses dépendances dans un conteneur standardisé.

**Contexte d'utilisation** :
- Conteneurisation d'applications
- Développement reproductible (mon ordinateur ça marche)
- CI/CD (build → test → deploy)
- Microservices
- Data engineering (conteneurs Spark, Kafka, etc.)

**Dans quels projets** :
- Tous les projets modernes
- Environnement de développement local
- Déploiement en production
- Pipeline CI/CD

**Installation** :

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install docker.io docker-compose-plugin
sudo usermod -aG docker $USER
# Re-login pour appliquer

# macOS
brew install --cask docker

# Windows
# Télécharger Docker Desktop depuis docker.com

# Vérifier
docker --version
docker compose version
```

**Configuration** :
- `Dockerfile` : instructions de build de l'image
- `docker-compose.yml` : orchestration multi-conteneurs
- `.dockerignore` : fichiers à exclure

**Dockerfile type (Python)** :
```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

**Dockerfile type (Node.js)** :
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## Podman

**Description** : Alternative rootless à Docker. Compatible Docker CLI, mais sans daemon central.

**Installation** :
```bash
sudo apt install podman podman-compose
podman run -d --name postgres -p 5432:5432 postgres:16-alpine
```

---

# 11. Kubernetes & Orchestration

---

## Kubernetes (K8s)

**Description** : Orchestrateur de conteneurs open-source. Gère le déploiement, le scaling et l'auto-réparation des applications conteneurisées.

**Contexte d'utilisation** :
- Orchestration de conteneurs en production
- Auto-scaling horizontal
- Self-healing (redémarrage automatique)
- Service discovery et load balancing
- Déploiements sans downtime (rolling updates, blue-green)

**Dans quels projets** :
- Toute application conteneurisée en production
- Microservices
- Data platform (Spark on K8s, Kafka on K8s)
- ML platforms (Kubeflow)

**Installation** :

```bash
# Minikube (local)
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube
minikube start

# kubectl
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install kubectl /usr/local/bin/kubectl

# Docker Desktop inclut Kubernetes activable
```

**Manifeste type (Déploiement)** :
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mon-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: mon-app
  template:
    metadata:
      labels:
        app: mon-app
    spec:
      containers:
      - name: mon-app
        image: mon-registry/mon-app:latest
        ports:
        - containerPort: 8000
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
```

---

## Helm

**Description** : Package manager pour Kubernetes. Permet de définir, installer et mettre à jour des applications K8s via des "charts".

**Installation** :
```bash
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

# Installer un chart
helm repo add bitnami https://charts.bitnami.com/bitnami
helm install mon-postgres bitnami/postgresql

# Lister les releases
helm list
```

---

## Argo CD

**Description** : Outil de CD GitOps pour Kubernetes. Synchronise automatiquement les applications K8s avec un dépôt Git.

**Installation** :
```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
kubectl port-forward svc/argocd-server -n argocd 8080:443
```

---

## k9s

**Description** : TUI (interface terminal) pour Kubernetes. Permet de visualiser et gérer les ressources K8s.

**Installation** :
```bash
brew install k9s  # macOS
# ou
curl -sS https://webinstall.dev/k9s | bash
# Lancer
k9s
```

---

# 12. CI/CD

---

## GitHub Actions

**Description** : Système CI/CD intégré à GitHub. Permet d'automatiser le build, les tests et les déploiements.

**Contexte d'utilisation** :
- Build et test automatique au push
- Déploiement automatisé
- Linting automatique
- Publication de packages
- GitHub Pages

**Dans quels projets** :
- Tous les projets hébergés sur GitHub
- CI/CD pour les applications web
- Build d'images Docker
- Déploiement sur cloud

**Exemple de workflow** :
```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.12'
      - run: pip install -r requirements.txt
      - run: pytest
      - run: ruff check .
```

**Installation** :
Activé automatiquement pour les repos GitHub. Rien à installer.

---

## Jenkins

**Description** : Serveur d'automatisation CI/CD open-source. Très flexible avec des centaines de plugins.

**Installation** :
```bash
# Docker
docker run -d --name jenkins \
  -p 8080:8080 -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  jenkins/jenkins:lts

# UI : http://localhost:8080
# Récupérer le mot de passe initial :
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

---

## GitLab CI/CD

**Description** : Système CI/CD intégré à GitLab. Utilise un fichier `.gitlab-ci.yml`.

**Exemple** :
```yaml
# .gitlab-ci.yml
stages:
  - test
  - deploy

test:
  stage: test
  image: python:3.12
  script:
    - pip install -r requirements.txt
    - pytest

deploy:
  stage: deploy
  script:
    - ./deploy.sh
  only:
    - main
```

---

# 13. Infrastructure as Code

---

## Terraform

**Description** : Outil IaC open-source (HashiCorp). Permet de définir et provisionner l'infrastructure cloud de manière déclarative.

**Contexte d'utilisation** :
- Provisionnement d'infrastructures cloud (AWS, GCP, Azure)
- Versioning de l'infrastructure
- Réutilisation de modules
- Planification de changements (terraform plan)

**Dans quels projets** :
- Création de VPC, sous-réseaux, SG
- Provisionnement de RDS, EC2, Lambda
- Infrastructure complète multi-environnements

**Installation** :
```bash
# Linux
wget https://releases.hashicorp.com/terraform/1.7.0/terraform_1.7.0_linux_amd64.zip
unzip terraform_1.7.0_linux_amd64.zip
sudo mv terraform /usr/local/bin/

# macOS
brew install terraform

# Vérifier
terraform version
```

**Exemple** :
```hcl
# main.tf
provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "mon_serveur" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.micro"
  tags = {
    Name = "MonServeur"
  }
}
```

**Commandes** :
```bash
terraform init     # Initialiser
terraform plan     # Voir les changements
terraform apply    # Appliquer
terraform destroy  # Détruire
```

---

## OpenTofu

**Description** : Fork open-source de Terraform, maintenu par la Linux Foundation. 100% compatible Terraform.

**Installation** :
```bash
# Linux
curl -s https://get.opentofu.org/install-opentofu.sh | sudo bash
```

---

## Pulumi

**Description** : IaC programmable. Utilise des langages généralistes (Python, TypeScript, Go, C#) au lieu de HCL.

**Installation** :
```bash
curl -fsSL https://get.pulumi.com | sh
pulumi login

# Créer un projet
pulumi new aws-python
```

**Exemple (Python)** :
```python
import pulumi
import pulumi_aws as aws

server = aws.ec2.Instance("mon-serveur",
    instance_type="t3.micro",
    ami="ami-0c55b159cbfafe1f0",
    tags={"Name": "MonServeur"})
```

---

## Ansible

**Description** : Outil de configuration management et provisioning. Utilise des playbooks YAML pour automatiser la configuration de machines.

**Contexte d'utilisation** :
- Configuration de serveurs
- Provisionnement d'infrastructures
- Déploiement d'applications
- Automatisation de tâches répétitives

**Dans quels projets** :
- Configuration de serveurs Ubuntu/Debian
- Installation de logiciels sur des VMs
- Déploiement d'images Docker
- Configuration de Kubernetes

**Installation** :
```bash
pip install ansible

# ou
sudo apt install ansible
```

**Playbook type** :
```yaml
# playbook.yml
- hosts: serveurs
  become: yes
  tasks:
    - name: Installer Docker
      apt:
        name: docker.io
        state: present
        update_cache: yes

    - name: Démarrer Docker
      systemd:
        name: docker
        state: started
        enabled: yes

    - name: Ajouter l'utilisateur au groupe docker
      user:
        name: ubuntu
        groups: docker
        append: yes
```

---

# 14. Monitoring & Observabilité

---

## Prometheus

**Description** : Système de monitoring et d'alerting open-source. Collecte les métriques via le scraping (pull model).

**Contexte d'utilisation** :
- Métriques d'infrastructure (CPU, RAM, réseau)
- Métriques applicatives (latence, erreurs, requêtes)
- Alerting (prometheus + alertmanager)
- Source de données pour Grafana

**Installation** :
```bash
# Docker
docker run -d --name prometheus \
  -p 9090:9090 \
  -v ./prometheus.yml:/etc/prometheus/prometheus.yml \
  prom/prometheus

# prometheus.yml
global:
  scrape_interval: 15s
scrape_configs:
  - job_name: 'mon-app'
    static_configs:
      - targets: ['localhost:8000']
```

---

## Grafana

**Description** : Plateforme de visualisation et dashboards open-source. Se connecte à Prometheus, Elasticsearch, PostgreSQL, etc.

**Installation** :
```bash
# Docker
docker run -d --name grafana \
  -p 3000:3000 \
  -e GF_SECURITY_ADMIN_PASSWORD=admin \
  grafana/grafana

# UI : http://localhost:3000
# Login : admin / admin
```

**Configuration** :
- Ajouter des sources de données (Prometheus, etc.)
- Créer des dashboards
- Configurer des alertes

---

## Datadog

**Description** : Plateforme de monitoring APM, infrastructure, logs et security. SaaS (propriétaire).

**Installation** :
```bash
# Agent Datadog
DD_API_KEY=xxx DD_SITE="datadoghq.com" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script.sh)"
```

---

# 15. Logging

---

## ELK Stack (Elasticsearch + Logstash + Kibana)

**Description** : Suite complète pour la collecte, l'indexation et la visualisation de logs.

**Installation** :
```bash
# Docker Compose
# docker-compose.yml
services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.12.0
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
    ports:
      - "9200:9200"
  logstash:
    image: docker.elastic.co/logstash/logstash:8.12.0
    volumes:
      - ./logstash.conf:/usr/share/logstash/pipeline/logstash.conf
  kibana:
    image: docker.elastic.co/kibana/kibana:8.12.0
    ports:
      - "5601:5601"
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
```

---

## Fluentd / Fluent Bit

**Description** : Collecteurs de logs open-source. Fluent Bit est la version lightweight.

**Installation** :
```bash
# Fluent Bit
docker run -d --name fluent-bit \
  -v /var/log:/var/log \
  fluent/fluent-bit

# Fluentd
docker run -d --name fluentd \
  -p 24224:24224 \
  fluent/fluentd
```

---

## Loki (Grafana)

**Description** : Système de aggregation de logs open-source (Grafana Labs). Indexe les labels, pas le contenu des logs.

**Installation** :
```bash
# Docker
docker run -d --name loki \
  -p 3100:3100 \
  grafana/loki

# Promtail (agent de collecte)
docker run -d --name promtail \
  -v /var/log:/var/log \
  grafana/promtail
```

---

## Vector

**Description** : Collecteur de logs et métriques haute performance (Datadog). Alternative à Fluentd.

**Installation**：
```bash
# Docker
docker run -d --name vector \
  -v ./vector.toml:/etc/vector/vector.toml \
  timberio/vector:latest-alpine
```

---

# 16. Sécurité

---

## HashiCorp Vault

**Description** : Outil de gestion de secrets. Stocke, contrôle et audit l'accès aux secrets.

**Contexte d'utilisation** :
- Stockage de mots de passe, clés API, certificats
- Dynamic secrets (générer des credentials à la demande)
- Chiffrement de données (transit engine)
- PKI (certificats TLS)

**Installation**：
```bash
# Docker
docker run -d --name vault \
  -p 8200:8200 \
  -e VAULT_DEV_ROOT_TOKEN_ID=myroot \
  hashicorp/vault

# UI : http://localhost:8200
# Token : myroot
```

---

## Let's Encrypt / Certbot

**Description** : Certificats TLS gratuits et automatisés.

**Installation**：
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d mondomaine.com
```

---

## Trivy

**Description** : Scanner de vulnérabilités pour conteneurs, images Docker, IaC et dependencies.

**Installation**：
```bash
sudo apt install trivy

# Scanner une image Docker
trivy image nginx:latest

# Scanner un répertoire
trivy fs --security-checks vuln .
```

---

## SonarQube

**Description** : Plateforme d'analyse de qualité de code et de sécurité (SAST).

**Installation**：
```bash
# Docker
docker run -d --name sonarqube \
  -p 9000:9000 \
  sonarqube:lts-community
# UI : http://localhost:9000
```

---

# 17. Machine Learning & IA

---

## Scikit-learn

**Description** : Bibliothèque Python pour le machine learning classique. Algorithmes de classification, régression, clustering, etc.

**Installation**：
```bash
pip install scikit-learn
```

**Exemple**：
```python
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)
print(f"Accuracy: {accuracy_score(y_test, model.predict(X_test))}")
```

---

## TensorFlow

**Description** : Framework de deep learning (Google). Production-ready, supporte le déploiement mobile et web.

**Installation**：
```bash
pip install tensorflow
```

---

## PyTorch

**Description** : Framework de deep learning (Meta). Populaire en recherche, plus flexible que TensorFlow.

**Installation**：
```bash
pip install torch torchvision torchaudio
```

---

## XGBoost / LightGBM

**Description** : Bibliothèques de gradient boosting haute performance. Souvent les meilleurs algorithmes pour les données tabulaires.

**Installation**：
```bash
pip install xgboost lightgbm
```

---

## MLflow

**Description** : Plateforme open-source pour gérer le cycle de vie du ML : experiment tracking, model registry, deployment.

**Installation**：
```bash
pip install mlflow

# Lancer le serveur
mlflow server --host 0.0.0.0 --port 5000

# UI : http://localhost:5000
```

---

## Hugging Face Transformers

**Description** : Bibliothèque pour les modèles de NLP et LLM. Accès à des milliers de modèles pré-entraînés.

**Installation**：
```bash
pip install transformers torch

# Utilisation
from transformers import pipeline
classifier = pipeline("sentiment-analysis")
print(classifier("J'adore ce produit!"))
```

---

## Jupyter Notebook / JupyterLab

**Description** : Environnement interactif pour le code, la visualisation et la documentation. Indispensable en data science.

**Installation**：
```bash
pip install jupyterlab

# Lancer
jupyter lab
# UI : http://localhost:8888

# Ou notebook classique
pip install notebook
jupyter notebook
```

---

## Streamlit

**Description** : Framework Python pour créer des applications data interactives rapidement.

**Installation**：
```bash
pip install streamlit

# Créer une app
# app.py
import streamlit as st
st.title("Mon Dashboard")
st.write("Bonjour!")

# Lancer
streamlit run app.py
# UI : http://localhost:8501
```

---

# 18. Business Intelligence & Visualisation

---

## Power BI

**Description** : Outil de business intelligence (Microsoft). Création de dashboards et rapports interactifs.

**Contexte d'utilisation** :
- Dashboards business
- Reporting automatisé
- Analyse de données
- Partage de rapports

**Installation**：
- Desktop : Télécharger depuis microsoft.com/power-bi
- Service : https://app.powerbi.com (cloud)
- Report Builder pour les pixel-perfect reports

---

## Tableau

**Description** : Outil de business intelligence leader. Visualisation interactive de données.

**Installation**：
- Tableau Desktop (payant)
- Tableau Public (gratuit, données publiques)
- Tableau Server / Online (cloud)

---

## Metabase

**Description** : BI open-source simple. Posez des questions en SQL ou en natif.

**Installation**：
```bash
# Docker
docker run -d --name metabase \
  -p 3000:3000 \
  -v mbdata:/metabase-data \
  -e MB_DB_TYPE=H2 \
  metabase/metabase

# UI : http://localhost:3000
```

---

## Apache Superset

Voir [section 2](#apache-superset).

---

# 19. LLM & Generative AI

---

## OpenAI API

**Description** : API pour accéder aux modèles GPT (GPT-4, GPT-4o, etc.).

**Installation**：
```bash
pip install openai

# Utilisation
from openai import OpenAI
client = OpenAI(api_key="sk-...")
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Bonjour!"}]
)
print(response.choices[0].message.content)
```

---

## Ollama

**Description** : Outil pour faire tourner des LLMs localement (Llama, Mistral, etc.).

**Installation**：
```bash
# Linux
curl -fsSL https://ollama.com/install.sh | sh

# macOS
brew install ollama

# Lancer un modèle
ollama run llama3
ollama run mistral
ollama run codellama

# API
curl http://localhost:11434/api/generate -d '{"model":"llama3","prompt":"Bonjour!"}'
```

---

## LangChain

**Description** : Framework pour développer des applications basées sur les LLMs. Chaînes, agents, RAG.

**Installation**：
```bash
pip install langchain langchain-openai langchain-community
```

---

## LlamaIndex

**Description** : Framework pour construire des applications RAG (Retrieval-Augmented Generation).

**Installation**：
```bash
pip install llama-index
```

---

## vLLM

**Description** : Moteur d'inférence LLM haute performance. Optimisé pour le serving.

**Installation**：
```bash
pip install vllm

# Lancer un serveur
python -m vllm.entrypoints.openai.api_server --model meta-llama/Llama-3-8B
```

---

## Hugging Face Hub

**Description** : Plateforme de partage de modèles ML. Plus de 500 000 modèles disponibles.

**Installation**：
```bash
pip install huggingface_hub

# Télécharger un modèle
from huggingface_hub import snapshot_download
snapshot_download(repo_id="meta-llama/Llama-3-8B", local_dir="./model")
```

---

## ChromaDB

**Description** : Base de données vectorielle légère pour les applications LLM/RAG.

**Installation**：
```bash
pip install chromadb

# Utilisation
import chromadb
client = chromadb.Client()
collection = client.create_collection("mes_documents")
collection.add(documents=["Document 1", "Document 2"], ids=["1", "2"])
results = collection.query(query_texts=["Recherche"], n_results=2)
```

---

## Qdrant

**Description** : Base de données vectorielle open-source haute performance (Rust).

**Installation**：
```bash
# Docker
docker run -d --name qdrant -p 6333:6333 -p 6334:6334 \
  -v qdrant_data:/qdrant/storage \
  qdrant/qdrant

# Python
pip install qdrant-client
```

---

# 20. Web Servers & Reverse Proxies

---

## NGINX

**Description** : Web server haute performance. Reverse proxy, load balancer, cache.

**Installation**：
```bash
sudo apt install nginx

# Docker
docker run -d --name nginx -p 80:80 -v ./nginx.conf:/etc/nginx/nginx.conf nginx
```

**Configuration type**：
```nginx
# /etc/nginx/conf.d/monapp.conf
server {
    listen 80;
    server_name mondomaine.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /api/ {
        proxy_pass http://localhost:8000;
    }
}
```

---

## Traefik

**Description** : Reverse proxy cloud-native avec découverte automatique. Idéal pour Docker et Kubernetes.

**Installation**：
```bash
# Docker
docker run -d --name traefik \
  -p 80:80 -p 8080:8080 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  traefik:v2.10 \
  --providers.docker=true \
  --entrypoints.web.address=:80
```

---

## HAProxy

**Description** : Load balancer reverse proxy haute performance.

**Installation**：
```bash
sudo apt install haproxy

# Docker
docker run -d --name haproxy -p 80:80 -p 1936:1936 \
  -v ./haproxy.cfg:/usr/local/etc/haproxy/haproxy.cfg:ro \
  haproxy:2.8
```

---

# 21. Réseau & DNS

---

## Cloudflare

**Description** : CDN, protection DDoS, DNS managé, WAF, tunnel sécurisé.

**Installation**：
```bash
# Cloudflare Tunnel (zero trust)
curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o cloudflared
chmod +x cloudflared
sudo mv cloudflared /usr/local/bin/

# Créer un tunnel
cloudflared tunnel create mon-tunnel
cloudflared tunnel route dns mon-tunnel mondomaine.com
cloudflared tunnel run mon-tunnel
```

---

## WireGuard

**Description** : VPN moderne, rapide et sécurisé.

**Installation**：
```bash
sudo apt install wireguard

# Générer les clés
wg genkey | tee privatekey | wg pubkey > publickey
```

---

## Pi-hole

**Description** : Serveur DNS qui bloque les publicités et traqueurs.

**Installation**：
```bash
# Docker
docker run -d --name pihole \
  -p 53:53/tcp -p 53:53/udp -p 80:80 \
  -e TZ=Europe/Paris \
  -e WEBPASSWORD=admin \
  -v pihole_data:/etc/pihole \
  pihole/pihole
```

---

# 22. Stockage

---

## Amazon S3

Voir [section 7](#amazon-s3-simple-storage-service).

---

## MinIO

Voir [section 4](#minio).

---

## Ceph

**Description** : Système de stockage distribué (block, file, object).

**Installation**：
```bash
# Docker (via Ceph Orchestrator ou rook-ceph sur K8s)
docker run -d --name ceph-demo \
  -e MON_IP=127.0.0.1 \
  -e CEPH_NETWORK=127.0.0.0/8 \
  ceph/daemon demo
```

---

# 23. GitOps & Configuration Management

Voir [Ansible](#ansible), [Argo CD](#argo-cd), [Flux CD](#flux-cd) ci-dessus.

---

## Flux CD

**Description** : Outil GitOps pour Kubernetes. Synchronise automatiquement les ressources K8s avec Git.

**Installation**：
```bash
# Installer flux CLI
curl -s https://fluxcd.io/install.sh | sudo bash

# Bootstrap
flux bootstrap github \
  --owner=mon-user \
  --repository=fleet-infra \
  --branch=main \
  --path=./clusters/production
```

---

# 24. Outils de Développement

---

## VS Code

**Description** : Éditeur de code open-source (Microsoft). Extensions pour Python, Docker, Kubernetes, etc.

**Installation**：
```bash
# Linux
sudo snap install code --classic

# macOS
brew install --cask visual-studio-code
```

**Extensions essentielles**：
- Python
- Docker
- Kubernetes
- GitLens
- Thunder Client (API testing)
- SQLTools
- HashiCorp Terraform
- Remote - SSH

---

## DBeaver

**Description** : Client universel pour bases de données. Supporte PostgreSQL, MySQL, MongoDB, etc.

**Installation**：
```bash
# Linux
sudo snap install dbeaver-ce

# macOS
brew install --cask dbeaver-community
```

---

## Postman

**Description** : Outil pour tester et documenter des APIs.

**Installation**：
```bash
# Linux
sudo snap install postman

# macOS
brew install --cask postman
```

---

## k9s

Voir [section 11](#k9s).

---

## lazygit

**Description** : Interface TUI pour Git.

**Installation**：
```bash
# Linux
sudo apt install lazygit

# macOS
brew install lazygit
```

---

## httpie

**Description** : Client HTTP amélioré (alternative à curl).

**Installation**：
```bash
pip install httpie

# Utilisation
http GET http://localhost:8000/api/v1/projects
http POST http://localhost:8000/api/v1/contact name=Roger email=test@test.com message=Bonjour
```

---

# 25. Concepts & Patterns

---

## ETL vs ELT

| Concept | Description |
|---------|-------------|
| **ETL** | Extract → Transform → Load. Les données sont transformées avant d'être chargées dans la base cible. |
| **ELT** | Extract → Load → Transform. Les données sont chargées brutes puis transformées dans la base cible (dbt). |

---

## Data Lake vs Data Warehouse vs Data Lakehouse

| Concept | Description |
|---------|-------------|
| **Data Lake** | Stockage brut de toutes les données (structurées + non structurées). Low cost, flexible, mais difficile à gouverner. |
| **Data Warehouse** | Données structurées et modélisées pour l'analyse. Performant mais coûteux et rigide. |
| **Data Lakehouse** | Combine les avantages des deux. Format de table (Iceberg/Delta) + ACID sur un data lake. |

---

## Lambda vs Kappa Architecture

| Concept | Description |
|---------|-------------|
| **Lambda** | 2 couches : batch layer (traitement complet) + speed layer (traitement temps réel). Complexe à maintenir. |
| **Kappa** | 1 seule couche : tout est stream processing. Plus simple mais nécessite un bon event log (Kafka). |

---

## CDC (Change Data Capture)

Techniques pour capturer les changements dans une base de données en temps réel :
- **Debezium** : CDC via les WAL PostgreSQL / binlogs MySQL
- **AWS DMS** : Database Migration Service
- **Azure Data Factory** : CDC intégré

---

## Feature Store

Dépôt centralisé pour les features ML :
- **Feast** : Open-source
- **Tecton** : Managed
- **Databricks Feature Store** : Intégré à Databricks

---

## Data Contracts

Contrats entre les producteurs et consommateurs de données :
- Schema definition
- SLA (temps de disponibilité)
- Qualité des données
- Documentation

---

*Dernière mise à jour : Juillet 2026*
