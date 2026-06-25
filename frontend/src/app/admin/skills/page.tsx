"use client"

import { useEffect, useState } from "react"
import { adminApi } from "@/lib/admin-api"

export default function AdminSkills() {
  const [skills, setSkills] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ category: "", name: "" })
  const [error, setError] = useState("")

  const load = () => {
    setLoading(true)
    adminApi.skills.list().then(setSkills).catch(() => {}).finally(() => setLoading(false))
  }

  useEffect(load, [])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!form.category.trim() || !form.name.trim()) {
      setError("Les deux champs sont requis")
      return
    }
    try {
      await adminApi.skills.create({ category: form.category.trim(), name: form.name.trim() })
      setForm({ category: "", name: "" })
      load()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer cette compétence ?")) return
    try {
      await adminApi.skills.delete(id)
      load()
    } catch (err: any) {
      alert(err.message)
    }
  }

  const grouped: Record<string, any[]> = {}
  for (const s of skills) {
    if (!grouped[s.category]) grouped[s.category] = []
    grouped[s.category].push(s)
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Compétences</h1>

      <form onSubmit={handleAdd} className="mb-8 flex flex-wrap items-end gap-3">
        <div>
          <label className="mb-1 block text-sm font-medium">Catégorie</label>
          <input
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            className="w-48 rounded-lg border border-border bg-background px-4 py-2 text-sm"
            placeholder="Data Engineering"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Nom</label>
          <input
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="w-48 rounded-lg border border-border bg-background px-4 py-2 text-sm"
            placeholder="Python"
          />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          Ajouter
        </button>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>

      {loading ? (
        <p className="text-sm text-muted-foreground">Chargement...</p>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <h3 className="mb-2 text-sm font-medium text-primary">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((s) => (
                  <span
                    key={s.id}
                    className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1 text-sm"
                  >
                    {s.name}
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          ))}
          {skills.length === 0 && (
            <p className="text-sm text-muted-foreground">Aucune compétence.</p>
          )}
        </div>
      )}
    </div>
  )
}
