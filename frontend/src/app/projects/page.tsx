import type { Metadata } from "next"
import Link from "next/link"

import { SectionTitle } from "@/components/ui/SectionTitle"
import { api, Project } from "@/lib/api"
import { projectImageUrl } from "@/lib/project-image"
import { shouldShowOnProjectsPage } from "@/lib/projectGroups"

export const metadata: Metadata = {
  title: "Projets",
  description:
    "Sélection de projets de KAINWANG Roger : pipelines de données, applications ML, visualisation et développement web full-stack.",
  openGraph: {
    title: "Projets | KAINWANG Roger",
    description:
      "Découvrez les projets data engineering et data science de KAINWANG Roger.",
  },
}

export default async function Projects() {
  let projects: Project[] = []
  try {
    const allProjects = await api.projects.list()
    projects = allProjects.filter(shouldShowOnProjectsPage)
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
            <div
              key={project.slug}
              className="group rounded-lg border border-border bg-card overflow-hidden transition-all hover:shadow-lg flex flex-col h-full"
            >
              <Link href={`/projects/${project.slug}`} className="aspect-video bg-muted overflow-hidden block">
                <img
                  src={projectImageUrl(project)}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </Link>
              <div className="p-5 flex flex-col flex-1">
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {project.tech_stack.split(",").map((tag) => (
                    <span key={tag.trim()} className="text-[10px] rounded-full border border-border px-2 py-0.5 text-muted-foreground bg-muted/30">
                      {tag.trim()}
                    </span>
                  ))}
                </div>
                <h3 className="mb-2 font-semibold line-clamp-1">{project.title}</h3>
                <p className="mb-4 text-sm text-muted-foreground line-clamp-3">
                  {project.description || "Projet Data Engineering importé de GitHub."}
                </p>
                <div className="mt-auto flex items-center justify-between gap-4">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-sm text-primary font-medium hover:underline"
                  >
                    Détails →
                  </Link>
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
          ))}
        </div>
      )}
    </div>
  )
}