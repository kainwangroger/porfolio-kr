import { Project } from "./api"

// Helper to normalize slug (converts to lower case and removes leading numbering like '01-')
export function getNormalizedSlug(slug: string): string {
  return slug.toLowerCase().replace(/^[0-9]+-/, "")
}

const GROUP_1_SLUGS = new Set([
  "cdc-iceberg-lakehouse",
  "data-mesh-selfservice",
  "finops-cost-optimization",
  "finops-optimisation-couts",
  "enterprise-data-platform",
  "genai-factory-plateforme-enterprise",
  "genai-factory",
  "rlhf-finetuning-llm",
  "multi-agents-automatisation",
  "generation-tests-documentation",
  "fraude-temps-reel-kafka-flink",
  "ml-serving-kubernetes-kserve",
  "recherche-multimodale-clip-qdrant",
  "agent-veille-emploi-afrique",
])

const GROUP_2_SLUGS = new Set([
  "feature-store-temps-reel",
  "multicloud-data-platform",
  "elasticsearch-analytics",
  "geospatial-h3-mobility",
  "observability-data-governance",
  "anomalies-iot-flink-deeplearning",
  "recommendation-grande-echelle",
  "document-intelligence-ocr-layoutlm",
  "vision-temps-reel-yolo-tracking",
  "pipeline-mlops-mlflow",
  "afrilingua",
  "assistant-afrique",
])

/**
 * Returns true if the project belongs to Group 1 (Showcase)
 */
export function isInGroup1(project: Project): boolean {
  const norm = getNormalizedSlug(project.slug)
  return GROUP_1_SLUGS.has(norm) || 
         Array.from(GROUP_1_SLUGS).some(s => norm.includes(s))
}

/**
 * Returns true if the project belongs to Group 2 (Technical Credibility)
 */
export function isInGroup2(project: Project): boolean {
  const norm = getNormalizedSlug(project.slug)
  return GROUP_2_SLUGS.has(norm) || 
         Array.from(GROUP_2_SLUGS).some(s => norm.includes(s))
}

/**
 * Returns true if the project should be shown on the projects page (Group 1 or Group 2)
 */
export function shouldShowOnProjectsPage(project: Project): boolean {
  return isInGroup1(project) || isInGroup2(project)
}
