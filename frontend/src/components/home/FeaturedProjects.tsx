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

function ProjectCarousel({ projects }: { projects: Project[] }) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    if (projects.length === 0) return
    const timer = setInterval(() => {
      setDirection(1)
      setCurrent((prev) => (prev + 1) % projects.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [projects.length])

  const goTo = (i: number) => {
    setDirection(i > current ? 1 : -1)
    setCurrent(i)
  }

  if (projects.length === 0) return null

  const project = projects[current]

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  }

  return (
    <div className="relative flex-1">
      <div className="flex items-center gap-2">
        <button
          onClick={() => goTo((current - 1 + projects.length) % projects.length)}
          className="z-10 shrink-0 rounded-full border border-border p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          aria-label="Précédent"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="relative flex-1 overflow-hidden rounded-xl border border-border bg-card shadow-md">
          <div className="p-6 sm:p-8">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={project.slug}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="-mx-6 -mt-6 mb-5 overflow-hidden sm:-mx-8 sm:-mt-8">
                  <img
                    src={projectImageUrl(project)}
                    alt={project.title}
                    className="h-48 w-full object-cover"
                  />
                </div>
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.tech_stack.split(",").map((tag) => (
                    <Badge key={tag.trim()}>{tag.trim()}</Badge>
                  ))}
                </div>
                <h3 className="mb-2 text-xl font-bold">{project.title}</h3>
                <p className="mb-5 text-sm text-muted-foreground">
                  {project.description}
                </p>
                <Link
                  href={`/projects/${project.slug}`}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  En savoir plus →
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <button
          onClick={() => goTo((current + 1) % projects.length)}
          className="z-10 shrink-0 rounded-full border border-border p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          aria-label="Suivant"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <div className="mt-3 flex justify-center gap-2">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all ${
              i === current
                ? "w-6 bg-primary"
                : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            aria-label={`Projet ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>(defaultProjects)

  useEffect(() => {
    api.projects.featured()
      .then((apiProjects) => {
        const seen = new Set(apiProjects.map((p) => p.slug))
        const merged = [...apiProjects, ...defaultProjects.filter((p) => !seen.has(p.slug))]
        setProjects(merged)
      })
      .catch(() => {})
  }, [])

  if (projects.length === 0) return null

  const mid = Math.ceil(projects.length / 2)
  const left = projects.slice(0, mid)
  const right = projects.slice(mid)

  return (
    <section className="mb-32">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 md:flex-row">
        <ProjectCarousel projects={left} />
        <ProjectCarousel projects={right} />
      </div>
    </section>
  )
}
