import Link from "next/link"

import { Button } from "@/components/ui/Button"
import { SectionTitle } from "@/components/ui/SectionTitle"
import { api } from "@/lib/api"
import { projectImageUrl } from "@/lib/project-image"

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  let project
  try {
    project = await api.projects.get(slug)
  } catch {
    project = null
  }

  if (!project) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-20 text-center">
        <h1 className="mb-4 text-2xl font-bold">Projet non trouvé</h1>
        <Link href="/projects">
          <Button variant="outline">Retour aux projets</Button>
        </Link>
      </div>
    )
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:py-20">
      <Link
        href="/projects"
        className="mb-8 inline-flex text-sm text-muted-foreground hover:text-primary"
      >
        ← Retour aux projets
      </Link>

      <SectionTitle title={project.title} subtitle={project.description} className="mb-8" />

      <div className="mb-8 overflow-hidden rounded-xl">
        <img src={projectImageUrl(project)} alt={project.title} className="w-full object-cover" />
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {project.tech_stack.split(",").map((tag) => (
          <span key={tag.trim()} className="rounded-full border border-border px-3 py-1 text-sm">
            {tag.trim()}
          </span>
        ))}
      </div>

      <div className="mb-8 flex gap-4">
        {project.github_url && (
          <a href={project.github_url} target="_blank">
            <Button variant="outline">Code source</Button>
          </a>
        )}
        {project.demo_url && (
          <a href={project.demo_url} target="_blank">
            <Button>Voir la demo</Button>
          </a>
        )}
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <div
          dangerouslySetInnerHTML={{
            __html: project.content
              .replace(/^### /gm, "<h3>")
              .replace(/^## /gm, "<h2>")
              .replace(/\n/g, "<br/>")
              .replace(/- \*\*(.+?)\*\*: (.+)/g, "<li><strong>$1</strong>: $2</li>"),
          }}
        />
      </div>
    </article>
  )
}