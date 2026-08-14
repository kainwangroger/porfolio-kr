import type { MetadataRoute } from "next"

import { api } from "@/lib/api"
import { shouldShowOnProjectsPage } from "@/lib/projectGroups"

/**
 * Plan du site.
 *
 * `NEXT_PUBLIC_SITE_URL` doit pointer sur le domaine public en production ;
 * la valeur de repli ne sert qu'au développement local.
 */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3003"

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/projects`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.5 },
  ]

  // Un plan du site partiel vaut mieux qu'un build en échec : si l'API ne
  // répond pas, on publie les routes statiques seules.
  const projects = await api.projects.list().catch(() => [])

  const projectRoutes: MetadataRoute.Sitemap = projects
    .filter(shouldShowOnProjectsPage)
    .map((project) => ({
      url: `${SITE_URL}/projects/${project.slug}`,
      lastModified: project.updated_at ?? project.created_at,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))

  return [...staticRoutes, ...projectRoutes]
}
