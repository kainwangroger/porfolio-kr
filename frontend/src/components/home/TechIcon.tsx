import * as simpleIcons from "simple-icons"

/**
 * Logo de marque d'une technologie.
 *
 * Les icônes étaient des émojis : AWS et Azure partageaient ☁️ et le repli
 * était 🔧, ce qui donnait un rendu approximatif sur une page qui présente des
 * compétences techniques. On utilise les logos officiels de `simple-icons`.
 *
 * Quelques marques (AWS, Azure, Power BI, Tableau, dbt) n'y figurent pas pour
 * des raisons de droits : elles reçoivent un monogramme sobre, qui reste
 * cohérent avec le reste plutôt que de trancher.
 */

/** Nom affiché → slug simple-icons, quand les deux diffèrent. */
const ICON_SLUGS: Record<string, string> = {
  python: "Python",
  spark: "Apachespark",
  "apache spark": "Apachespark",
  pyspark: "Apachespark",
  airflow: "Apacheairflow",
  "apache airflow": "Apacheairflow",
  kafka: "Apachekafka",
  "apache kafka": "Apachekafka",
  flink: "Apacheflink",
  nifi: "Apachenifi",
  superset: "Apachesuperset",
  docker: "Docker",
  kubernetes: "Kubernetes",
  terraform: "Terraform",
  pandas: "Pandas",
  numpy: "Numpy",
  "scikit-learn": "Scikitlearn",
  sklearn: "Scikitlearn",
  tensorflow: "Tensorflow",
  pytorch: "Pytorch",
  streamlit: "Streamlit",
  git: "Git",
  github: "Github",
  "google cloud": "Googlecloud",
  gcp: "Googlecloud",
  postgresql: "Postgresql",
  postgres: "Postgresql",
  elasticsearch: "Elasticsearch",
  mlflow: "Mlflow",
  databricks: "Databricks",
  snowflake: "Snowflake",
  trino: "Trino",
  qdrant: "Qdrant",
  "hugging face": "Huggingface",
  plotly: "Plotly",
  "next.js": "Nextdotjs",
  nextjs: "Nextdotjs",
  react: "React",
  typescript: "Typescript",
  javascript: "Javascript",
  fastapi: "Fastapi",
  flask: "Flask",
  mongodb: "Mongodb",
  redis: "Redis",
  scipy: "Scipy",
  keras: "Keras",
  jupyter: "Jupyter",
  anaconda: "Anaconda",
  hadoop: "Apachehadoop",
  grafana: "Grafana",
  prometheus: "Prometheus",
  langchain: "Langchain",
  dvc: "Dvc",
  dbeaver: "Dbeaver",
}

interface BrandIcon {
  path: string
  hex: string
  title: string
}

function lookupIcon(name: string): BrandIcon | null {
  const slug = ICON_SLUGS[name.trim().toLowerCase()]
  if (!slug) return null
  const icon = (simpleIcons as unknown as Record<string, BrandIcon | undefined>)[`si${slug}`]
  return icon ?? null
}

export function TechIcon({ name, className = "h-4 w-4" }: { name: string; className?: string }) {
  const icon = lookupIcon(name)

  if (icon) {
    return (
      <svg
        role="img"
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={className}
        fill={`#${icon.hex}`}
      >
        <path d={icon.path} />
      </svg>
    )
  }

  // Monogramme de repli pour les marques absentes de simple-icons.
  const initials = name
    .split(/[\s-]+/)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("")

  return (
    <span
      aria-hidden="true"
      className={`${className} inline-flex items-center justify-center rounded-sm bg-muted-foreground/15 text-[9px] font-bold leading-none text-muted-foreground`}
    >
      {initials}
    </span>
  )
}
