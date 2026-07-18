import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Github, ExternalLink } from "lucide-react"
import { marked } from "marked"

import { Button } from "@/components/ui/Button"
import { SectionTitle } from "@/components/ui/SectionTitle"
import { api } from "@/lib/api"
import { projectImageUrl } from "@/lib/project-image"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const project = await api.projects.get(slug)
    return {
      title: project.title,
      description: project.description || `Détails du projet ${project.title}`,
      openGraph: {
        title: `${project.title} | KAINWANG Roger`,
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
    project = null
  }

  if (!project) {
    notFound()
  }

  const contentHtml = await marked.parse(project.content || "Ce projet n'a pas de contenu détaillé.")

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:py-20">
      <Link
        href="/projects"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour aux projets
      </Link>

      <SectionTitle title={project.title} className="mb-8" />

      <div className="mb-8 overflow-hidden rounded-xl border border-border shadow-sm">
        <img 
          src={projectImageUrl(project)} 
          alt={project.title} 
          className="aspect-video w-full object-cover" 
        />
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {project.tech_stack.split(",").map((tag) => (
          <span 
            key={tag.trim()} 
            className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground shadow-sm"
          >
            {tag.trim()}
          </span>
        ))}
      </div>

      <div className="mb-8 flex gap-4">
        {project.github_url && (
          <a href={project.github_url} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="flex items-center gap-2">
              <Github className="h-4 w-4" />
              Code source
            </Button>
          </a>
        )}
        {project.demo_url && (
          <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
            <Button className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              Voir la démo
            </Button>
          </a>
        )}
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </div>
    </article>
  )
}