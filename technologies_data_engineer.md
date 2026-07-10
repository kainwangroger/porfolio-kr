# Technologies & Plateformes — Data Engineer / DevOps / Cloud Engineer

Liste exhaustive des technologies, outils et plateformes que tout Data Engineer, DevOps Engineer ou Cloud Engineer devrait connaître ou maîtriser.

---

## 1. Langages de programmation

| Langage | Usage principal | Priorité |
|---------|----------------|----------|
| **Python** | Data engineering, scripting, automatisation, ML | ⭐⭐⭐ |
| **SQL** | Interrogation et manipulation de bases de données | ⭐⭐⭐ |
| **Bash / Shell** | Automatisation Linux, scripts système | ⭐⭐⭐ |
| **YAML** | Configuration (Docker, Kubernetes, CI/CD, Ansible) | ⭐⭐⭐ |
| **HCL** | Terraform (Infrastructure as Code) | ⭐⭐⭐ |
| **Go** | Outils cloud (Docker, Kubernetes, Terraform écrits en Go) | ⭐⭐ |
| **Java** | Écosystème Big Data (Spark, Kafka, Hadoop) | ⭐⭐ |
| **Scala** | Spark, Flink, Akka | ⭐⭐ |
| **R** | Analyse statistique, data science | ⭐ |
| **JavaScript / TypeScript** | Dashboards, APIs, automatisation web | ⭐ |
| **Rust** | Outils haute performance (Polars, DataFusion) | ⭐ |
| **Julia** | Calcul scientifique haute performance | ⭐ |
| **PHP** | Backends web legacy | ⭐ |
| **C / C++** | Performance critique, drivers bases de données | ⭐ |
| **Lua** | Scripts Nginx, embedded | ⭐ |
| **PowerShell** | Automatisation Windows / Azure | ⭐ |
| **Groovy** | Jenkins pipelines | ⭐ |

---

## 2. Bases de données

### 2.1 Bases de données relationnelles (SQL)

| Technologie | Type | Priorité |
|-------------|------|----------|
| **PostgreSQL** | Open-source, polyvalent | ⭐⭐⭐ |
| **MySQL** | Open-source, widespread | ⭐⭐⭐ |
| **MariaDB** | Open-source, fork de MySQL | ⭐⭐ |
| **SQLite** | Embedded, léger | ⭐⭐ |
| **Oracle Database** | Enterprise | ⭐⭐ |
| **SQL Server** | Enterprise (Microsoft) | ⭐⭐ |
| **Amazon Aurora** | Cloud (AWS) | ⭐⭐ |
| **Amazon RDS** | Cloud managed (AWS) | ⭐⭐ |
| **Google Cloud SQL** | Cloud managed (GCP) | ⭐⭐ |
| **Azure SQL Database** | Cloud managed (Azure) | ⭐⭐ |
| **CockroachDB** | Distributed SQL, open-source | ⭐ |
| **TiDB** | Distributed SQL compatible MySQL | ⭐ |
| **Citus** | Distributed SQL (extension PostgreSQL) | ⭐ |
| **TimescaleDB** | Time-series (extension PostgreSQL) | ⭐⭐ |
| **PlanetScale** | Serverless MySQL (Vitess) | ⭐ |
| **Neon** | Serverless PostgreSQL | ⭐⭐ |
| **Supabase** | Open-source Firebase (PostgreSQL) | ⭐⭐ |
| **SingleStore** | HTAP (real-time + analytics) | ⭐ |
| **ClickHouse** | OLAP column-oriented | ⭐⭐ |
| **DuckDB** | In-process OLAP | ⭐⭐ |
| **Trino (f.k.a PrestoSQL)** | Distributed SQL query engine | ⭐⭐ |
| **PrestoDB** | Distributed SQL query engine | ⭐ |
| **Apache Hive** | SQL over Hadoop/Spark | ⭐⭐ |
| **Amazon Redshift** | Data warehouse cloud (AWS) | ⭐⭐ |
| **Google BigQuery** | Data warehouse serverless (GCP) | ⭐⭐⭐ |
| **Azure Synapse Analytics** | Data warehouse (Azure) | ⭐⭐ |
| **Snowflake** | Data warehouse cloud | ⭐⭐⭐ |
| **Databricks SQL** | Data warehouse (Lakehouse) | ⭐⭐⭐ |
| **MotherDuck** | Serverless DuckDB | ⭐ |
| **StarRocks** | Real-time analytics | ⭐ |
| **Apache Doris** | Real-time analytics | ⭐ |

### 2.2 Bases de données NoSQL

| Technologie | Type | Priorité |
|-------------|------|----------|
| **MongoDB** | Document store | ⭐⭐⭐ |
| **Amazon DynamoDB** | Key-value managed (AWS) | ⭐⭐ |
| **Apache Cassandra** | Column-family, distributed | ⭐⭐ |
| **ScyllaDB** | Alternative Cassandra haute perf | ⭐ |
| **Redis** | Key-value in-memory, cache | ⭐⭐⭐ |
| **Memcached** | Cache distributed | ⭐⭐ |
| **Elasticsearch** | Search engine, logs, analytics | ⭐⭐⭐ |
| **OpenSearch** | Fork open-source d'Elasticsearch | ⭐⭐ |
| **Apache Solr** | Search engine | ⭐ |
| **Neo4j** | Graph database | ⭐⭐ |
| **ArangoDB** | Multi-model (document, graph, KV) | ⭐ |
| **Amazon Neptune** | Graph database managed (AWS) | ⭐ |
| **Couchbase** | Document + cache | ⭐ |
| **RethinkDB** | Real-time push queries | ⭐ |
| **InfluxDB** | Time-series database | ⭐⭐ |
| **Prometheus** | Time-series (metrics monitoring) | ⭐⭐⭐ |
| **VictoriaMetrics** | Time-series (alternative Prometheus) | ⭐ |
| **TimescaleDB** | Time-series (extension PostgreSQL) | ⭐⭐ |
| **QuestDB** | Time-series haute performance | ⭐ |
| **Apache HBase** | Column-family (Hadoop ecosystem) | ⭐ |
| **Google Firestore** | Document store managed (GCP) | ⭐⭐ |
| **Firebase Realtime DB** | Document store real-time (GCP) | ⭐⭐ |
| **Azure Cosmos DB** | Multi-model global (Azure) | ⭐⭐ |
| **etcd** | Key-value (Kubernetes config store) | ⭐⭐ |
| **ZooKeeper** | Coordination distribuée (Apache) | ⭐⭐ |
| **Valkey** | Fork open-source de Redis | ⭐ |
| **Dragonfly** | Alternative Redis/Memcached | ⭐ |

### 2.3 Bases vectorielles (IA/ML)

| Technologie | Type | Priorité |
|-------------|------|----------|
| **Pinecone** | Vector database managed | ⭐⭐ |
| **Weaviate** | Vector database open-source | ⭐⭐ |
| **Qdrant** | Vector database open-source (Rust) | ⭐⭐ |
| **Milvus** | Vector database open-source | ⭐⭐ |
| **ChromaDB** | Vector database lightweight | ⭐⭐ |
| **pgvector** | Extension PostgreSQL pour vecteurs | ⭐⭐ |
| **LanceDB** | Vector database embedded | ⭐ |
| **Vespa** | Search + vector + ML | ⭐ |
| **Redis Stack** | Vector search via Redis | ⭐ |
| **Amazon OpenSearch (k-NN)** | Vector search | ⭐ |
| **Azure AI Search** | Vector search (Azure) | ⭐ |

---

## 3. Data Engineering — Big Data & ETL

### 3.1 Traitement distribué

| Technologie | Usage | Priorité |
|-------------|-------|----------|
| **Apache Spark** | Traitement distribué (batch + streaming) | ⭐⭐⭐ |
| **PySpark** | API Python pour Spark | ⭐⭐⭐ |
| **Apache Flink** | Stream processing temps réel | ⭐⭐⭐ |
| **Apache Kafka Streams** | Stream processing intégré à Kafka | ⭐⭐⭐ |
| **Apache Beam** | Unified batch + streaming | ⭐⭐ |
| **Apache Storm** | Stream processing legacy | ⭐ |
| **Apache Samza** | Stream processing (LinkedIn) | ⭐ |
| **Apache Hadoop MapReduce** | Batch processing legacy | ⭐ |
| **Apache Tez** | DAG execution engine (Hive) | ⭐ |
| **Ray** | Distributed computing (Python) | ⭐⭐ |
| **Dask** | Parallel computing (Python) | ⭐⭐ |
| **Vaex** | Out-of-core DataFrames | ⭐ |
| **Polars** | DataFrame ultra-rapide (Rust/Python) | ⭐⭐ |
| **DuckDB** | In-process OLAP analytics | ⭐⭐ |
| **Pandas** | Data manipulation (single-node) | ⭐⭐⭐ |
| **NumPy** | Scientific computing | ⭐⭐⭐ |
| **Apache Sedona** | Geospatial distributed computing | ⭐ |
| **Presto/Trino** | Distributed SQL query engine | ⭐⭐ |

### 3.2 Orchestration & ETL

| Technologie | Usage | Priorité |
|-------------|-------|----------|
| **Apache Airflow** | Workflow orchestration | ⭐⭐⭐ |
| **Dagster** | Modern data orchestration | ⭐⭐ |
| **Prefect** | Modern workflow orchestration | ⭐⭐ |
| **Mage** | Modern ETL/ELT tool | ⭐ |
| **Apache NiFi** | Data flow automation | ⭐⭐ |
| **Apache Oozie** | Workflow scheduler (Hadoop) | ⭐ |
| **dbt (data build tool)** | Transformation de données dans le warehouse | ⭐⭐⭐ |
| **Apache Spark ETL** | ETL via Spark | ⭐⭐⭐ |
| **Meltano** | ELT open-source (Singer-based) | ⭐ |
| **Airbyte** | Data integration / ELT | ⭐⭐ |
| **Fivetran** | ELT managed (propriétaire) | ⭐⭐ |
| **Stitch Data** | ELT managed | ⭐ |
| **Talend** | ETL/ELT enterprise | ⭐⭐ |
| **Informatica** | ETL enterprise | ⭐ |
| **IBM DataStage** | ETL enterprise | ⭐ |
| **Microsoft SSIS** | ETL (SQL Server) | ⭐ |
| **Apache Gobblin** | Data ingestion (LinkedIn) | ⭐ |
| **Singer** | ELT connectors open-source | ⭐ |
| **Dataform** | SQL-based transformation (GCP) | ⭐ |
| **Great Expectations** | Data quality / testing | ⭐⭐ |
| **dbt Tests** | Data quality dans dbt | ⭐⭐ |
| **Soda** | Data quality | ⭐ |
| **Monte Carlo** | Data observability | ⭐ |
| ** Elementary** | Data quality (dbt native) | ⭐ |

