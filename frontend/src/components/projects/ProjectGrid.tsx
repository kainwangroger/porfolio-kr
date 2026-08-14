"use client"

import { useMemo, useState } from "react"

import { Project } from "@/lib/api"
import { DOMAIN_ORDER, DOMAINS, projectDomain, type DomainId } from "@/lib/project-domain"
import { ProjectCard } from "./ProjectCard"

type Filter = DomainId | "all"

/**
 * Grille filtrable. Le filtrage se fait sur une liste déjà rendue côté
 * serveur : le contenu reste dans le HTML pour les moteurs de recherche, et
 * seule l'interaction est cliente.
 */
export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("all")

  const counts = useMemo(() => {
    const tally: Record<string, number> = {}
    for (const project of projects) {
      const id = projectDomain(project).id
      tally[id] = (tally[id] ?? 0) + 1
    }
    return tally
  }, [projects])

  const visible = useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((project) => projectDomain(project).id === filter),
    [projects, filter]
  )

  const available = DOMAIN_ORDER.filter((id) => counts[id] > 0)

  return (
    <>
      {available.length > 1 && (
        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filtrer par domaine">
          <FilterButton
            active={filter === "all"}
            onClick={() => setFilter("all")}
            label="Tous"
            count={projects.length}
          />
          {available.map((id) => (
            <FilterButton
              key={id}
              active={filter === id}
              onClick={() => setFilter(id)}
              label={DOMAINS[id].label}
              count={counts[id]}
              accent={DOMAINS[id].accent}
            />
          ))}
        </div>
      )}

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </>
  )
}

function FilterButton({
  active,
  onClick,
  label,
  count,
  accent,
}: {
  active: boolean
  onClick: () => void
  label: string
  count: number
  accent?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
        active
          ? "border-transparent bg-primary text-primary-foreground"
          : "border-border text-muted-foreground hover:border-primary hover:text-foreground"
      }`}
    >
      {!active && accent && (
        <span
          aria-hidden="true"
          className="mr-2 inline-block h-1.5 w-1.5 rounded-full align-middle"
          style={{ backgroundColor: accent }}
        />
      )}
      {label}
      <span className="ml-1.5 tabular-nums opacity-60">{count}</span>
    </button>
  )
}
