"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ExternalLink, Github, Pause, Play } from "lucide-react"

import { Badge } from "@/components/ui/Badge"
import { Project } from "@/lib/api"
import { isPublicDemoUrl } from "@/lib/demo-url"
import { projectDomain } from "@/lib/project-domain"
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion"
import { projectImageUrl, cleanProjectTitle, THUMB_WIDTH, THUMB_HEIGHT } from "@/lib/project-image"

const AUTOPLAY_DELAY = 5000

/**
 * Carrousel des projets phares.
 *
 * Deux corrections par rapport à la version précédente :
 *
 * 1. La navigation manuelle annulait l'intervalle sans jamais le recréer — les
 *    dépendances de l'effet ne changeaient pas. Le défilement s'arrêtait donc
 *    définitivement au premier clic. `tick` relance l'effet à chaque
 *    interaction, ce qui recrée l'intervalle en repartant de zéro.
 * 2. La pause n'existait qu'au survol de la souris. Un bouton lecture/pause la
 *    rend accessible au clavier et au tactile (WCAG 2.2.2), et
 *    `prefers-reduced-motion` désactive le défilement automatique.
 */
export function ProjectCarousel({ projects }: { projects: Project[] }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [tick, setTick] = useState(0)

  const reducedMotion = usePrefersReducedMotion()
  const playing = !paused && !reducedMotion

  useEffect(() => {
    if (projects.length <= 1 || !playing || hovered) return

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % projects.length)
    }, AUTOPLAY_DELAY)

    return () => clearInterval(timer)
  }, [projects.length, playing, hovered, tick])

  const goTo = (next: number) => {
    setIndex(((next % projects.length) + projects.length) % projects.length)
    // Relance le décompte : le visiteur vient de choisir, il mérite le délai complet.
    setTick((value) => value + 1)
  }

  const primary = projects[index]
  const secondary = projects[(index + 1) % projects.length]

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div
        className="grid items-stretch gap-6 md:grid-cols-2"
        aria-live="polite"
        aria-atomic="false"
      >
        <div className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
          <ProjectCard project={primary} />
        </div>
        {projects.length > 1 && (
          <div className="group hidden overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md md:block">
            <ProjectCard project={secondary} />
          </div>
        )}
      </div>

      {projects.length > 1 && (
        <div className="mt-6 flex items-center justify-center gap-3">
          <NavButton onClick={() => goTo(index - 1)} label="Projet précédent">
            <ChevronLeft className="h-4 w-4" />
          </NavButton>

          <div className="flex flex-wrap justify-center gap-2">
            {projects.map((project, i) => (
              <button
                key={project.slug}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Aller au projet ${i + 1} : ${cleanProjectTitle(project.title)}`}
                aria-current={i === index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-primary" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                }`}
              />
            ))}
          </div>

          <NavButton onClick={() => goTo(index + 1)} label="Projet suivant">
            <ChevronRight className="h-4 w-4" />
          </NavButton>

          <NavButton
            onClick={() => setPaused((value) => !value)}
            label={playing ? "Mettre le défilement en pause" : "Reprendre le défilement"}
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </NavButton>
        </div>
      )}
    </div>
  )
}

function NavButton({
  onClick,
  label,
  children,
}: {
  onClick: () => void
  label: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      {children}
    </button>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const domain = projectDomain(project)
  const tags = project.tech_stack.split(",").map((t) => t.trim()).filter(Boolean).slice(0, 4)
  const hasDemo = isPublicDemoUrl(project.demo_url)
  const description =
    project.description?.trim() ||
    "Projet Data Engineering importé depuis GitHub. Cliquez pour en savoir plus."

  return (
    <div className="flex h-full flex-col">
      <div className="h-52 w-full shrink-0 overflow-hidden rounded-t-2xl">
        {/* eslint-disable-next-line @next/next/no-img-element -- vignette SVG servie par /api/thumb ; next/image n'optimise pas le SVG */}
        <img
          src={projectImageUrl(project)}
          alt=""
          width={THUMB_WIDTH}
          height={THUMB_HEIGHT}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex flex-wrap items-center gap-1.5">
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
            style={{ color: domain.accent, backgroundColor: `${domain.accent}1f` }}
          >
            {domain.label}
          </span>
          {tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
          {project.year > 0 && (
            <span className="ml-auto text-xs tabular-nums text-muted-foreground">
              {project.year}
            </span>
          )}
        </div>

        <h3 className="mb-2 line-clamp-2 text-lg font-bold leading-snug transition-colors group-hover:text-primary">
          <Link href={`/projects/${project.slug}`}>{cleanProjectTitle(project.title)}</Link>
        </h3>

        <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">{description}</p>

        <div className="mt-auto flex flex-wrap items-center gap-4">
          <Link
            href={`/projects/${project.slug}`}
            className="text-sm font-medium text-primary hover:underline"
          >
            Détails →
          </Link>
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="h-3.5 w-3.5" />
              Code
            </a>
          )}
          {hasDemo && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Démo
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