### 3.3 Messaging & Event Streaming

| Technologie | Usage | Priorité |
|-------------|-------|----------|
| **Apache Kafka** | Event streaming platform | ⭐⭐⭐ |
| **Apache Kafka Connect** | Connecteurs Kafka ↔ sources/destinations | ⭐⭐⭐ |
| **Apache Kafka Schema Registry** | Gestion des schémas Avro/JSON/Protobuf | ⭐⭐⭐ |
| **Apache Kafka Streams** | Stream processing Kafka | ⭐⭐⭐ |
| **Confluent Platform** | Kafka enterprise | ⭐⭐ |
| **Confluent Cloud** | Kafka managed (cloud) | ⭐⭐ |
| **Apache Pulsar** | Event streaming (alternative Kafka) | ⭐⭐ |
| **RabbitMQ** | Message queue | ⭐⭐ |
| **Amazon SQS** | Managed message queue (AWS) | ⭐⭐ |
| **Amazon SNS** | Managed pub/sub (AWS) | ⭐⭐ |
| **Google Pub/Sub** | Managed messaging (GCP) | ⭐⭐ |
| **Azure Service Bus** | Managed messaging (Azure) | ⭐⭐ |
| **Azure Event Hubs** | Event streaming (Azure) | ⭐⭐ |
| **NATS** | Cloud-native messaging | ⭐ |
| **Mosquitto (MQTT)** | IoT messaging | ⭐ |
| **Redis Streams** | Event streaming in-memory | ⭐ |
| **Apache ActiveMQ** | Message broker legacy | ⭐ |
| **ZeroMQ** | High-perf messaging library | ⭐ |
| **Redpanda** | Kafka-compatible (C++) | ⭐⭐ |
| **WarpStream** | Kafka-compatible (serverless) | ⭐ |
| **Pulsar Functions** | Stream processing (Pulsar) | ⭐ |

### 3.4 Data Lake, Lakehouse & Data Mesh

| Technologie | Usage | Priorité |
|-------------|-------|----------|
| **Apache Iceberg** | Table format open-source (lakehouse) | ⭐⭐⭐ |
| **Apache Hudi** | Table format (incremental processing) | ⭐⭐ |
| **Delta Lake** | Table format (Databricks) | ⭐⭐⭐ |
| **Apache Parquet** | Columnar storage format | ⭐⭐⭐ |
| **Apache ORC** | Columnar storage format | ⭐⭐ |
| **Apache Avro** | Row-based serialization format | ⭐⭐⭐ |
| **Protocol Buffers** | Serialization format (Google) | ⭐⭐ |
| **JSON / JSON Lines** | Data interchange format | ⭐⭐⭐ |
| **CSV** | Data interchange format | ⭐⭐⭐ |
| **Amazon S3** | Object storage (data lake) | ⭐⭐⭐ |
| **Google Cloud Storage** | Object storage (GCP) | ⭐⭐⭐ |
| **Azure Blob Storage / ADLS** | Object storage (Azure) | ⭐⭐⭐ |
| **MinIO** | S3-compatible on-premise | ⭐⭐ |
| **Ceph** | Distributed object/block/file storage | ⭐ |
| **Apache HDFS** | Distributed file system (legacy) | ⭐⭐ |
| **LakeFS** | Git for data lakes | ⭐ |
| **Databricks Lakehouse** | Lakehouse platform | ⭐⭐⭐ |
| **Snowflake** | Cloud data platform | ⭐⭐⭐ |
| **Starburst (Trino)** | Query federation over data lakes | ⭐⭐ |
| **AWS Glue** | Serverless ETL (AWS) | ⭐⭐ |
| **Google Dataproc** | Managed Spark/Hadoop (GCP) | ⭐⭐ |
| **Azure Data Factory** | ETL/ELT managed (Azure) | ⭐⭐ |
| **Azure Databricks** | Databricks on Azure | ⭐⭐⭐ |
| **Google Dataflow** | Stream/batch processing (GCP) | ⭐⭐ |
| **Databricks** | Unified analytics + AI platform | ⭐⭐⭐ |
| **Cloudera (CDP)** | Enterprise data platform | ⭐ |
| **Hortonworks (HDP)** | Hadoop distribution (merged Cloudera) | ⭐ |

### 3.5 Data Quality & Governance

| Technologie | Usage | Priorité |
|-------------|-------|----------|
| **Great Expectations** | Data validation / testing | ⭐⭐ |
| **dbt Tests** | Data tests dans dbt | ⭐⭐ |
| **Soda** | Data quality monitoring | ⭐ |
| **Monte Carlo** | Data observability | ⭐ |
| **Elementary** | Data quality (dbt) | ⭐ |
| **Apache Atlas** | Data governance / metadata (Hadoop) | ⭐ |
| **DataHub** | Metadata platform (LinkedIn) | ⭐⭐ |
| **OpenMetadata** | Metadata platform open-source | ⭐⭐ |
| **Amundsen** | Data discovery (Lyft) | ⭐ |
| **Apache Griffin** | Data quality (eBay) | ⭐ |
| **Anomalo** | Data quality monitoring | ⭐ |
| **Collibra** | Data governance enterprise | ⭐ |
| **Alation** | Data catalog enterprise | ⭐ |
| **Atlan** | Data governance modern | ⭐ |
| **Okera** | Data access governance | ⭐ |

---

## 4. Cloud Providers

### 4.1 Amazon Web Services (AWS)

| Service | Catégorie | Priorité |
|---------|-----------|----------|
| **EC2** | Compute (VMs) | ⭐⭐⭐ |
| **Lambda** | Serverless compute | ⭐⭐⭐ |
| **ECS** | Container orchestration | ⭐⭐⭐ |
| **EKS** | Managed Kubernetes | ⭐⭐⭐ |
| **S3** | Object storage | ⭐⭐⭐ |
| **RDS** | Managed relational DB | ⭐⭐⭐ |
| **Aurora** | Serverless relational DB | ⭐⭐⭐ |
| **DynamoDB** | NoSQL key-value | ⭐⭐ |
| **Redshift** | Data warehouse | ⭐⭐⭐ |
| **Glue** | Serverless ETL | ⭐⭐⭐ |
| **EMR** | Managed Spark/Hadoop | ⭐⭐ |
| **Kinesis** | Real-time streaming | ⭐⭐ |
| **MSK** | Managed Kafka | ⭐⭐⭐ |
| **Step Functions** | Serverless orchestration | ⭐⭐ |
| **EventBridge** | Event bus serverless | ⭐⭐ |
| **SQS / SNS** | Messaging | ⭐⭐⭐ |
| **API Gateway** | Managed API | ⭐⭐ |
| **CloudFront** | CDN | ⭐⭐ |
| **Route 53** | DNS | ⭐⭐ |
| **IAM** | Identity & access management | ⭐⭐⭐ |
| **Secrets Manager** | Secrets management | ⭐⭐ |
| **KMS** | Key management | ⭐⭐ |
| **CloudWatch** | Monitoring & logs | ⭐⭐⭐ |
| **CloudTrail** | Audit logging | ⭐⭐ |
| **VPC** | Virtual networking | ⭐⭐⭐ |
| **Security Groups / NACLs** | Firewall rules | ⭐⭐⭐ |
| **Elastic Load Balancer** | Load balancing (ALB/NLB) | ⭐⭐⭐ |
| **Auto Scaling** | Auto-scaling groups | ⭐⭐⭐ |
| **SageMaker** | ML platform managed | ⭐⭐ |
| **Athena** | Serverless SQL over S3 | ⭐⭐⭐ |
| **QuickSight** | Business intelligence | ⭐⭐ |
| **Glue Data Catalog** | Metadata catalog | ⭐⭐⭐ |
| **Lake Formation** | Data lake governance | ⭐⭐ |
| **Cognito** | User authentication | ⭐⭐ |
| **CodePipeline** | CI/CD | ⭐⭐ |
| **CodeBuild** | Build service | ⭐⭐ |
| **CodeDeploy** | Deployment service | ⭐⭐ |
| **ECR** | Container registry | ⭐⭐⭐ |
| **CloudFormation** | IaC (JSON/YAML) | ⭐⭐ |
| **CDK** | IaC (programmatic) | ⭐⭐⭐ |
| **X-Ray** | Distributed tracing | ⭐⭐ |
| **Macie** | Data privacy (S3) | ⭐ |
| **GuardDuty** | Threat detection | ⭐ |
| **Security Hub** | Security posture | ⭐ |
| **OpenSearch** | Search & analytics | ⭐⭐ |
| **Neptune** | Graph database | ⭐ |
| **Timestream** | Time-series database | ⭐ |
| **QLDB** | Ledger database | ⭐ |
| **App Runner** | Container hosting simplified | ⭐ |
| **Fargate** | Serverless containers (ECS/EKS) | ⭐⭐⭐ |
| **EBS** | Block storage | ⭐⭐⭐ |
| **EFS** | File storage | ⭐⭐ |
| **FSx** | Managed file systems | ⭐ |
| **Transfer Family** | SFTP/FTPS managed | ⭐ |
| **Data Pipeline** | ETL legacy (deprecated) | ⭐ |

### 4.2 Google Cloud Platform (GCP)

