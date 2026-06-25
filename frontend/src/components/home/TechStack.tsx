"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

import { SectionTitle } from "@/components/ui/SectionTitle"
import { api, Skill } from "@/lib/api"

const iconMap: Record<string, string> = {
  Python: "🐍",
  SQL: "🗄️",
  Spark: "⚡",
  Airflow: "🔄",
  Docker: "🐳",
  Kafka: "📨",
  dbt: "📦",
  Azure: "☁️",
  AWS: "☁️",
  Terraform: "🏗️",
  "Machine Learning": "🤖",
  "Scikit-learn": "📊",
  Pandas: "📊",
  NumPy: "🔢",
  "Power BI": "📈",
  Tableau: "📉",
  Matplotlib: "📊",
  Streamlit: "🎈",
  Git: "🔀",
}

export function TechStack() {
  const [techs, setTechs] = useState<Skill[]>([])

  useEffect(() => {
    api.skills.list().then(setTechs).catch(() => {})
  }, [])

  if (techs.length === 0) return null

  return (
    <section className="mb-32">
      <SectionTitle
        title="Technologies"
        subtitle="Les outils que j'utilise au quotidien"
        className="mb-12"
      />
      <div className="flex flex-wrap gap-3">
        {techs.map((tech, i) => (
          <motion.div
            key={tech.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-primary"
          >
            <span>{iconMap[tech.name] || "🔧"}</span>
            {tech.name}
          </motion.div>
        ))}
      </div>
    </section>
  )
}