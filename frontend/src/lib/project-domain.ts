/**
 * Classement des projets par domaine.
 *
 * La grille de projets était illisible : toutes les cartes portaient la même
 * vignette et la même étiquette « Python », faute de topics sur les dépôts
 * GitHub. Le domaine se déduit ici du slug et du tech_stack, ce qui donne au
 * visiteur de quoi filtrer et à chaque vignette une teinte distincte —
 * sans dépendre d'une saisie manuelle projet par projet.
 *
 * Quand les topics GitHub seront renseignés, ils alimenteront `tech_stack` et
 * la classification s'affinera d'elle-même.
 */

export type DomainId = "data" | "ml" | "web"

export interface Domain {
  id: DomainId
  label: string
  /** Teinte d'accent de la vignette, lisible sur fond sombre. */
  accent: string
}

export const DOMAINS: Record<DomainId, Domain> = {
  data: { id: "data", label: "Data Engineering", accent: "#38bdf8" },
  ml: { id: "ml", label: "Machine Learning & IA", accent: "#c084fc" },
  web: { id: "web", label: "Développement web", accent: "#34d399" },
}

export const DOMAIN_ORDER: DomainId[] = ["data", "ml", "web"]

const KEYWORDS: Record<DomainId, string[]> = {
  data: [
    "kafka", "spark", "iceberg", "lakehouse", "cdc", "airflow", "dbt",
    "data-mesh", "datamesh", "pipeline", "streaming", "flink", "elasticsearch",
    "geospatial", "observability", "finops", "multicloud", "warehouse", "etl",
    "enterprise-data", "feature-store", "governance", "h3", "iot", "trino",
    "postgres", "sql", "hadoop", "databricks", "snowflake",
  ],
  ml: [
    "ml", "mlops", "llm", "rag", "bert", "yolo", "cnn", "mnist", "nlp",
    "vision", "agents", "rlhf", "genai", "sentiment", "prediction", "prdiction",
    "classification", "detection", "ocr", "clip", "qdrant", "recommendation",
    "kserve", "mlflow", "layoutlm", "deeplearning", "finetuning", "chatbot",
    "anomalies", "fraud", "fraude", "tracking", "afrilingua", "scikit",
    "tensorflow", "pytorch", "machine learning",
  ],
  web: [
    "portfolio", "next.js", "nextjs", "react", "reactjs", "spring", "java",
    "authentification", "auth", "api", "backend", "frontend", "typescript",
    "javascript", "flask", "django", "fastapi", "agence", "voyage", "site",
  ],
}

/** Découpe en jetons comparables : minuscules, séparateurs unifiés. */
function tokenize(project: { slug: string; title?: string; tech_stack?: string }): string {
  return [project.slug, project.title ?? "", project.tech_stack ?? ""]
    .join(" ")
    .toLowerCase()
    .replace(/[_/,]+/g, " ")
}

/**
 * Domaine du projet, par comptage de mots-clés. En cas d'égalité, l'ordre de
 * `DOMAIN_ORDER` tranche — un projet ambigu est plus utilement rangé en Data
 * Engineering, qui est le cœur du profil.
 */
export function projectDomain(project: {
  slug: string
  title?: string
  tech_stack?: string
}): Domain {
  const haystack = tokenize(project)

  let best: DomainId = "web"
  let bestScore = 0

  for (const id of DOMAIN_ORDER) {
    const score = KEYWORDS[id].reduce(
      (total, keyword) => (haystack.includes(keyword) ? total + 1 : total),
      0
    )
    if (score > bestScore) {
      best = id
      bestScore = score
    }
  }

  return DOMAINS[best]
}