| Service | Catégorie | Priorité |
|---------|-----------|----------|
| **Compute Engine** | Compute (VMs) | ⭐⭐ |
| **Cloud Functions** | Serverless compute | ⭐⭐ |
| **Cloud Run** | Serverless containers | ⭐⭐⭐ |
| **GKE (Google Kubernetes Engine)** | Managed Kubernetes | ⭐⭐⭐ |
| **Cloud Storage** | Object storage | ⭐⭐⭐ |
| **Cloud SQL** | Managed relational DB | ⭐⭐ |
| **Cloud Spanner** | Global distributed DB | ⭐⭐ |
| **BigQuery** | Data warehouse serverless | ⭐⭐⭐ |
| **Dataflow** | Stream/batch processing (Beam) | ⭐⭐⭐ |
| **Dataproc** | Managed Spark/Hadoop | ⭐⭐ |
| **Pub/Sub** | Messaging | ⭐⭐⭐ |
| **Cloud Composer** | Managed Airflow | ⭐⭐⭐ |
| **Data Fusion** | ETL visuel | ⭐ |
| **Dataform** | SQL transformation | ⭐⭐ |
| **Looker** | Business intelligence | ⭐⭐ |
| **Looker Studio** | Dashboard gratuit | ⭐⭐ |
| **Cloud IAM** | Identity & access management | ⭐⭐⭐ |
| **Secret Manager** | Secrets management | ⭐⭐ |
| **Cloud KMS** | Key management | ⭐⭐ |
| **Cloud Monitoring** | Monitoring | ⭐⭐ |
| **Cloud Logging** | Centralized logging | ⭐⭐ |
| **Cloud Trace** | Distributed tracing | ⭐⭐ |
| **VPC** | Virtual networking | ⭐⭐ |
| **Cloud Load Balancing** | Load balancing | ⭐⭐ |
| **Cloud Armor** | WAF / DDoS protection | ⭐ |
| **Artifact Registry** | Container/artifact registry | ⭐⭐ |
| **Cloud Build** | CI/CD | ⭐⭐ |
| **Cloud Deploy** | Continuous deployment | ⭐⭐ |
| **Vertex AI** | ML platform | ⭐⭐ |
| **AI Platform** | ML training/prediction (legacy) | ⭐ |
| **Firestore** | NoSQL document store | ⭐⭐ |
| **Firebase** | App development platform | ⭐⭐ |
| **Memorystore** | Managed Redis/Memcached | ⭐⭐ |
| **Anthos** | Multi-cloud Kubernetes | ⭐ |
| **Dataplex** | Data governance | ⭐⭐ |
| **Datacatalog** | Metadata catalog | ⭐⭐ |
| **Cloud Data Loss Prevention** | Data privacy | ⭐ |
| **Cloud NAT** | Network address translation | ⭐⭐ |
| **Cloud DNS** | DNS management | ⭐⭐ |
| **Cloud CDN** | Content delivery | ⭐⭐ |
| **BeyondCorp** | Zero trust security | ⭐ |
| **Apigee** | API management | ⭐ |
| **Cloud Tasks** | Async task queue | ⭐ |
| **Cloud Scheduler** | Cron jobs managed | ⭐⭐ |
| **Colab Enterprise** | Notebooks managed | ⭐⭐ |
| **Dataplex** | Data lakehouse platform | ⭐⭐ |
| ** AlloyDB** | PostgreSQL-compatible managed | ⭐ |
| **BigLake** | Unified lakehouse access | ⭐ |
| **Datastream** | CDC / replication | ⭐⭐ |
| **Database Migration Service** | DB migration | ⭐ |

### 4.3 Microsoft Azure

| Service | Catégorie | Priorité |
|---------|-----------|----------|
| **Azure Virtual Machines** | Compute (VMs) | ⭐⭐ |
| **Azure Functions** | Serverless compute | ⭐⭐ |
| **Azure App Service** | Managed web hosting | ⭐⭐ |
| **Azure Kubernetes Service (AKS)** | Managed Kubernetes | ⭐⭐⭐ |
| **Azure Blob Storage** | Object storage | ⭐⭐⭐ |
| **Azure Data Lake Storage (ADLS)** | Data lake storage | ⭐⭐⭐ |
| **Azure SQL Database** | Managed relational DB | ⭐⭐ |
| **Azure Cosmos DB** | Multi-model global DB | ⭐⭐ |
| **Azure Synapse Analytics** | Data warehouse + analytics | ⭐⭐⭐ |
| **Azure Data Factory** | ETL/ELT managed | ⭐⭐⭐ |
| **Azure Databricks** | Databricks on Azure | ⭐⭐⭐ |
| **Azure Event Hubs** | Event streaming | ⭐⭐⭐ |
| **Azure Service Bus** | Messaging enterprise | ⭐⭐ |
| **Azure Stream Analytics** | Real-time stream processing | ⭐⭐ |
| **Azure HDInsight** | Managed Hadoop/Spark | ⭐ |
| **Azure Purview** | Data governance | ⭐⭐ |
| **Azure Monitor** | Monitoring & alerts | ⭐⭐ |
| **Azure Log Analytics** | Centralized logging | ⭐⭐ |
| **Azure Application Insights** | APM | ⭐⭐ |
| **Azure Active Directory (Entra ID)** | Identity management | ⭐⭐⭐ |
| **Azure Key Vault** | Secrets management | ⭐⭐ |
| **Azure Networking (VNet)** | Virtual networking | ⭐⭐ |
| **Azure Load Balancer** | Load balancing | ⭐⭐ |
| **Azure Front Door** | Global load balancer + CDN | ⭐⭐ |
| **Azure Container Registry (ACR)** | Container registry | ⭐⭐ |
| **Azure DevOps** | CI/CD + project management | ⭐⭐⭐ |
| **Azure Pipelines** | CI/CD pipelines | ⭐⭐⭐ |
| **Azure Repos** | Git hosting | ⭐⭐ |
| **Azure Artifacts** | Package management | ⭐⭐ |
| **Azure Machine Learning** | ML platform | ⭐⭐ |
| **Power BI** | Business intelligence | ⭐⭐⭐ |
| **Azure Cache for Redis** | Managed Redis | ⭐⭐ |
| **Azure SQL Managed Instance** | Managed SQL Server | ⭐⭐ |
| **Azure Database for PostgreSQL** | Managed PostgreSQL | ⭐⭐ |
| **Azure Database for MySQL** | Managed MySQL | ⭐⭐ |
| **Azure Cosmos DB for MongoDB** | Managed MongoDB API | ⭐ |
| **Azure Elastic Pool** | Shared SQL resources | ⭐ |
| **Azure Resource Manager (ARM)** | IaC (JSON) | ⭐⭐ |
| **Bicep** | IaC (HCL-like pour Azure) | ⭐⭐ |
| **Azure Policy** | Governance as code | ⭐⭐ |
| **Azure Sentinel** | SIEM / Security | ⭐ |
| **Azure DevTest Labs** | Dev/test environments | ⭐ |

### 4.4 Autres clouds / On-Premise

| Technologie | Usage | Priorité |
|-------------|-------|----------|
| **Oracle Cloud (OCI)** | Cloud IaaS/PaaS | ⭐ |
| **IBM Cloud** | Cloud enterprise | ⭐ |
| **Alibaba Cloud** | Cloud (Asie) | ⭐ |
| **Hetzner** | Cloud européen low-cost | ⭐ |
| **OVHcloud** | Cloud européen | ⭐ |
| **Scaleway** | Cloud français | ⭐ |
| **DigitalOcean** | Cloud developer-friendly | ⭐ |
| **Linode (Akamai)** | Cloud VMs | ⭐ |
| **Vultr** | Cloud VMs | ⭐ |
| **Proxmox** | Virtualisation on-premise | ⭐⭐ |
| **VMware vSphere** | Virtualisation enterprise | ⭐⭐ |
| **KVM** | Virtualisation Linux | ⭐⭐ |
| **Xen** | Virtualisation | ⭐ |
| **Hyper-V** | Virtualisation Microsoft | ⭐ |

---

## 5. Conteneurs & Orchestration

### 5.1 Conteneurs

| Technologie | Usage | Priorité |
|-------------|-------|----------|
| **Docker** | Conteneurisation d'applications | ⭐⭐⭐ |
| **Docker Compose** | Multi-conteneurs local | ⭐⭐⭐ |
| **Dockerfile** | Build d'images Docker | ⭐⭐⭐ |
| **Docker Hub** | Registry public d'images | ⭐⭐⭐ |
| **Podman** | Alternative rootless à Docker | ⭐⭐ |
| **Buildah** | Build d'images sans Docker | ⭐ |
| **containerd** | Runtime de conteneurs (backend Docker) | ⭐⭐ |
| **CRI-O** | Runtime de conteneurs (Kubernetes) | ⭐⭐ |
| **nerdctl** | CLI Docker-compatible pour containerd | ⭐ |
| **Harbor** | Registry self-hosted sécurisé | ⭐ |
| **AWS ECR** | Container registry (AWS) | ⭐⭐ |
| **Google Artifact Registry** | Container registry (GCP) | ⭐⭐ |
| **Azure ACR** | Container registry (Azure) | ⭐⭐ |
| **GitHub Container Registry** | Container registry (GitHub) | ⭐⭐ |
| **Quay.io** | Container registry (Red Hat) | ⭐ |
| **JFrog Container Registry** | Container registry | ⭐ |

### 5.2 Orchestration de conteneurs

| Technologie | Usage | Priorité |
|-------------|-------|----------|
| **Kubernetes (K8s)** | Orchestration de conteneurs | ⭐⭐⭐ |
| **Helm** | Package manager pour Kubernetes | ⭐⭐⭐ |
| **Kustomize** | Configuration management K8s | ⭐⭐⭐ |
| **kubectl** | CLI Kubernetes | ⭐⭐⭐ |
| **Helm Charts** | Templates de déploiement K8s | ⭐⭐⭐ |
| **Argo CD** | GitOps CD pour Kubernetes | ⭐⭐⭐ |
| **Flux CD** | GitOps CD (Weaveworks) | ⭐⭐⭐ |
| **Rancher** | Management Kubernetes multi-cluster | ⭐⭐ |
| **RKE2** | Kubernetes distributions (Rancher) | ⭐⭐ |
| **k3s** | Kubernetes léger (edge) | ⭐⭐ |
| **k0s** | Kubernetes minimal | ⭐ |
| **Minikube** | Kubernetes local | ⭐⭐ |
| **Kind** | Kubernetes in Docker | ⭐⭐ |
| **K3d** | K3s in Docker | ⭐⭐ |
| **MicroK8s** | Kubernetes snap (Canonical) | ⭐ |
| **OpenShift** | Kubernetes enterprise (Red Hat) | ⭐⭐ |
| **Docker Swarm** | Orchestration Docker (legacy) | ⭐ |
| **Nomad** | Orchestration (HashiCorp) | ⭐ |
| **Mesos** | Orchestration legacy | ⭐ |
| **EKS** | Managed Kubernetes (AWS) | ⭐⭐⭐ |
| **GKE** | Managed Kubernetes (GCP) | ⭐⭐⭐ |
| **AKS** | Managed Kubernetes (Azure) | ⭐⭐⭐ |
| **DigitalOcean Kubernetes** | Managed K8s | ⭐ |
| **Linode Kubernetes** | Managed K8s | ⭐ |
| **Cilium** | CNI network pour K8s (eBPF) | ⭐⭐ |
| **Calico** | CNI network pour K8s | ⭐⭐ |
| **Flannel** | CNI network pour K8s | ⭐⭐ |
| **Istio** | Service mesh pour K8s | ⭐⭐ |
| **Linkerd** | Service mesh lightweight | ⭐⭐ |
| **Envoy** | Service proxy | ⭐⭐ |
| **Traefik** | Reverse proxy / ingress | ⭐⭐ |
| **NGINX Ingress** | Ingress controller K8s | ⭐⭐⭐ |
| **MetalLB** | Load balancer bare-metal K8s | ⭐ |
| **cert-manager** | TLS certificates automatisés K8s | ⭐⭐ |
| **Prometheus Operator** | Monitoring K8s | ⭐⭐ |
| **Vault** | Secrets management (HashiCorp) | ⭐⭐⭐ |
| **Consul** | Service discovery (HashiCorp) | ⭐⭐ |
| **Sealed Secrets** | Secrets chiffrés dans Git | ⭐⭐ |
| **External Secrets Operator** | Sync secrets from cloud → K8s | ⭐⭐ |
| **Crossplane** | IaC via Kubernetes | ⭐ |
| **CouchDB as a Service (Kubernetes)** | Operator pattern | ⭐ |
| **Velero** | Backup & restore Kubernetes | ⭐⭐ |
| **Kyverno** | Policy engine pour K8s | ⭐ |
| **OPA Gatekeeper** | Policy engine pour K8s | ⭐ |
| **Loki** | Logs aggregation (Grafana) | ⭐⭐ |
| **Jaeger** | Distributed tracing | ⭐⭐ |
| **OpenTelemetry** | Observability (traces, metrics, logs) | ⭐⭐⭐ |
| **Grafana** | Dashboards de monitoring | ⭐⭐⭐ |

