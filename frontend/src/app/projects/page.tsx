import Link from "next/link"

import { SectionTitle } from "@/components/ui/SectionTitle"
import { api, Project } from "@/lib/api"
import { projectImageUrl } from "@/lib/project-image"

export default async function Projects() {
  let projects: Project[] = []
  try {
    projects = await api.projects.list()
  } catch {
    projects = []
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:py-20">
      <SectionTitle
        title="Projets"
        subtitle="Une sélection de mes réalisations"
        className="mb-12"
      />

      {projects.length === 0 ? (
        <p className="text-center text-muted-foreground">Aucun projet pour le moment.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group rounded-lg border border-border bg-card overflow-hidden transition-all hover:shadow-lg"
            >
              <div className="aspect-video bg-muted overflow-hidden">
                <img
                  src={projectImageUrl(project)}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {project.tech_stack.split(",").map((tag) => (
                    <span key={tag.trim()} className="text-xs rounded-full border border-border px-2 py-0.5">
                      {tag.trim()}
                    </span>
                  ))}
                </div>
                <h3 className="mb-2 font-semibold">{project.title}</h3>
                <p className="mb-4 text-sm text-muted-foreground line-clamp-3">
                  {project.description}
                </p>
                <span className="text-sm text-primary font-medium">
                  Détails →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}