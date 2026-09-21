import Link from "next/link"

import { Project } from "@/lib/api"
import { isPublicDemoUrl } from "@/lib/demo-url"
import { projectDomain } from "@/lib/project-domain"
import { projectImageUrl, cleanProjectTitle, THUMB_WIDTH, THUMB_HEIGHT } from "@/lib/project-image"

/**
 * Carte de projet de la grille /projects.
 *
 * Le badge « Tester » n'apparaît que pour une URL réellement atteignable :
 * une adresse locale produirait une erreur de connexion chez le visiteur.
 */
export function ProjectCard({ project }: { project: Project }) {
  const domain = projectDomain(project)
  const tags = project.tech_stack.split(",").map((t) => t.trim()).filter(Boolean)
  const hasDemo = isPublicDemoUrl(project.demo_url)

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-lg">
      <Link
        href={`/projects/${project.slug}`}
        className="block aspect-video overflow-hidden bg-muted"
        tabIndex={-1}
        aria-hidden="true"
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- vignette SVG servie par /api/thumb ; next/image n'optimise pas le SVG */}
        <img
          src={projectImageUrl(project)}
          alt=""
          width={THUMB_WIDTH}
          height={THUMB_HEIGHT}
          loading="lazy"
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap items-center gap-1.5">
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
            style={{ color: domain.accent, backgroundColor: `${domain.accent}1f` }}
          >
            {domain.label}
          </span>
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-muted/30 px-2 py-0.5 text-[10px] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="mb-2 line-clamp-2 text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
          <Link href={`/projects/${project.slug}`}>{cleanProjectTitle(project.title)}</Link>
        </h3>

        <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
          {project.description || "Projet Data Engineering importé de GitHub."}
        </p>

        <div className="mt-auto flex items-center justify-between gap-4">
          <Link
            href={`/projects/${project.slug}`}
            className="text-sm font-medium text-primary hover:underline"
          >
            Détails →
          </Link>
          {hasDemo && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-600 transition-colors hover:bg-green-500/20 dark:bg-green-500/20 dark:text-green-400"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
              </span>
              Tester
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
