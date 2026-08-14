"use client"

import { useState } from "react"

import type { PortfolioEvent } from "@/lib/api"
import { errorMessage } from "@/lib/utils"

type EventFormValues = Pick<
  PortfolioEvent,
  | "title"
  | "slug"
  | "organizer"
  | "location"
  | "period"
  | "role"
  | "description"
  | "images"
  | "link_url"
  | "sort_order"
>

interface Props {
  onSave: (data: EventFormValues) => Promise<void>
  initial?: Partial<PortfolioEvent>
}

/** Transforme un titre en slug utilisable dans une URL. */
function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

const inputClass =
  "w-full rounded-lg border border-border bg-background px-4 py-2 text-sm transition-colors focus:border-primary focus:outline-none"

export default function EventForm({ onSave, initial }: Props) {
  const [form, setForm] = useState<EventFormValues>({
    title: initial?.title || "",
    slug: initial?.slug || "",
    organizer: initial?.organizer || "",
    location: initial?.location || "",
    period: initial?.period || "",
    role: initial?.role || "",
    description: initial?.description || "",
    images: initial?.images || "",
    link_url: initial?.link_url || "",
    sort_order: initial?.sort_order ?? 0,
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  const isEdit = Boolean(initial?.slug)

  const update = <K extends keyof EventFormValues>(field: K, value: EventFormValues[K]) =>
    setForm((f) => ({ ...f, [field]: value }))

  const handleTitleChange = (value: string) => {
    setForm((f) => ({
      ...f,
      title: value,
      // À la création seulement : une fois publié, changer le slug casserait
      // les liens existants.
      slug: isEdit ? f.slug : slugify(value),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSaving(true)
    try {
      await onSave(form)
    } catch (err) {
      setError(errorMessage(err, "Enregistrement impossible."))
    } finally {
      setSaving(false)
    }
  }

  const photoCount = form.images.split(/\r?\n/).filter((line) => line.trim()).length

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-5">
      {error && (
        <div role="alert" className="rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-500">
          {error}
        </div>
      )}

      <Field label="Titre" htmlFor="title">
        <input
          id="title"
          required
          value={form.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="HSIL Hackathon — Global Health Systems"
          className={inputClass}
        />
      </Field>

      <Field
        label="Slug"
        htmlFor="slug"
        hint={isEdit ? "Modifier le slug casse les liens déjà partagés." : "Généré depuis le titre."}
      >
        <input
          id="slug"
          required
          value={form.slug}
          onChange={(e) => update("slug", e.target.value)}
          placeholder="hsil-hackathon-accra-2026"
          className={inputClass}
        />
      </Field>

      <Field label="Organisateur" htmlFor="organizer">
        <input
          id="organizer"
          value={form.organizer}
          onChange={(e) => update("organizer", e.target.value)}
          placeholder="Harvard T.H. Chan School of Public Health"
          className={inputClass}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Lieu" htmlFor="location">
          <input
            id="location"
            value={form.location}
            onChange={(e) => update("location", e.target.value)}
            placeholder="Accra, Ghana"
            className={inputClass}
          />
        </Field>

        <Field label="Période" htmlFor="period">
          <input
            id="period"
            value={form.period}
            onChange={(e) => update("period", e.target.value)}
            placeholder="Avril 2026"
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Votre rôle" htmlFor="role">
        <input
          id="role"
          value={form.role}
          onChange={(e) => update("role", e.target.value)}
          placeholder="Participant — équipe Togo AI Lab"
          className={inputClass}
        />
      </Field>

      <Field
        label="Description"
        htmlFor="description"
        hint="Une ligne vide sépare deux paragraphes."
      >
        <textarea
          id="description"
          rows={7}
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          placeholder="Ce que vous y avez fait, ce que votre équipe a présenté, ce que ça a produit."
          className={`${inputClass} resize-y`}
        />
      </Field>

      <Field
        label="Photos"
        htmlFor="images"
        hint={`Une URL par ligne. Un fichier déposé dans public/events/ s'écrit « /events/photo.jpg ». ${photoCount} photo(s).`}
      >
        <textarea
          id="images"
          rows={5}
          value={form.images}
          onChange={(e) => update("images", e.target.value)}
          placeholder={"/events/hackathon-1.jpg\n/events/hackathon-2.jpg"}
          className={`${inputClass} resize-y font-mono text-xs`}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Lien externe" htmlFor="link_url">
          <input
            id="link_url"
            type="url"
            value={form.link_url}
            onChange={(e) => update("link_url", e.target.value)}
            placeholder="https://exemple.org/hackathon"
            className={inputClass}
          />
        </Field>

        <Field label="Ordre d'affichage" htmlFor="sort_order" hint="Le plus grand passe en premier.">
          <input
            id="sort_order"
            type="number"
            value={form.sort_order}
            onChange={(e) => update("sort_order", Number(e.target.value))}
            className={inputClass}
          />
        </Field>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {saving ? "Enregistrement..." : "Enregistrer"}
      </button>
    </form>
  )
}

function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string
  htmlFor: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}
