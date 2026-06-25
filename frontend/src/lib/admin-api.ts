"use client"

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

export const adminApi = {
  login: (username: string, password: string) =>
    fetcher<{ access_token: string; token_type: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }),
  projects: {
    list: () => fetcher<any[]>("/projects"),
    get: (slug: string) => fetcher<any>(`/projects/${slug}`),
    create: (data: any) =>
      fetcher<any>("/projects", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (slug: string, data: any) =>
      fetcher<any>(`/projects/${slug}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    delete: (slug: string) =>
      fetcher<void>(`/projects/${slug}`, { method: "DELETE" }),
  },
  blog: {
    list: () => fetcher<any[]>("/blog/all"),
    get: (slug: string) => fetcher<any>(`/blog/${slug}`),
    create: (data: any) =>
      fetcher<any>("/blog", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (slug: string, data: any) =>
      fetcher<any>(`/blog/${slug}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    delete: (slug: string) =>
      fetcher<void>(`/blog/${slug}`, { method: "DELETE" }),
  },
  skills: {
    list: () => fetcher<any[]>("/skills"),
    create: (data: any) =>
      fetcher<any>("/skills", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: number, data: any) =>
      fetcher<any>(`/skills/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    delete: (id: number) =>
      fetcher<void>(`/skills/${id}`, { method: "DELETE" }),
  },
  messages: {
    list: () => fetcher<any[]>("/contact"),
  },
  stats: {
    all: () => fetcher<{ page_visits: number; cv_downloads: number; unread_messages: number }>("/stats/all"),
  },
}