---

## 6. CI/CD & DevOps

### 6.1 CI/CD

| Technologie | Usage | Priorité |
|-------------|-------|----------|
| **GitHub Actions** | CI/CD intégré à GitHub | ⭐⭐⭐ |
| **GitLab CI/CD** | CI/CD intégré à GitLab | ⭐⭐⭐ |
| **Jenkins** | Serveur CI/CD automatisé | ⭐⭐⭐ |
| **Azure DevOps Pipelines** | CI/CD (Azure) | ⭐⭐⭐ |
| **AWS CodePipeline** | CI/CD (AWS) | ⭐⭐ |
| **AWS CodeBuild** | Build service (AWS) | ⭐⭐ |
| **Google Cloud Build** | CI/CD (GCP) | ⭐⭐ |
| **CircleCI** | CI/CD cloud | ⭐⭐ |
| **Travis CI** | CI/CD cloud | ⭐ |
| **Bitbucket Pipelines** | CI/CD (Atlassian) | ⭐ |
| **Argo CD** | CD GitOps pour Kubernetes | ⭐⭐⭐ |
| **Flux CD** | CD GitOps pour Kubernetes | ⭐⭐⭐ |
| **Drone CI** | CI/CD lightweight container-based | ⭐ |
| **Woodpecker CI** | CI/CD open-source | ⭐ |
| **Tekton** | CI/CD cloud-native pour K8s | ⭐ |
| **Buildkite** | CI/CD distribué | ⭐ |
| **Dagger** | CI/CD programmable | ⭐⭐ |
| **Earthly** | CI/CD basé sur Dockerfile | ⭐ |
| **Terraform Cloud** | CI/CD pour IaC | ⭐⭐ |

### 6.2 Gestion de code source

| Technologie | Usage | Priorité |
|-------------|-------|----------|
| **Git** | Version control | ⭐⭐⭐ |
| **GitHub** | Git hosting + collaboration | ⭐⭐⭐ |
| **GitLab** | Git hosting + DevOps platform | ⭐⭐⭐ |
| **Bitbucket** | Git hosting (Atlassian) | ⭐⭐ |
| **Azure DevOps Repos** | Git hosting (Azure) | ⭐⭐ |
| **Gitea** | Git self-hosted lightweight | ⭐ |
| **GitLab self-hosted** | Git self-hosted enterprise | ⭐⭐ |
| **Perforce** | Version control (gaming, binaries) | ⭐ |
| **SVN (Subversion)** | Version control legacy | ⭐ |

### 6.3 Infrastructure as Code (IaC)

| Technologie | Usage | Priorité |
|-------------|-------|----------|
| **Terraform** | IaC multi-cloud (HashiCorp) | ⭐⭐⭐ |
| **OpenTofu** | IaC fork open-source de Terraform | ⭐⭐⭐ |
| **Pulumi** | IaC programmable (Python/TS/Go) | ⭐⭐⭐ |
| **AWS CloudFormation** | IaC natif AWS | ⭐⭐ |
| **AWS CDK** | IaC programmable AWS | ⭐⭐⭐ |
| **Azure Bicep** | IaC natif Azure | ⭐⭐ |
| **Azure ARM Templates** | IaC natif Azure (JSON) | ⭐⭐ |
| **Google Deployment Manager** | IaC natif GCP | ⭐ |
| **Ansible** | Configuration management + provisioning | ⭐⭐⭐ |
| **Puppet** | Configuration management | ⭐ |
| **Chef** | Configuration management | ⭐ |
| **SaltStack** | Configuration management | ⭐ |
| **Crossplane** | IaC via Kubernetes | ⭐ |
| **Serverless Framework** | IaC pour serverless | ⭐⭐ |
| **AWS SAM** | IaC pour Lambda | ⭐⭐ |
| **CDKTF** | Terraform via CDK | ⭐ |
| **Terragrunt** | Wrapper Terraform DRY | ⭐⭐ |
| **Infracost** | estimation de coûts IaC | ⭐ |
| **Checkov** | IaC security scanning | ⭐⭐ |
| **TFSec** | Terraform security scanning | ⭐⭐ |
| **KICS** | IaC security (Checkmarx) | ⭐ |
| **Snyk IaC** | IaC security | ⭐ |

---

## 7. Monitoring, Observabilité & Logging

### 7.1 Monitoring & Métriques

| Technologie | Usage | Priorité |
|-------------|-------|----------|
| **Prometheus** | Metrics collection + alerting | ⭐⭐⭐ |
| **Grafana** | Dashboards de visualisation | ⭐⭐⭐ |
| **Datadog** | Monitoring APM + infra + logs | ⭐⭐⭐ |
| **New Relic** | APM + observabilité | ⭐⭐ |
| **Dynatrace** | APM + AI operations | ⭐⭐ |
| **Zabbix** | Monitoring open-source | ⭐⭐ |
| **Nagios** | Monitoring legacy | ⭐ |
| **Icinga** | Monitoring open-source | ⭐ |
| **LibreNMS** | Network monitoring | ⭐ |
| **Uptime Kuma** | Uptime monitoring self-hosted | ⭐⭐ |
| **StatusPage** | Status page managed | ⭐ |
| **InfluxDB** | Time-series metrics | ⭐⭐ |
| **VictoriaMetrics** | Time-series (alternative Prometheus) | ⭐⭐ |
| **Thanos** | Prometheus HA + long-term storage | ⭐⭐ |
| **Cortex** | Prometheus multi-tenant | ⭐ |
| **Mimir** | Prometheus long-term (Grafana) | ⭐⭐ |
| **AWS CloudWatch** | Monitoring (AWS) | ⭐⭐⭐ |
| **Google Cloud Monitoring** | Monitoring (GCP) | ⭐⭐ |
| **Azure Monitor** | Monitoring (Azure) | ⭐⭐ |

### 7.2 Logging

| Technologie | Usage | Priorité |
|-------------|-------|----------|
| **ELK Stack** (Elasticsearch + Logstash + Kibana) | Centralized logging | ⭐⭐⭐ |
| **Elasticsearch** | Search & analytics engine | ⭐⭐⭐ |
| **Logstash** | Log ingestion & transformation | ⭐⭐⭐ |
| **Kibana** | Visualization pour Elasticsearch | ⭐⭐⭐ |
| **OpenSearch + OpenSearch Dashboards** | Fork ELK open-source | ⭐⭐⭐ |
| **Fluentd** | Log collector (CNCF) | ⭐⭐⭐ |
| **Fluent Bit** | Log collector lightweight | ⭐⭐⭐ |
| **Vector** | Log/metrics collector (Datadog) | ⭐⭐ |
| **Loki** | Log aggregation (Grafana) | ⭐⭐⭐ |
| **Graylog** | Log management open-source | ⭐⭐ |
| **Seq** | Log management .NET | ⭐ |
| **Papertrail** | Cloud logging | ⭐ |
| **Splunk** | Enterprise logging | ⭐⭐ |
| **AWS CloudWatch Logs** | Centralized logging (AWS) | ⭐⭐⭐ |
| **Google Cloud Logging** | Centralized logging (GCP) | ⭐⭐ |
| **Azure Monitor Logs** | Centralized logging (Azure) | ⭐⭐ |

### 7.3 Tracing distribué

| Technologie | Usage | Priorité |
|-------------|-------|----------|
| **Jaeger** | Distributed tracing open-source | ⭐⭐ |
| **Zipkin** | Distributed tracing (Twitter) | ⭐⭐ |
| **AWS X-Ray** | Distributed tracing (AWS) | ⭐⭐ |
| **OpenTelemetry** | Observability unifiée (traces + metrics + logs) | ⭐⭐⭐ |
| **OpenTracing** | API standard de tracing (merged OTel) | ⭐⭐ |
| **OpenCensus** | API standard de metrics (merged OTel) | ⭐⭐ |
| **Tempo** | Distributed tracing (Grafana) | ⭐⭐ |

### 7.4 Dashboards & Visualisation

| Technologie | Usage | Priorité |
|-------------|-------|----------|
| **Grafana** | Dashboards multi-sources | ⭐⭐⭐ |
| **Kibana** | Dashboards Elasticsearch | ⭐⭐⭐ |
| **Apache Superset** | BI open-source | ⭐⭐⭐ |
| **Power BI** | BI Microsoft | ⭐⭐⭐ |
| **Tableau** | BI enterprise | ⭐⭐⭐ |
| **Looker** | BI (Google) | ⭐⭐⭐ |
| **Looker Studio (f.k.a Data Studio)** | Dashboard gratuit (Google) | ⭐⭐⭐ |
| **Metabase** | BI open-source | ⭐⭐ |
| **Redash** | BI open-source | ⭐⭐ |
| **Apache Zeppelin** | Notebook + visualization | ⭐ |
| **Jupyter Notebook** | Interactive notebooks | ⭐⭐⭐ |
| **JupyterLab** | IDE Jupyter amélioré | ⭐⭐⭐ |
| **Streamlit** | Apps data interactives (Python) | ⭐⭐⭐ |
| **Dash (Plotly)** | Dashboards Python | ⭐⭐ |
| **Panel (HoloViz)** | Dashboards Python | ⭐ |
| **Observable** | Dashboards JavaScript | ⭐ |
| **Retool** | Internal tools builder | ⭐ |
| **Appsmith** | Internal tools open-source | ⭐ |
| **Metabase** | BI query builder | ⭐⭐ |
| **Evidence** | BI as code (Markdown) | ⭐ |
| **Lightdash** | BI open-source (dbt native) | ⭐⭐ |
| **dbt Semantic Layer** | Métriques unifiées | ⭐⭐ |
| **Count (Count.co)** | Notebooks collaboratives | ⭐ |

