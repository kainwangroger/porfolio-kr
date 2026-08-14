const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001/api/v1"

/** Ressources publiques mises en cache, chacune invalidable séparément. */
export const CACHE_TAGS = ["projects", "events", "skills", "blog"] as const
export type CacheTag = (typeof CACHE_TAGS)[number]

/**
 * Étiquette de cache déduite du chemin appelé.
 *
 * Elle permet au back-office de vider exactement ce qu'il vient de modifier :
 * enregistrer un événement ne doit pas faire regénérer la page projets.
 */
export function cacheTagFor(endpoint: string): CacheTag | null {
  const resource = endpoint.replace(/^\//, "").split(/[/?]/)[0]
  return (CACHE_TAGS as readonly string[]).includes(resource)
    ? (resource as CacheTag)
    : null
}

async function fetcher<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const tag = cacheTagFor(endpoint)
  const isRead = !options?.method || options.method === "GET"

  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
    // Les lectures publiques sont mises en cache et étiquetées. Sans
    // étiquette, une modification depuis le back-office n'apparaîtrait
    // qu'à la régénération horaire.
    ...(isRead && tag ? { next: { revalidate: 3600, tags: [tag] } } : {}),
  })
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`)
  }
  return res.json()
}

export interface Skill {
  id: number
  category: string
  name: string
}

export const api = {
  skills: {
    list: () => fetcher<Skill[]>("/skills"),
  },
  projects: {
    list: () => fetcher<Project[]>("/projects"),
    featured: () => fetcher<Project[]>("/projects/featured"),
    get: (slug: string) => fetcher<Project>(`/projects/${slug}`),
  },
  events: {
    list: () => fetcher<PortfolioEvent[]>("/events"),
    get: (slug: string) => fetcher<PortfolioEvent>(`/events/${slug}`),
  },
  blog: {
    list: (skip = 0, limit = 20) =>
      fetcher<BlogPost[]>(`/blog?skip=${skip}&limit=${limit}`),
    get: (slug: string) => fetcher<BlogPost>(`/blog/${slug}`),
  },
  contact: (data: { name: string; email: string; message: string }) =>
    fetcher("/contact", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  stats: {
    github: (username = "roger") =>
      fetcher<GithubStats>(`/stats/github?username=${username}`),
    pageVisit: () =>
      fetcher<{ key: string; value: number }>("/stats/page-visit", { method: "POST" }),
    cvDownload: () =>
      fetcher<{ key: string; value: number }>("/stats/cv-download", { method: "POST" }),
  },
  health: () => fetcher<{ status: string }>("/health"),
}

export interface Project {
  id: number
  title: string
  slug: string
  description: string
  content: string
  tech_stack: string
  image_url: string
  github_url: string
  demo_url: string
  featured: number
  year: number
  created_at: string
  updated_at: string | null
}

/**
 * Un événement : hackathon, conférence, école d'été.
 *
 * `images` contient une URL par ligne — voir `eventImages()` pour la lecture.
 * Nommé `PortfolioEvent` et non `Event`, qui est déjà pris par le type DOM.
 */
export interface PortfolioEvent {
  id: number
  title: string
  slug: string
  organizer: string
  location: string
  period: string
  role: string
  description: string
  images: string
  link_url: string
  sort_order: number
  created_at: string
  updated_at: string | null
}

/** Découpe le champ `images` en URLs exploitables. */
export function eventImages(event: { images: string }): string[] {
  return event.images
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
}

export interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  cover_image: string
  tags: string
  published: number
  read_time: number
  created_at: string
  updated_at: string | null
}

export interface GithubStats {
  username: string
  avatar_url: string
  public_repos: number
  total_stars: number
  total_forks: number
  followers: number
  top_repos: { name: string; stargazers_count: number }[]
}
