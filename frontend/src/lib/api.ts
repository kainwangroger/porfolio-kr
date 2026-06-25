const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"

async function fetcher<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
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