---

## 8. Sécurité

### 8.1 Identity & Access Management

| Technologie | Usage | Priorité |
|-------------|-------|----------|
| **AWS IAM** | Identity management (AWS) | ⭐⭐⭐ |
| **Azure AD (Entra ID)** | Identity management (Azure) | ⭐⭐⭐ |
| **Google Cloud IAM** | Identity management (GCP) | ⭐⭐⭐ |
| **Okta** | SSO / Identity provider | ⭐⭐ |
| **Auth0** | Authentication as a service | ⭐⭐ |
| **Keycloak** | IAM open-source | ⭐⭐ |
| **FreeIPA** | IAM on-premise | ⭐ |
| **Active Directory** | IAM (Microsoft) | ⭐⭐ |
| **LDAP** | Directory service | ⭐⭐ |
| **OAuth 2.0** | Authorization protocol | ⭐⭐⭐ |
| **OpenID Connect** | Authentication protocol | ⭐⭐⭐ |
| **SAML** | SSO protocol | ⭐⭐ |
| **JWT** | JSON Web Tokens | ⭐⭐⭐ |
| **MFA / 2FA** | Multi-factor authentication | ⭐⭐⭐ |

### 8.2 Secrets Management

| Technologie | Usage | Priorité |
|-------------|-------|----------|
| **HashiCorp Vault** | Secrets management enterprise | ⭐⭐⭐ |
| **AWS Secrets Manager** | Secrets managed (AWS) | ⭐⭐⭐ |
| **AWS Systems Manager Parameter Store** | Config + secrets (AWS) | ⭐⭐⭐ |
| **Azure Key Vault** | Secrets managed (Azure) | ⭐⭐⭐ |
| **Google Secret Manager** | Secrets managed (GCP) | ⭐⭐⭐ |
| **SOPS** | Secrets chiffrés (Mozilla) | ⭐⭐ |
| **Sealed Secrets** | Secrets K8s chiffrés (Bitnami) | ⭐⭐ |
| **External Secrets Operator** | Sync secrets cloud → K8s | ⭐⭐ |
| **Doppler** | Secrets management developer | ⭐ |
| **Infisical** | Secrets management open-source | ⭐⭐ |
| **1Password Secrets Automation** | Secrets management | ⭐ |

### 8.3 Sécurité réseau & scanning

| Technologie | Usage | Priorité |
|-------------|-------|----------|
| **Cloudflare** | CDN + DDoS + WAF + DNS | ⭐⭐⭐ |
| **AWS WAF** | Web Application Firewall | ⭐⭐ |
| **AWS Shield** | DDoS protection | ⭐⭐ |
| **ModSecurity** | WAF open-source | ⭐ |
| **Nmap** | Network scanning | ⭐⭐ |
| **Wireshark** | Packet analysis | ⭐⭐ |
| **OpenVAS** | Vulnerability scanning | ⭐ |
| **Nessus** | Vulnerability scanning enterprise | ⭐ |
| **Trivy** | Container security scanning | ⭐⭐⭐ |
| **Snyk** | Security scanning (code + containers + IaC) | ⭐⭐⭐ |
| **SonarQube** | Code quality + security | ⭐⭐⭐ |
| **Semgrep** | Static analysis security | ⭐⭐ |
| **Checkov** | IaC security scanning | ⭐⭐ |
| **OWASP ZAP** | DAST security testing | ⭐ |
| **Burp Suite** | Web security testing | ⭐ |
| **Vault** | Encryption at rest + transit | ⭐⭐⭐ |
| **Let's Encrypt** | TLS certificates gratuits | ⭐⭐⭐ |
| **Certbot** | TLS certificate automation | ⭐⭐⭐ |
| **GPG / PGP** | Encryption de données | ⭐⭐ |
| **mTLS** | Mutual TLS | ⭐⭐ |
| **AWS GuardDuty** | Threat detection (AWS) | ⭐⭐ |
| **Azure Sentinel** | SIEM (Azure) | ⭐⭐ |
| **Microsoft Defender for Cloud** | Cloud security (Azure) | ⭐⭐ |
| **Google Chronicle** | SIEM (GCP) | ⭐ |
| **Wiz** | Cloud security posture | ⭐ |
| **Prisma Cloud** | Cloud security (Palo Alto) | ⭐ |

---

## 9. Réseau & DNS

| Technologie | Usage | Priorité |
|-------------|-------|----------|
| **NGINX** | Reverse proxy / web server / load balancer | ⭐⭐⭐ |
| **Apache HTTP Server** | Web server | ⭐⭐ |
| **HAProxy** | Load balancer haute performance | ⭐⭐⭐ |
| **Traefik** | Reverse proxy cloud-native | ⭐⭐⭐ |
| **Caddy** | Web server auto-TLS | ⭐⭐ |
| **Envoy** | Service proxy (Layer 7) | ⭐⭐ |
| **AWS ALB/NLB** | Load balancers managed (AWS) | ⭐⭐⭐ |
| **Google Cloud Load Balancer** | Load balancer (GCP) | ⭐⭐ |
| **Azure Load Balancer** | Load balancer (Azure) | ⭐⭐ |
| **Cloudflare DNS** | DNS + CDN + security | ⭐⭐⭐ |
| **AWS Route 53** | DNS managed (AWS) | ⭐⭐⭐ |
| **Google Cloud DNS** | DNS managed (GCP) | ⭐⭐ |
| **Azure DNS** | DNS managed (Azure) | ⭐⭐ |
| **BIND** | DNS server (ISC) | ⭐⭐ |
| **Pi-hole** | DNS ad-blocking | ⭐ |
| **CoreDNS** | DNS server cloud-native (K8s) | ⭐⭐ |
| **WireGuard** | VPN moderne | ⭐⭐ |
| **OpenVPN** | VPN open-source | ⭐⭐ |
| **Tailscale** | VPN mesh (WireGuard) | ⭐⭐ |
| **Cloudflare Tunnel** | Secure tunnel (zero trust) | ⭐⭐ |
| **NGINX Proxy Manager** | Reverse proxy GUI | ⭐ |
| **Caddy** | Auto-TLS reverse proxy | ⭐⭐ |
| **Istio** | Service mesh (traffic management) | ⭐⭐ |
| **Linkerd** | Service mesh lightweight | ⭐⭐ |

---

## 10. GitOps & Configuration Management

| Technologie | Usage | Priorité |
|-------------|-------|----------|
| **Argo CD** | GitOps CD pour Kubernetes | ⭐⭐⭐ |
| **Flux CD** | GitOps CD (Weaveworks) | ⭐⭐⭐ |
| **Ansible** | Configuration management + provisioning | ⭐⭐⭐ |
| **Ansible Tower / AWX** | UI + RBAP pour Ansible | ⭐⭐ |
| **Puppet** | Configuration management | ⭐ |
| **Chef** | Configuration management | ⭐ |
| **SaltStack** | Configuration management | ⭐ |
| **Kustomize** | Configuration Kubernetes (overlay) | ⭐⭐⭐ |
| **Helm** | Package management Kubernetes | ⭐⭐⭐ |
| **Kapitan** | Configuration management K8s | ⭐ |
| **Jsonnet** | Data templating | ⭐ |
| **cdktf** | Terraform via CDK | ⭐ |
| **Atlantis** | Terraform PR automation | ⭐⭐ |
| **Spacelift** | IaC management platform | ⭐ |

---

## 11. Data Visualization & BI

| Technologie | Usage | Priorité |
|-------------|-------|----------|
| **Power BI** | Business intelligence Microsoft | ⭐⭐⭐ |
| **Tableau** | Business intelligence enterprise | ⭐⭐⭐ |
| **Looker** | Business intelligence (Google) | ⭐⭐⭐ |
| **Looker Studio** | Dashboards gratuits (Google) | ⭐⭐⭐ |
| **Apache Superset** | BI open-source | ⭐⭐⭐ |
| **Metabase** | BI open-source simple | ⭐⭐⭐ |
| **Redash** | BI open-source | ⭐⭐ |
| **Grafana** | Dashboards monitoring + data | ⭐⭐⭐ |
| **Streamlit** | Apps data Python | ⭐⭐⭐ |
| **Dash (Plotly)** | Dashboards Python | ⭐⭐ |
| **Panel** | Dashboards Python (HoloViz) | ⭐ |
| **Lightdash** | BI open-source (dbt native) | ⭐⭐ |
| **Mode Analytics** | BI collaboratif | ⭐ |
| **Sisense** | BI embedded | ⭐ |
| **Qlik Sense** | BI interactive | ⭐ |
| **IBM Cognos** | BI enterprise | ⭐ |
| **SAP BusinessObjects** | BI enterprise | ⭐ |
| **MicroStrategy** | BI enterprise | ⭐ |
| **Google Data Studio (Looker Studio)** | BI gratuit | ⭐⭐⭐ |
| **Apache ECharts** | Charts JavaScript | ⭐⭐ |
| **D3.js** | Data visualization JavaScript | ⭐⭐ |
| **Plotly.js** | Charts interactifs | ⭐⭐ |
| **Chart.js** | Charts simples | ⭐⭐ |
| **Observable Plot** | Charts (Observable) | ⭐ |
| **Vega / Vega-Lite** | Visualization grammar | ⭐ |
| **Evidence** | BI as code | ⭐ |
| **Hex** | Data notebooks + apps | ⭐ |
| **Count** | Notebooks collaboratives | ⭐ |

---

## 12. Machine Learning & IA

### 12.1 Frameworks ML/DL

