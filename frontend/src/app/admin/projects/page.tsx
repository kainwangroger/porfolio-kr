"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { adminApi } from "@/lib/admin-api"

export default function AdminProjects() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    adminApi.projects.list().then(setProjects).catch(() => {}).finally(() => setLoading(false))
  }

  useEffect(load, [])

  const handleDelete = async (slug: string) => {
    if (!confirm("Supprimer ce projet ?")) return
    try {
      await adminApi.projects.delete(slug)
      load()
    } catch (err: any) {
      alert(err.message)
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projets</h1>
        <Link
          href="/admin/projects/new"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          + Nouveau projet
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Chargement...</p>
      ) : projects.length === 0 ? (
        <p className="text-sm text-muted-foreground">Aucun projet.</p>
      ) : (
        <div className="space-y-3">
          {projects.map((p) => (
            <div
              key={p.slug}
              className="flex items-center justify-between rounded-lg border border-border bg-card p-4"
            >
              <div>
                <div className="font-medium">{p.title}</div>
                <div className="text-sm text-muted-foreground">{p.slug}</div>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/admin/projects/${p.slug}`}
                  className="rounded-md px-3 py-1 text-sm hover:bg-muted"
                >
                  Modifier
                </Link>
                <button
                  onClick={() => handleDelete(p.slug)}
                  className="rounded-md px-3 py-1 text-sm text-red-500 hover:bg-muted"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
