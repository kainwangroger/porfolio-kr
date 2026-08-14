"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

import { adminApi } from "@/lib/admin-api"
import type { PortfolioEvent } from "@/lib/api"
import EventForm from "../EventForm"

export default function EditEvent() {
  const { slug } = useParams()
  const router = useRouter()
  const [event, setEvent] = useState<PortfolioEvent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    adminApi.events
      .get(slug as string)
      .then(setEvent)
      .catch(() => router.push("/admin/events"))
      .finally(() => setLoading(false))
  }, [slug, router])

  const handleSave = async (data: Partial<PortfolioEvent>) => {
    await adminApi.events.update(slug as string, data)
    router.push("/admin/events")
  }

  if (loading) return <p className="text-sm text-muted-foreground">Chargement...</p>
  if (!event) return null

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Modifier l&apos;événement</h1>
      <EventForm onSave={handleSave} initial={event} />
    </div>
  )
}