| Technologie | Usage | Priorité |
|-------------|-------|----------|
| **Scikit-learn** | ML classique (Python) | ⭐⭐⭐ |
| **TensorFlow** | Deep learning (Google) | ⭐⭐⭐ |
| **Keras** | High-level DL API | ⭐⭐⭐ |
| **PyTorch** | Deep learning (Meta) | ⭐⭐⭐ |
| **XGBoost** | Gradient boosting | ⭐⭐⭐ |
| **LightGBM** | Gradient boosting (Microsoft) | ⭐⭐⭐ |
| **CatBoost** | Gradient boosting (Yandex) | ⭐⭐ |
| **Hugging Face Transformers** | NLP + LLM | ⭐⭐⭐ |
| **Hugging Face Diffusers** | Image generation | ⭐⭐ |
| **OpenAI API** | LLM API | ⭐⭐⭐ |
| **LangChain** | LLM orchestration | ⭐⭐⭐ |
| **LlamaIndex** | RAG framework | ⭐⭐⭐ |
| **CrewAI** | Multi-agent orchestration | ⭐⭐ |
| **MLflow** | ML lifecycle management | ⭐⭐⭐ |
| **Weights & Biases (W&B)** | Experiment tracking | ⭐⭐⭐ |
| **DVC (Data Version Control)** | Version control for ML | ⭐⭐ |
| **Feast** | Feature store | ⭐⭐ |
| **Tecton** | Feature platform | ⭐ |
| **BentoML** | Model serving | ⭐⭐ |
| **TensorFlow Serving** | Model serving (TF) | ⭐⭐ |
| **TorchServe** | Model serving (PyTorch) | ⭐⭐ |
| **ONNX** | Model interchange format | ⭐⭐ |
| **Apache MXNet** | Deep learning (Amazon) | ⭐ |
| **JAX** | NumPy + autodiff (Google) | ⭐⭐ |
| **Statsmodels** | Statistical modeling | ⭐⭐ |
| **Prophet** | Time series forecasting (Meta) | ⭐⭐ |
| **Dask-ML** | Distributed ML | ⭐⭐ |
| **Ray Train** | Distributed ML training | ⭐⭐ |
| **Spark MLlib** | ML on Spark | ⭐⭐ |
| **H2O.ai** | AutoML platform | ⭐ |
| **Auto-sklearn** | AutoML | ⭐ |
| **AutoGluon** | AutoML (Amazon) | ⭐ |

### 12.2 MLOps & Model Deployment

| Technologie | Usage | Priorité |
|-------------|-------|----------|
| **MLflow** | Experiment tracking + model registry | ⭐⭐⭐ |
| **Kubeflow** | ML on Kubernetes | ⭐⭐ |
| **Kedro** | ML pipeline framework | ⭐⭐ |
| **Flyte** | ML workflow orchestration | ⭐⭐ |
| **Airflow** | Workflow orchestration (ML pipelines) | ⭐⭐⭐ |
| **Dagster** | Data/ML orchestration | ⭐⭐ |
| **Metaflow** | ML infrastructure (Netflix) | ⭐⭐ |
| **ZenML** | MLOps framework | ⭐⭐ |
| **BentoML** | Model serving | ⭐⭐ |
| **Seldon Core** | Model serving on K8s | ⭐⭐ |
| **KServe** | Model serving on K8s | ⭐⭐ |
| **TensorFlow Serving** | Model serving (TF) | ⭐⭐ |
| **TorchServe** | Model serving (PyTorch) | ⭐⭐ |
| **vLLM** | LLM serving haute performance | ⭐⭐ |
| **Ollama** | LLM local | ⭐⭐ |
| **Text Generation Inference (TGI)** | LLM serving (Hugging Face) | ⭐⭐ |
| **NVIDIA Triton** | Model serving multi-framework | ⭐⭐ |
| **AWS SageMaker** | ML platform managed (AWS) | ⭐⭐⭐ |
| **Google Vertex AI** | ML platform managed (GCP) | ⭐⭐⭐ |
| **Azure ML** | ML platform managed (Azure) | ⭐⭐⭐ |
| **Databricks ML** | ML on Databricks | ⭐⭐⭐ |
| **Neptune.ai** | Experiment tracking | ⭐⭐ |
| **ClearML** | MLOps platform | ⭐ |
| **ModelDB** | Model versioning (Verta) | ⭐ |
| **Evidently AI** | ML monitoring | ⭐ |
| **Whylabs** | ML observability | ⭐ |

### 12.3 Données d'entraînement & Annotation

| Technologie | Usage | Priorité |
|-------------|-------|----------|
| **Label Studio** | Data labeling open-source | ⭐⭐ |
| **Prodigy** | Data annotation (spaCy) | ⭐ |
| **Amazon SageMaker Ground Truth** | Data labeling managed | ⭐ |
| **CVAT** | Computer vision annotation | ⭐⭐ |
| **Labelbox** | Data labeling enterprise | ⭐ |
| **Hugging Face Datasets** | Datasets ML | ⭐⭐ |
| **Kaggle Datasets** | Datasets publics | ⭐⭐ |
| **UCI Machine Learning Repository** | Datasets académiques | ⭐⭐ |

### 12.4 LLM & Generative AI

| Technologie | Usage | Priorité |
|-------------|-------|----------|
| **OpenAI (GPT-4, GPT-4o)** | LLM API | ⭐⭐⭐ |
| **Anthropic (Claude)** | LLM API | ⭐⭐⭐ |
| **Google (Gemini)** | LLM API | ⭐⭐⭐ |
| **Meta (Llama)** | LLM open-source | ⭐⭐⭐ |
| **Mistral** | LLM open-source (France) | ⭐⭐⭐ |
| **DeepSeek** | LLM open-source (Chine) | ⭐⭐ |
| **Hugging Face Hub** | Model hub | ⭐⭐⭐ |
| **Ollama** | LLM local | ⭐⭐⭐ |
| **vLLM** | LLM serving haute performance | ⭐⭐⭐ |
| **Text Generation Inference** | LLM serving (HF) | ⭐⭐ |
| **LangChain** | LLM orchestration | ⭐⭐⭐ |
| **LlamaIndex** | RAG framework | ⭐⭐⭐ |
| **Semantic Kernel** | LLM SDK (Microsoft) | ⭐⭐ |
| **Haystack** | LLM pipeline framework | ⭐⭐ |
| **Open WebUI** | Interface web pour LLMs | ⭐ |
| **Anything LLM** | LLM workspace local | ⭐ |
| **LM Studio** | LLM local GUI | ⭐⭐ |
| **GPT4All** | LLM local | ⭐⭐ |
| **llama.cpp** | LLM inference C++ | ⭐⭐ |
| **Whisper** | Speech-to-text (OpenAI) | ⭐⭐ |
| **Stable Diffusion** | Image generation | ⭐⭐ |
| **ComfyUI** | Image generation workflow | ⭐⭐ |
| **Automatic1111** | Image generation UI | ⭐ |
| **RAG (Retrieval-Augmented Generation)** | Pattern LLM + base de connaissances | ⭐⭐⭐ |
| **Embeddings** | Représentation vectorielle du texte | ⭐⭐⭐ |
| **Fine-tuning** | Adaptation de modèles LLM | ⭐⭐ |
| **PEFT / LoRA / QLoRA** | Fine-tuning efficace | ⭐⭐ |
| **Guardrails / NeMo Guardrails** | Sécurisation LLM | ⭐⭐ |
| **Prompt engineering** | Ingénierie de prompts | ⭐⭐⭐ |

---

## 13. Databases Data Engineering — Outils Spécifiques

| Technologie | Usage | Priorité |
|-------------|-------|----------|
| **Apache Kafka** | Event streaming | ⭐⭐⭐ |
| **Apache Spark** | Distributed processing | ⭐⭐⭐ |
| **Apache Flink** | Stream processing | ⭐⭐⭐ |
| **dbt** | SQL transformation | ⭐⭐⭐ |
| **Airflow** | Workflow orchestration | ⭐⭐⭐ |
| **Dagster** | Data orchestration | ⭐⭐ |
| **Databricks** | Lakehouse platform | ⭐⭐⭐ |
| **Snowflake** | Cloud data warehouse | ⭐⭐⭐ |
| **BigQuery** | Serverless data warehouse (GCP) | ⭐⭐⭐ |
| **Redshift** | Data warehouse (AWS) | ⭐⭐⭐ |
| **Apache Iceberg** | Open table format | ⭐⭐⭐ |
| **Delta Lake** | Open table format | ⭐⭐⭐ |
| **Apache Hudi** | Incremental data processing | ⭐⭐ |
| **MinIO** | S3-compatible object storage | ⭐⭐ |
| **Apache NiFi** | Data flow | ⭐⭐ |
| **Fluentd / Fluent Bit** | Log collection | ⭐⭐ |
| **Vector** | Metrics/logs collection | ⭐⭐ |
| **Telegraf** | Metrics collection (InfluxData) | ⭐⭐ |

---

## 14. Web Servers & Reverse Proxies

| Technologie | Usage | Priorité |
|-------------|-------|----------|
| **NGINX** | Web server + reverse proxy + LB | ⭐⭐⭐ |
| **Apache HTTP Server** | Web server | ⭐⭐ |
| **Caddy** | Web server + auto-TLS | ⭐⭐ |
| **HAProxy** | Load balancer | ⭐⭐⭐ |
| **Traefik** | Reverse proxy cloud-native | ⭐⭐⭐ |
| **Envoy** | Layer 7 proxy | ⭐⭐ |
| **Istio Gateway** | Ingress (service mesh) | ⭐⭐ |
| **Kong** | API gateway | ⭐⭐ |
| **APISIX** | API gateway open-source | ⭐ |
| **Tyk** | API gateway | ⭐ |
| **Kong Gateway** | API management | ⭐⭐ |
| **AWS API Gateway** | Managed API gateway (AWS) | ⭐⭐ |
| **Google Apigee** | API management (GCP) | ⭐ |
| **Azure API Management** | API gateway (Azure) | ⭐⭐ |

---

## 15. Stockage & Systèmes de Fichiers

| Technologie | Usage | Priorité |
|-------------|-------|----------|
| **Amazon S3** | Object storage | ⭐⭐⭐ |
| **Google Cloud Storage** | Object storage | ⭐⭐⭐ |
| **Azure Blob Storage** | Object storage | ⭐⭐⭐ |
| **MinIO** | S3-compatible self-hosted | ⭐⭐ |
| **Ceph** | Distributed storage | ⭐⭐ |
| **Amazon EBS** | Block storage (AWS) | ⭐⭐⭐ |
| **Amazon EFS** | File storage (AWS) | ⭐⭐ |
| **NFS** | Network file system | ⭐⭐ |
| **CIFS / SMB** | File sharing (Windows) | ⭐⭐ |
| **GlusterFS** | Distributed file system | ⭐ |
| **Longhorn** | Distributed block storage (K8s) | ⭐ |
| **Rook-Ceph** | Ceph on Kubernetes | ⭐ |
| **Portworx** | Enterprise storage (K8s) | ⭐ |
| **NetApp** | Enterprise storage | ⭐ |
| **HDFS** | Distributed file system (Hadoop) | ⭐⭐ |
| **JuiceFS** | Distributed file system | ⭐ |
| **SeaweedFS** | Distributed file system | ⭐ |

