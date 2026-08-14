"use client"

import type { BlogPost, PortfolioEvent, Project, Skill } from "./api"

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001/api/v1"

function getHeaders() {
  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

async function fetcher<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: getHeaders(),
    ...options,
  })
  if (res.status === 401 && typeof window !== "undefined") {
    localStorage.removeItem("admin_token")
    window.location.href = "/admin/login"
    throw new Error("Unauthorized")
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }))
    throw new Error(err.detail || "API error")
  }
  if (res.status === 204) return undefined as T
  return res.json()
}

/** Champs modifiables d'une entité : tout sauf ce que le serveur génère. */
type Writable<T> = Partial<Omit<T, "id" | "created_at" | "updated_at">>

export interface ContactMessage {
  id: number
  name: string
  email: string
  message: string
  read: boolean
  created_at: string
}

export interface AdminStats {
  page_visits: number
  cv_downloads: number
  unread_messages: number
}

export const adminApi = {
  login: (username: string, password: string) =>
    fetcher<{ access_token: string; token_type: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }),
  projects: {
    list: () => fetcher<Project[]>("/projects"),
    get: (slug: string) => fetcher<Project>(`/projects/${slug}`),
    create: (data: Writable<Project>) =>
      fetcher<Project>("/projects", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (slug: string, data: Writable<Project>) =>
      fetcher<Project>(`/projects/${slug}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    delete: (slug: string) => fetcher<void>(`/projects/${slug}`, { method: "DELETE" }),
  },
  blog: {
    list: () => fetcher<BlogPost[]>("/blog/all"),
    get: (slug: string) => fetcher<BlogPost>(`/blog/${slug}`),
    create: (data: Writable<BlogPost>) =>
      fetcher<BlogPost>("/blog", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (slug: string, data: Writable<BlogPost>) =>
      fetcher<BlogPost>(`/blog/${slug}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    delete: (slug: string) => fetcher<void>(`/blog/${slug}`, { method: "DELETE" }),
  },
  events: {
    list: () => fetcher<PortfolioEvent[]>("/events"),
    get: (slug: string) => fetcher<PortfolioEvent>(`/events/${slug}`),
    create: (data: Writable<PortfolioEvent>) =>
      fetcher<PortfolioEvent>("/events", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (slug: string, data: Writable<PortfolioEvent>) =>
      fetcher<PortfolioEvent>(`/events/${slug}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    delete: (slug: string) => fetcher<void>(`/events/${slug}`, { method: "DELETE" }),
  },
  skills: {
    list: () => fetcher<Skill[]>("/skills"),
    create: (data: Writable<Skill>) =>
      fetcher<Skill>("/skills", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: number, data: Writable<Skill>) =>
      fetcher<Skill>(`/skills/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    delete: (id: number) => fetcher<void>(`/skills/${id}`, { method: "DELETE" }),
  },
  messages: {
    list: () => fetcher<ContactMessage[]>("/contact"),
  },
  stats: {
    all: () => fetcher<AdminStats>("/stats/all"),
  },
}
