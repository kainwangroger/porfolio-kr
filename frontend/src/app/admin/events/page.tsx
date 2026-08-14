"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"

import { adminApi } from "@/lib/admin-api"
import { eventImages, type PortfolioEvent } from "@/lib/api"
import { errorMessage } from "@/lib/utils"

export default function AdminEvents() {
  const [events, setEvents] = useState<PortfolioEvent[]>([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(() => {
    adminApi.events.list().then(setEvents).catch(() => {}).finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const handleDelete = async (slug: string, title: string) => {
    if (!confirm(`Supprimer « ${title} » ?`)) return
    try {
      await adminApi.events.delete(slug)
      load()
    } catch (err) {
      alert(errorMessage(err, "Suppression impossible."))
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Événements</h1>
        <Link
          href="/admin/events/new"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          + Nouvel événement
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Chargement...</p>
      ) : events.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Aucun événement. Ajoutez un hackathon, une conférence ou une école d&apos;été.
        </p>
      ) : (
        <div className="space-y-3">
          {events.map((event) => (
            <div
              key={event.slug}
              className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border bg-card p-4"
            >
              <div className="min-w-0">
                <div className="font-medium">{event.title}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">
                  {[event.period, event.location, `${eventImages(event).length} photo(s)`]
                    .filter(Boolean)
                    .join(" · ")}
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-4 text-sm">
                <span className="text-xs tabular-nums text-muted-foreground">
                  ordre {event.sort_order}
                </span>
                <Link href={`/admin/events/${event.slug}`} className="text-primary hover:underline">
                  Modifier
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(event.slug, event.title)}
                  className="text-red-500 hover:underline"
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