---

## 16. Virtualisation

| Technologie | Usage | Priorité |
|-------------|-------|----------|
| **Docker** | Containerisation | ⭐⭐⭐ |
| **Proxmox VE** | Virtualisation open-source | ⭐⭐ |
| **VMware vSphere / ESXi** | Virtualisation enterprise | ⭐⭐ |
| **KVM / QEMU** | Virtualisation Linux | ⭐⭐ |
| **VirtualBox** | Virtualisation desktop | ⭐⭐ |
| **Hyper-V** | Virtualisation Microsoft | ⭐⭐ |
| **Xen** | Virtualisation | ⭐ |
| **QEMU** | Émulation / virtualisation | ⭐⭐ |
| **Firecracker** | MicroVMs (AWS Lambda) | ⭐ |
| **Kata Containers** | Secure containers (VM-like) | ⭐ |
| **gVisor** | Sandbox containers (Google) | ⭐ |
| **LXC / LXD** | System containers | ⭐ |
| **Vagrant** | VMs de développement | ⭐⭐ |
| **Packer** | Image building (HashiCorp) | ⭐⭐ |

---

## 17. Communication & Collaboration

| Technologie | Usage | Priorité |
|-------------|-------|----------|
| **Slack** | Communication d'équipe | ⭐⭐⭐ |
| **Microsoft Teams** | Communication (Microsoft) | ⭐⭐ |
| **Discord** | Communication | ⭐⭐ |
| **Notion** | Documentation + project management | ⭐⭐⭐ |
| **Confluence** | Documentation (Atlassian) | ⭐⭐ |
| **Jira** | Project management (Atlassian) | ⭐⭐⭐ |
| **Trello** | Project management (Kanban) | ⭐⭐ |
| **GitHub Issues / Projects** | Project management | ⭐⭐⭐ |
| **GitLab Issues / Boards** | Project management | ⭐⭐ |
| **Linear** | Project management modern | ⭐ |
| **Asana** | Project management | ⭐ |
| **Monday.com** | Project management | ⭐ |
| **Figma** | Design UI/UX | ⭐ |
| **Draw.io / diagrams.net** | Diagrammes | ⭐⭐⭐ |
| **Lucidchart** | Diagrammes | ⭐ |
| **Excalidraw** | Whiteboard | ⭐⭐ |

---

## 18. Operating Systems

| Technologie | Usage | Priorité |
|-------------|-------|----------|
| **Ubuntu Server** | Linux server | ⭐⭐⭐ |
| **Debian** | Linux server stable | ⭐⭐⭐ |
| **CentOS / Rocky Linux / AlmaLinux** | Linux enterprise (RHEL-compatible) | ⭐⭐ |
| **Amazon Linux** | Linux optimized for AWS | ⭐⭐ |
| **Container-Optimized OS (COS)** | Linux containers (GCP) | ⭐ |
| **Flatcar Container Linux** | Container-optimized OS | ⭐ |
| **Windows Server** | Windows enterprise | ⭐⭐ |
| **macOS** | Development workstation | ⭐⭐ |
| **Alpine Linux** | Lightweight Linux (containers) | ⭐⭐ |
| **Arch Linux** | Rolling release Linux | ⭐ |
| **Fedora** | Linux innovant | ⭐ |

---

## 19. Outils de Développement

| Technologie | Usage | Priorité |
|-------------|-------|----------|
| **VS Code** | Éditeur de code | ⭐⭐⭐ |
| **JetBrains (IntelliJ, PyCharm, GoLand)** | IDE | ⭐⭐⭐ |
| **Vim / Neovim** | Éditeur terminal | ⭐⭐ |
| **Emacs** | Éditeur terminal | ⭐ |
| **Cursor** | IDE AI-powered | ⭐⭐ |
| **GitHub Copilot** | AI code assistant | ⭐⭐⭐ |
| **Postman** | API testing | ⭐⭐⭐ |
| **Insomnia** | API testing open-source | ⭐⭐ |
| **curl** | HTTP client (CLI) | ⭐⭐⭐ |
| **HTTPie** | HTTP client amélioré | ⭐⭐ |
| **DBeaver** | Database GUI universal | ⭐⭐⭐ |
| **pgAdmin** | PostgreSQL GUI | ⭐⭐ |
| **DataGrip** | Database GUI (JetBrains) | ⭐⭐ |
| **MySQL Workbench** | MySQL GUI | ⭐⭐ |
| **MongoDB Compass** | MongoDB GUI | ⭐⭐ |
| **RedisInsight** | Redis GUI | ⭐⭐ |
| **Azure Data Studio** | SQL + notebook GUI | ⭐⭐ |
| **TablePlus** | Database GUI | ⭐ |
| **Beekeeper Studio** | Database GUI open-source | ⭐ |
| **HeidiSQL** | Database GUI (Windows) | ⭐ |
| **Schemaspy** | Database documentation | ⭐ |
| **dbdiagram.io** | Database schema diagram | ⭐⭐ |
| **Docker Desktop** | Docker GUI (Mac/Windows) | ⭐⭐⭐ |
| **Lens** | Kubernetes IDE | ⭐⭐ |
| **k9s** | Kubernetes TUI | ⭐⭐⭐ |
| **Kubernetes Dashboard** | Kubernetes UI | ⭐⭐ |
| **Rancher Desktop** | Container + Kubernetes desktop | ⭐ |
| **Portainer** | Docker/K8s management GUI | ⭐⭐ |
| **lazygit** | Git TUI | ⭐⭐ |
| **tig** | Git log TUI | ⭐ |
| **htop / btop** | System monitoring TUI | ⭐⭐ |
| **tmux** | Terminal multiplexer | ⭐⭐ |
| **screen** | Terminal multiplexer | ⭐ |
| **asdf** | Version manager polyglot | ⭐⭐ |
| **nvm** | Node version manager | ⭐⭐⭐ |
| **pyenv** | Python version manager | ⭐⭐⭐ |
| **rbenv** | Ruby version manager | ⭐ |
| **Homebrew** | Package manager (macOS/Linux) | ⭐⭐ |
| **apt / yum / dnf** | Package managers Linux | ⭐⭐⭐ |

---

## 20. CI/CD — Patterns & Concepts

| Concept | Description |
|---------|-------------|
| **GitOps** | Git comme source de vérité pour l'infra et les déploiements |
| **Trunk-Based Development** | Branchement simplifié (mainline) |
| **Feature Flags** | Déploiement progressif de features |
| **Blue-Green Deployment** | 2 environnements, switch instantané |
| **Canary Deployment** | Déploiement progressif (1% → 10% → 100%) |
| **Rolling Update** | Mise à jour incrémentale des instances |
| **Immutable Infrastructure** | Infra jamais modifiée, toujours remplacée |
| **Cattle vs Pets** | Infra jetable vs server soigné |
| **Shift-Left Security** | Sécurité intégrée dès le dev |
| **Infrastructure as Code** | Infra définie en code |
| **Policy as Code** | Règles de governance en code |
| **Chaos Engineering** | Tests de résilience (Chaos Monkey) |
| **SRE (Site Reliability Engineering)** | Approche Google pour la fiabilité |
| **SLI / SLO / SLA** | Métriques de fiabilité |
| **Error Budget** | Budget d'erreurs acceptable |
| **Observability** | Comprendre l'état interne d'un système |
| **Tracing** | Suivi des requêtes distribuées |
| **Circuit Breaker** | Pattern de résilience |
| **Bulkhead** | Isolation de pannes |
| **Retry + Backoff** | Gestion des erreurs temporaires |
| **Dead Letter Queue** | Queue pour messages non traités |
| **CQRS** | Command Query Responsibility Segregation |
| **Event Sourcing** | Historique des événements comme source de vérité |

---

## 21. Data Concepts & Patterns

| Concept | Description |
|---------|-------------|
| **ETL (Extract, Transform, Load)** | Pipeline classique d'intégration de données |
| **ELT (Extract, Load, Transformation)** | Chargement puis transformation dans le warehouse |
| **Data Lake** | Stockage brut de données (structured + unstructured) |
| **Data Warehouse** | Données structurées pour l'analyse |
| **Data Mart** | Sous-ensemble du warehouse pour un domaine |
| **Data Mesh** | Architecture décentralisée de données |
| **Data Fabric** | Couche d'abstraction de données unifiée |
| **Data Lakehouse** | Combinaison Data Lake + Data Warehouse |
| **CDC (Change Data Capture)** | Capture des changements en temps réel |
| **SCD (Slowly Changing Dimensions)** | Gestion des changements temporels |
| **Star Schema** | Modèle dimensionnel étoile |
| **Snowflake Schema** | Modèle dimensionnel flocon |
| **Data Vault** | Modèle de modélisation flexible |
| **Kimball vs Inmon** | Approches de modélisation data warehouse |
| **Data Lineage** | Traçabilité des données |
| **Data Catalog** | Inventaire des données |
| **Data Governance** | Gouvernance des données |
| **Data Quality** | Qualité des données |
| **Master Data Management (MDM)** | Gestion des données de référence |
| **Data Virtualization** | Accès unifié sans déplacement |
| **Data Federation** | Requête sur sources multiples |
| **Batch Processing** | Traitement par lots |
| **Stream Processing** | Traitement en continu |
| **Micro-batch** | Compromis batch/stream |
| **Lambda Architecture** | Batch + speed layer |
| **Kappa Architecture** | Stream only |
| **Feature Store** | Dépôt de features ML |
| **Data Contracts** | Contrats entre producteurs et consommateurs |
| **Schema Registry** | Gestion des schémas de données |
| **Partitioning** | Partitionnement des données |
| **Bucketing / Clustering** | Regroupement des données |
| **Z-Ordering** | Optimisation de requêtes multi-colonnes |
| **Compaction** | Optimisation du stockage (merge fichiers) |
| **Upsert / Merge** | Insertion ou mise à jour |
| **Backfill** | Rechargement historique |
| **Idempotency** | Exécution sans effet double |
| **Partition Pruning** | Élimination de partitions inutiles |
| **Predicate Pushdown** | Filtres poussés vers la source |
| **Columnar Storage** | Stockage par colonnes |
| **Compression** | Compression des données (Snappy, Zstd, LZ4) |
| **Deduplication** | Suppression des doublons |
| **Data Retention** | Politique de rétention des données |
| **GDPR Compliance** | Conformité RGPD |
| **PII Handling** | Gestion des données personnelles |
| **Anonymization / Pseudonymization** | Protection des données personnelles |
| **Data Masking** | Masquage de données sensibles |

