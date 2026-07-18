"use client"

/**
 * FeaturedProjects — Carrousel de projets mis en avant
 *
 * Corrections senior appliquées :
 * - Hauteur fixe des cartes (min-h) pour éviter le layout shift au slide
 * - line-clamp sur la description pour uniformiser peu importe la longueur
 * - Fallback propre pour descriptions vides
 * - Un seul index de navigation (plus de double-panel désynchronisé)
 * - Auto-play ralenti à 5s (3s était trop rapide pour lire)
 * - Pause on hover (meilleure UX)
 * - Indicateurs de pagination accessibles
 * - Suppression des defaultProjects hardcodés (affiche skeleton en attendant l'API)
 */

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react"

import { Badge } from "@/components/ui/Badge"
import { SectionTitle } from "@/components/ui/SectionTitle"
import { api, Project } from "@/lib/api"
import { projectImageUrl } from "@/lib/project-image"
import { isInGroup1 } from "@/lib/projectGroups"

const AUTOPLAY_DELAY = 5000 // 5s — assez pour lire le titre + description

/** Squelette de chargement */
function ProjectSkeleton() {
  return (
    <div className="w-full animate-pulse rounded-2xl border border-border bg-card">
      <div className="h-52 w-full rounded-t-2xl bg-muted" />
      <div className="p-6">
        <div className="mb-4 flex gap-2">
          <div className="h-5 w-16 rounded-full bg-muted" />
          <div className="h-5 w-20 rounded-full bg-muted" />
        </div>
        <div className="mb-2 h-6 w-3/4 rounded bg-muted" />
        <div className="mb-1 h-4 w-full rounded bg-muted" />
        <div className="mb-4 h-4 w-5/6 rounded bg-muted" />
        <div className="h-4 w-24 rounded bg-muted" />
      </div>
    </div>
  )
}

/** Carte d'un projet — hauteur fixe pour éviter le layout shift */
function ProjectCard({ project }: { project: Project }) {
  const tags = project.tech_stack
    ? project.tech_stack.split(",").filter(Boolean).slice(0, 5)
    : []

  // Fallback description si vide
  const description =
    project.description?.trim() ||
    "Projet Data Engineering importé depuis GitHub. Cliquez pour en savoir plus."

  return (
    <div className="flex h-full flex-col">
      {/* Image */}
      <div className="h-52 w-full shrink-0 overflow-hidden rounded-t-2xl">
        <img
          src={projectImageUrl(project)}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Contenu */}
      <div className="flex flex-1 flex-col p-6">
        {/* Tags */}
        <div className="mb-3 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Badge key={tag.trim()}>{tag.trim()}</Badge>
          ))}
          {project.year && (
            <span className="ml-auto text-xs text-muted-foreground">
              {project.year}
            </span>
          )}
        </div>

        {/* Titre */}
        <h3 className="mb-2 line-clamp-2 text-lg font-bold leading-snug">
          {project.title}
        </h3>

        {/* Description — fixée à 3 lignes max, toujours le même espace */}
        <p className="mb-4 line-clamp-3 min-h-[3.75rem] text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        {/* CTA */}
        <div className="mt-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href={`/projects/${project.slug}`}
              className="text-sm font-medium text-primary hover:underline"
            >
              En savoir plus →
            </Link>
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label={`Code source de ${project.title}`}
              >
                <Github className="h-4 w-4" />
              </a>
            )}
          </div>
          
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-600 transition-colors hover:bg-green-500/20 dark:bg-green-500/20 dark:text-green-400"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500"></span>
              </span>
              Tester
            </a>
          )}
        </div>

      </div>
    </div>
  )
}

export function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [index, setIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Chargement depuis l'API uniquement (plus de hardcoded defaults)
  useEffect(() => {
    api.projects
      .list()
      .then((data) => {
        const filtered = data.filter(isInGroup1)
        setProjects(filtered)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  // Auto-play avec pause on hover
  useEffect(() => {
    if (projects.length <= 1 || paused) return
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % projects.length)
    }, AUTOPLAY_DELAY)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [projects.length, paused])

  const goTo = (i: number) => {
    setIndex(i)
    // Reset timer à chaque navigation manuelle
    if (timerRef.current) clearInterval(timerRef.current)
  }

  const prev = () => goTo((index - 1 + projects.length) % projects.length)
  const next = () => goTo((index + 1) % projects.length)

  // Affichage : 2 cartes côte à côte sur desktop, 1 sur mobile
  const visibleA = projects[index]
  const visibleB = projects[(index + 1) % projects.length]

  return (
    <section className="mb-32">
      <div className="mb-8 flex items-end justify-between">
        <SectionTitle
          title="Projets phares"
          subtitle="Une sélection de mes réalisations"
        />
        <Link
          href="/projects"
          className="hidden text-sm font-medium text-primary hover:underline md:block"
        >
          Voir tous les projets →
        </Link>
      </div>

      {loading ? (
        /* Skeleton pendant le chargement */
        <div className="grid gap-6 md:grid-cols-2">
          <ProjectSkeleton />
          <ProjectSkeleton />
        </div>
      ) : projects.length === 0 ? (
        <p className="text-center text-muted-foreground">
          Aucun projet mis en avant pour le moment.
        </p>
      ) : (
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Cartes — hauteur uniforme grâce à items-stretch */}
          <div className="grid items-stretch gap-6 md:grid-cols-2">
            {/* Carte principale */}
            <div className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`A-${visibleA.slug}`}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="h-full"
                >
                  <ProjectCard project={visibleA} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Carte secondaire — visible uniquement si 2+ projets */}
            {projects.length > 1 && (
              <div className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`B-${visibleB.slug}`}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.35, ease: "easeInOut", delay: 0.05 }}
                    className="h-full"
                  >
                    <ProjectCard project={visibleB} />
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Projet précédent"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Points de pagination */}
            <div className="flex gap-2">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Aller au projet ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-6 bg-primary"
                      : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Projet suivant"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Lien mobile */}
          <div className="mt-6 text-center md:hidden">
            <Link href="/projects" className="text-sm font-medium text-primary hover:underline">
              Voir tous les projets →
            </Link>
          </div>
        </div>
      )}
    </section>
  )
}
