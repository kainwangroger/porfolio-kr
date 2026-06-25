"use client"

import { useState } from "react"

interface Props {
  onSave: (data: any) => Promise<void>
  initial?: any
}

export default function ProjectForm({ onSave, initial }: Props) {
  const [form, setForm] = useState({
    title: initial?.title || "",
    slug: initial?.slug || "",
    description: initial?.description || "",
    content: initial?.content || "",
    tech_stack: initial?.tech_stack || "",
    image_url: initial?.image_url || "",
    github_url: initial?.github_url || "",
    demo_url: initial?.demo_url || "",
    featured: initial?.featured ?? 0,
    year: initial?.year ?? new Date().getFullYear(),
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSaving(true)
    try {
      await onSave(form)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const update = (field: string, value: any) => setForm((f) => ({ ...f, [field]: value }))

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-500">{error}</div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Titre</label>
          <input
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm"
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Slug</label>
          <input
            value={form.slug}
            onChange={(e) => update("slug", e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm"
            required
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm"
          rows={2}
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Contenu (Markdown)</label>
        <textarea
          value={form.content}
          onChange={(e) => update("content", e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm font-mono"
          rows={10}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Technologies (séparées par virgules)</label>
          <input
            value={form.tech_stack}
            onChange={(e) => update("tech_stack", e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Année</label>
          <input
            type="number"
            value={form.year}
            onChange={(e) => update("year", parseInt(e.target.value) || 2025)}
            className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium">Image URL</label>
          <input
            value={form.image_url}
            onChange={(e) => update("image_url", e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">GitHub URL</label>
          <input
            value={form.github_url}
            onChange={(e) => update("github_url", e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Demo URL</label>
          <input
            value={form.demo_url}
            onChange={(e) => update("demo_url", e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm"
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={form.featured === 1}
          onChange={(e) => update("featured", e.target.checked ? 1 : 0)}
          className="rounded border-border"
        />
        Projet à la une
      </label>

      <button
        type="submit"
        disabled={saving}
        className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
      >
        {saving ? "Enregistrement..." : "Enregistrer"}
      </button>
    </form>
  )
}
