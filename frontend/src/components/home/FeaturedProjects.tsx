"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Badge } from "@/components/ui/Badge"
import { api, Project } from "@/lib/api"
import { projectImageUrl } from "@/lib/project-image"

const defaultProjects: Project[] = [
  {
    id: 0,
    title: "Mon Portfolio",
    slug: "portfolio",
    description:
      "Site portfolio data engineer / data scientist avec Next.js, FastAPI et PostgreSQL.",
    content: "",
    tech_stack: "Next.js,FastAPI,PostgreSQL,Docker",
    image_url: "",
    github_url: "",
    demo_url: "",
    featured: 1,
    year: 2025,
    created_at: "",
    updated_at: null,
  },
  {
    id: 1,
    title: "Application de prédiction",
    slug: "prediction-app",
    description:
      "Plateforme ML de prédiction avec Streamlit, CNN2D-BiLSTM-Attention et modèles ensemblistes.",
    content: "",
    tech_stack: "Python,Streamlit,TensorFlow,Docker",
    image_url: "",
    github_url: "",
    demo_url: "",
    featured: 1,
    year: 2025,
    created_at: "",
    updated_at: null,
  },
  {
    id: 2,
    title: "Togo Data Lab",
    slug: "togo-data-lab",
    description:
      "Analyse et visualisation des données socio-économiques du Togo avec Python et Jupyter.",
    content: "",
    tech_stack: "Python,Jupyter,Pandas,Matplotlib",
    image_url: "",
    github_url: "",
    demo_url: "",
    featured: 1,
    year: 2025,
    created_at: "",
    updated_at: null,
  },
  {
    id: 3,
    title: "Agence de Voyage API",
    slug: "agence-voyage",
    description:
      "Backend Spring Boot pour une agence de voyage avec authentification JWT et API REST.",
    content: "",
    tech_stack: "Java,Spring Boot,JWT,PostgreSQL",
    image_url: "",
    github_url: "",
    demo_url: "",
    featured: 1,
    year: 2025,
    created_at: "",
    updated_at: null,
  },
  {
    id: 4,
    title: "Django Site Web",
    slug: "django-mysite",
    description:
      "Site web Django avec portfolio, blog et système de contact intégré.",
    content: "",
    tech_stack: "Django,Python,SQLite,Bootstrap",
    image_url: "",
    github_url: "",
    demo_url: "",
    featured: 1,
    year: 2025,
    created_at: "",
    updated_at: null,
  },
  {
    id: 5,
    title: "Plateforme Sociale Togo",
    slug: "social-togo",
    description:
      "Réseau social local pour le Togo avec fonctionnalités de messagerie et de partage.",
    content: "",
    tech_stack: "Python,Django,PostgreSQL,Docker",
    image_url: "",
    github_url: "",
    demo_url: "",
    featured: 1,
    year: 2025,
    created_at: "",
    updated_at: null,
  },
]

export function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>(defaultProjects)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    api.projects.featured()
      .then((apiProjects) => {
        if (apiProjects.length > 0) {
          const seen = new Set(apiProjects.map((p) => p.slug))
          const merged = [...apiProjects, ...defaultProjects.filter((p) => !seen.has(p.slug))]
          setProjects(merged)
        }
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (projects.length === 0) return
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % projects.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [projects.length])

  if (projects.length === 0) return null

  const nextIndex = (i: number) => (i + 1) % projects.length
  const prevIndex = (i: number) => (i - 1 + projects.length) % projects.length

  const goTo = (i: number) => {
    setIndex(i)
  }

  const projectA = projects[index]
  const projectB = projects[nextIndex(index)]

  return (
    <section className="mb-32">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 md:flex-row">
        <div className="relative flex-1">
          <div className="flex items-center gap-2">
            <button
              onClick={() => goTo(prevIndex(index))}
              className="z-10 shrink-0 rounded-full border border-border p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              aria-label="Précédent"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="relative flex-1 overflow-hidden rounded-xl border border-border bg-card shadow-md">
              <div className="p-6 sm:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={projectA.slug}
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -300, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <div className="-mx-6 -mt-6 mb-5 overflow-hidden sm:-mx-8 sm:-mt-8">
                      <img
                        src={projectImageUrl(projectA)}
                        alt={projectA.title}
                        className="h-48 w-full object-cover"
                      />
                    </div>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {projectA.tech_stack.split(",").map((tag) => (
                        <Badge key={tag.trim()}>{tag.trim()}</Badge>
                      ))}
                    </div>
                    <h3 className="mb-2 text-xl font-bold">{projectA.title}</h3>
                    <p className="mb-5 text-sm text-muted-foreground">
                      {projectA.description}
                    </p>
                    <Link
                      href={`/projects/${projectA.slug}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      En savoir plus →
                    </Link>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
          <div className="mt-3 flex justify-center gap-2">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index
                    ? "w-6 bg-primary"
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Projet ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="relative flex-1">
          <div className="flex items-center gap-2">
            <div className="relative flex-1 overflow-hidden rounded-xl border border-border bg-card shadow-md">
              <div className="p-6 sm:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={projectB.slug}
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -300, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <div className="-mx-6 -mt-6 mb-5 overflow-hidden sm:-mx-8 sm:-mt-8">
                      <img
                        src={projectImageUrl(projectB)}
                        alt={projectB.title}
                        className="h-48 w-full object-cover"
                      />
                    </div>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {projectB.tech_stack.split(",").map((tag) => (
                        <Badge key={tag.trim()}>{tag.trim()}</Badge>
                      ))}
                    </div>
                    <h3 className="mb-2 text-xl font-bold">{projectB.title}</h3>
                    <p className="mb-5 text-sm text-muted-foreground">
                      {projectB.description}
                    </p>
                    <Link
                      href={`/projects/${projectB.slug}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      En savoir plus →
                    </Link>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            <button
              onClick={() => goTo(nextIndex(index))}
              className="z-10 shrink-0 rounded-full border border-border p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              aria-label="Suivant"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
