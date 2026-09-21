import Link from "next/link"

import { SectionTitle } from "@/components/ui/SectionTitle"
import { Project } from "@/lib/api"
import { ProjectCarousel } from "./ProjectCarousel"

/**
 * Projets phares — composant serveur.
 *
 * Les projets étaient chargés en `useEffect` : le HTML servi ne contenait
 * qu'un squelette, invisible pour les moteurs de recherche et les aperçus
 * partagés. Ils sont désormais rendus côté serveur, seule la navigation du
 * carrousel restant cliente.
 */
export function FeaturedProjects({ projects }: { projects: Project[] }) {
  return (
    <section className="mb-24">
      <div className="mb-8 flex items-end justify-between gap-4">
        <SectionTitle as="h2" title="Projets phares" subtitle="Une sélection de mes réalisations" />
        <Link
          href="/projects"
          className="hidden shrink-0 text-sm font-medium text-primary hover:underline md:block"
        >
          Voir tous les projets →
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className="text-center text-muted-foreground">
          Aucun projet mis en avant pour le moment.
        </p>
      ) : (
        <ProjectCarousel projects={projects} />
      )}

      <div className="mt-6 text-center md:hidden">
        <Link href="/projects" className="text-sm font-medium text-primary hover:underline">
          Voir tous les projets →
        </Link>
      </div>
    </section>
  )
}
