import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Github, ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { api } from "@/lib/api"
import { isPublicDemoUrl } from "@/lib/demo-url"
import { renderMarkdown } from "@/lib/markdown"
import { projectDomain } from "@/lib/project-domain"
import { shouldShowOnProjectsPage } from "@/lib/projectGroups"
import { projectImageUrl, cleanProjectTitle, THUMB_WIDTH, THUMB_HEIGHT } from "@/lib/project-image"

interface Props {
  params: Promise<{ slug: string }>
}

/**
 * Régénération toutes les heures, comme les autres pages publiques.
 */
export const revalidate = 3600

/**
 * Pré-rend les pages projet au build. Un slug absent de cette liste reste
 * servi à la demande puis mis en cache, ce qui évite un échec de build si
 * l'API ne répond pas à ce moment-là.
 */
export async function generateStaticParams() {
  const projects = await api.projects.list().catch(() => [])
  return projects.filter(shouldShowOnProjectsPage).map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const project = await api.projects.get(slug)
    return {
      title: cleanProjectTitle(project.title),
      description: project.description || `Détails du projet ${project.title}`,
      openGraph: {
        title: `${cleanProjectTitle(project.title)} | KAINWANG Roger`,
        description: project.description || `Détails du projet ${project.title}`,
      },
    }
  } catch {
    return {
      title: "Projet introuvable",
    }
  }
}

export default async function ProjectDetail({ params }: Props) {
  const { slug } = await params

  let project
  try {
    project = await api.projects.get(slug)
  } catch {
    // Un slug inconnu renvoie 404 côté API ; on ne distingue pas ici la panne
    // du projet inexistant, `not-found.tsx` couvre les deux avec un message
    // qui laisse une porte de sortie au visiteur.
    notFound()
  }

  const contentHtml = await renderMarkdown(
    project.content || "Ce projet n'a pas de contenu détaillé."
  )
  const domain = projectDomain(project)
  const tags = project.tech_stack.split(",").map((t) => t.trim()).filter(Boolean)
  const hasDemo = isPublicDemoUrl(project.demo_url)

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:py-20">
      <Link
        href="/projects"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour aux projets
      </Link>

      <div className="mb-8 space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className="rounded-full px-2.5 py-1 text-xs font-semibold"
            style={{ color: domain.accent, backgroundColor: `${domain.accent}1f` }}
          >
            {domain.label}
          </span>
          {project.year > 0 && (
            <span className="text-sm text-muted-foreground tabular-nums">{project.year}</span>
          )}
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          {cleanProjectTitle(project.title)}
        </h1>
        {project.description && (
          <p className="text-lg text-muted-foreground">{project.description}</p>
        )}
      </div>

      <div className="mb-8 overflow-hidden rounded-xl border border-border shadow-sm">
        {/* eslint-disable-next-line @next/next/no-img-element -- vignette SVG servie par /api/thumb ; next/image n'optimise pas le SVG */}
        <img
          src={projectImageUrl(project)}
          alt=""
          width={THUMB_WIDTH}
          height={THUMB_HEIGHT}
          className="aspect-video w-full object-cover"
        />
      </div>

      {tags.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="mb-10 flex flex-wrap gap-4">
        {project.github_url && (
          <a href={project.github_url} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="flex items-center gap-2">
              <Github className="h-4 w-4" />
              Code source
            </Button>
          </a>
        )}
        {hasDemo && (
          <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
            <Button className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              Voir la démo
            </Button>
          </a>
        )}
      </div>

      <div
        className="prose prose-neutral max-w-none"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </article>
  )
}
