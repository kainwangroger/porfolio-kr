import { FeaturedProjects } from "@/components/home/FeaturedProjects"
import { Hero } from "@/components/home/Hero"
import { TechStack } from "@/components/home/TechStack"
import { api, Project, Skill } from "@/lib/api"
import { isInGroup1 } from "@/lib/projectGroups"

/**
 * Régénération toutes les heures. Le contenu bouge rarement ; sans cela chaque
 * visite frappait l'API, y compris pendant le réveil d'un backend en veille.
 */
export const revalidate = 3600

/**
 * Page d'accueil.
 *
 * Les deux sections sous le hero étaient rendues côté client : le HTML servi
 * ne contenait qu'un squelette. Les données sont maintenant récupérées ici, en
 * parallèle. Un échec sur l'une n'efface pas l'autre — la section concernée
 * s'efface simplement, plutôt que de faire tomber toute la page d'accueil.
 */
export default async function Home() {
  const [projectsResult, skillsResult] = await Promise.allSettled([
    api.projects.list(),
    api.skills.list(),
  ])

  const featured: Project[] =
    projectsResult.status === "fulfilled" ? projectsResult.value.filter(isInGroup1) : []
  const skills: Skill[] = skillsResult.status === "fulfilled" ? skillsResult.value : []

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:py-20">
      <Hero />
      <FeaturedProjects projects={featured} />
      <TechStack skills={skills} />
    </div>
  )
}
