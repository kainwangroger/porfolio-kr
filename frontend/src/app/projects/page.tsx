import type { Metadata } from "next"

import { SectionTitle } from "@/components/ui/SectionTitle"
import { ProjectGrid } from "@/components/projects/ProjectGrid"
import { api, Project } from "@/lib/api"
import { shouldShowOnProjectsPage } from "@/lib/projectGroups"

/**
 * Régénération toutes les heures. Le contenu bouge rarement ; sans cela chaque
 * visite frappait l'API, y compris pendant le réveil d'un backend en veille.
 */
export const revalidate = 3600

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
  // Aucun try/catch : une panne de l'API doit remonter à `error.tsx`, pas se
  // déguiser en « aucun projet » — ce qui laisserait croire au visiteur que ce
  // développeur n'a rien réalisé.
  const allProjects = await api.projects.list()
  const projects: Project[] = allProjects.filter(shouldShowOnProjectsPage)

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
        <ProjectGrid projects={projects} />
      )}
    </div>
  )
}