---

## 22. Patterns Architecturaux Cloud

| Pattern | Description |
|---------|-------------|
| **Microservices** | Architecture en services indépendants |
| **Monolith** | Application unitaire |
| **Serverless** | Compute sans gestion de serveur |
| **FaaS (Function as a Service)** | Exécution de fonctions event-driven |
| **BaaS (Backend as a Service)** | Backend managed (Firebase, Supabase) |
| **API Gateway** | Point d'entrée unique pour les APIs |
| **Service Mesh** | Communication inter-services gérée |
| **Event-Driven Architecture** | Communication via événements |
| **Pub/Sub** | Pattern publish/subscribe |
| **CQRS** | Séparation lectures/écritures |
| **Event Sourcing** | Historique complet des événements |
| **Saga Pattern** | Transactions distribuées |
| **2PC (Two-Phase Commit)** | Transaction distribuée atomique |
| **Outbox Pattern** | Émission fiable d'événements |
| **Strangler Fig** | Migration progressive monolith → microservices |
| **Sidecar Pattern** | Fonctionnalités auxiliaires (proxy, logs) |
| **Ambassador Pattern** | Proxy sortant |
| **Bulkhead Pattern** | Isolation de défaillances |
| **Circuit Breaker** | Protection contre les pannes en cascade |
| **Retry with Backoff** | Réessai avec délai croissant |
| **Health Check** | Vérification de santé |
| **Blue-Green Deployment** | 2 environnements identiques |
| **Canary Release** | Déploiement progressif |
| **Feature Flags** | Activation/désactivation de features |
| **A/B Testing** | Tests comparatifs |
| **Multi-Tenancy** | Serveur unique, plusieurs clients |
| **Data Residency** | Localisation géographique des données |
| **Disaster Recovery** | Reprise après sinistre |
| **High Availability (HA)** | Haute disponibilité |
| **Auto-Scaling** | Dimensionnement automatique |
| **Edge Computing** | Traitement au plus près de la source |
| **Multi-Cloud** | Utilisation de plusieurs clouds |
| **Hybrid Cloud** | Cloud + on-premise |
| **Zero Trust** | Sécurité sans perimeter |
| **Defense in Depth** | Sécurité en couches |

---

## 23. Protocoles & Standards

| Protocole | Usage | Priorité |
|-----------|-------|----------|
| **HTTP/HTTPS** | Communication web | ⭐⭐⭐ |
| **HTTP/2** | HTTP multiplexé | ⭐⭐ |
| **HTTP/3 (QUIC)** | HTTP over QUIC | ⭐ |
| **TCP** | Transport reliable | ⭐⭐⭐ |
| **UDP** | Transport fast | ⭐⭐ |
| **WebSocket** | Communication bidirectionnelle | ⭐⭐ |
| **gRPC** | RPC haute performance (Google) | ⭐⭐⭐ |
| **GraphQL** | API query language | ⭐⭐ |
| **REST** | API architectural style | ⭐⭐⭐ |
| **SOAP** | API XML legacy | ⭐ |
| **MQTT** | IoT messaging | ⭐⭐ |
| **AMQP** | Message queuing protocol | ⭐⭐ |
| **SSH** | Secure shell | ⭐⭐⭐ |
| **TLS / SSL** | Chiffrement transport | ⭐⭐⭐ |
| **mTLS** | Mutual TLS | ⭐⭐ |
| **DNS** | Résolution de noms | ⭐⭐⭐ |
| **DHCP** | Attribution d'adresses IP | ⭐⭐ |
| **SMTP** | Envoi d'emails | ⭐⭐ |
| **IMAP / POP3** | Réception d'emails | ⭐⭐ |
| **LDAP / AD** | Annuaire | ⭐⭐ |
| **NTP** | Synchronisation temporelle | ⭐⭐ |
| **Syslog** | Logging standard | ⭐⭐ |
| **NetFlow / sFlow** | Monitoring réseau | ⭐⭐ |
| **SNMP** | Management réseau | ⭐⭐ |
| **OAuth 2.0** | Authorization | ⭐⭐⭐ |
| **OpenID Connect** | Authentication | ⭐⭐⭐ |
| **SAML** | SSO | ⭐⭐ |
| **OIDC** | Identity layer on OAuth | ⭐⭐⭐ |
| **JWT** | Token format | ⭐⭐⭐ |
| **Avro** | Sérialisation (Kafka) | ⭐⭐⭐ |
| **Protobuf** | Sérialisation (gRPC) | ⭐⭐⭐ |
| **Thrift** | Sérialisation (Facebook) | ⭐ |
| **Parquet** | Storage columnar | ⭐⭐⭐ |
| **ORC** | Storage columnar | ⭐⭐ |
| **Arrow** | In-memory columnar format | ⭐⭐⭐ |
| **IPC** | Inter-process communication | ⭐⭐ |
| **OpenTelemetry** | Observability standard | ⭐⭐⭐ |
| **OpenMetrics** | Metrics exposition format | ⭐⭐ |
| **Prometheus** | Metrics exposition | ⭐⭐⭐ |
| **Scraping** | Métriques par pull | ⭐⭐⭐ |
| **Pushgateway** | Métriques par push | ⭐⭐ |

---

## 24. FinOps & Coût Cloud

| Concept / Outil | Description |
|-----------------|-------------|
| **FinOps** | Gestion financière du cloud |
| **AWS Cost Explorer** | Visualisation des coûts AWS |
| **AWS Budgets** | Alertes de coûts AWS |
| **AWS Trusted Advisor** | Recommandations d'optimisation |
| **GCP Cost Management** | Gestion des coûts GCP |
| **Azure Cost Management** | Gestion des coûts Azure |
| **Infracost** | Estimation de coûts IaC |
| **Kubecost** | Coûts Kubernetes |
| **Spot Instances (AWS)** | Instances interruptibles (-90%) |
| **Preemptible VMs (GCP)** | VMs éphémères |
| **Reserved Instances (AWS)** | Instances réservées (-40%) |
| **Savings Plans** | Plans d'économies |
| **Right-Sizing** | Ajustement de la taille des ressources |
| **Auto-Scaling** | Dimensionnement automatique |
| **Cloud Health (VMware)** | Multi-cloud cost management |
| **Cloudability** | Cloud cost optimization |
| **Spot by NetApp** | Spot instance management |

---

## 25. Streaming & Event Processing — Patterns

| Pattern / Outil | Description |
|-----------------|-------------|
| **Event Sourcing** | Stocker chaque changement comme événement |
| **CQRS** | Séparer les modèles de lecture et d'écriture |
| **CDC (Change Data Capture)** | Capturer les changements de BDD en temps réel |
| **Debezium** | CDC open-source (Kafka Connect) |
| **Kafka Connect** | Connecteur Kafka ↔ sources |
| **Schema Registry** | Gestion des schémas (Avro, Protobuf, JSON) |
| **Dead Letter Queue** | Messages non traités |
| **Idempotent Consumer** | Consommateur sans effet double |
| **Exactly-Once Semantics** | Garantie de traitement unique |
| **At-Least-Once** | Au moins une fois |
| **At-Most-Once** | Au plus une fois |
| **Windowing** | Fenêtrage (tumbling, sliding, session) |
| **Watermark** | Gestion du retard dans le streaming |
| **Backpressure** | Gestion de la surcharge |
| **Compacted Topic** | Topic Kafka avec rétention par clé |
| **Log Compaction** | Compaction de logs Kafka |
| **Stream-Stream Join** | Jointure entre deux flux |
| **Stream-Table Join** | Jointure flux ↔ table |
| **KTable** | Vue matérialisée dans Kafka Streams |
| **GlobalKTable** | KTable distribuée globalement |
| **Processor API** | API bas niveau Kafka Streams |
| **Interactive Queries** | Requêtes sur les KTables |
| **Exactly-Once Kafka** | Transaction Kafka |
| **Idempotent Producer** | Producteur idempotent |
| **Transactional Producer** | Producteur transactionnel |

---

## Résumé : Top 50 technologies incontournables

| # | Technologie | Catégorie |
|---|-------------|-----------|
| 1 | **Python** | Langage |
| 2 | **SQL** | Langage |
| 3 | **Git** | Version control |
| 4 | **Docker** | Conteneurs |
| 5 | **Kubernetes** | Orchestration |
| 6 | **Terraform / OpenTofu** | IaC |
| 7 | **Apache Airflow** | Orchestration workflows |
| 8 | **Apache Spark** | Big Data processing |
| 9 | **Apache Kafka** | Event streaming |
| 10 | **dbt** | Data transformation |
| 11 | **PostgreSQL** | Base de données |
| 12 | **Linux (Ubuntu/Debian)** | OS |
| 13 | **AWS** | Cloud |
| 14 | **GCP** | Cloud |
| 15 | **Azure** | Cloud |
| 16 | **Ansible** | Configuration management |
| 17 | **GitHub Actions** | CI/CD |
| 18 | **Jenkins** | CI/CD |
| 19 | **Prometheus** | Monitoring |
| 20 | **Grafana** | Dashboards |
| 21 | **ELK Stack / OpenSearch** | Logging |
| 22 | **NGINX** | Reverse proxy |
| 23 | **HAProxy** | Load balancing |
| 24 | **HashiCorp Vault** | Secrets |
| 25 | **Snowflake** | Data warehouse |
| 26 | **BigQuery** | Data warehouse |
| 27 | **Redshift** | Data warehouse |
| 28 | **Databricks** | Lakehouse |
| 29 | **Apache Iceberg** | Table format |
| 30 | **Delta Lake** | Table format |
| 31 | **MongoDB** | NoSQL |
| 32 | **Redis** | Cache / KV |
| 33 | **Elasticsearch** | Search / Analytics |
| 34 | **Scikit-learn** | ML |
| 35 | **TensorFlow / PyTorch** | Deep Learning |
| 36 | **MLflow** | MLOps |
| 37 | **OpenTelemetry** | Observability |
| 38 | **Jaeger** | Distributed tracing |
| 39 | **Argo CD** | GitOps |
| 40 | **Flux CD** | GitOps |
| 41 | **Helm** | K8s packaging |
| 42 | **Power BI** | BI |
| 43 | **Tableau** | BI |
| 44 | **Apache Superset** | BI open-source |
| 45 | **Streamlit** | Apps data |
| 46 | **Jupyter** | Notebooks |
| 47 | **OpenAI API / LLMs** | AI |
| 48 | **LangChain** | LLM orchestration |
| 49 | **MinIO** | Object storage |
| 50 | **Airbyte / Fivetran** | ELT connectors |

---

*Dernière mise à jour : Juillet 2026*
