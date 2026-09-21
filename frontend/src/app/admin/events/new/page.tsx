"use client"

import { useRouter } from "next/navigation"

import { adminApi } from "@/lib/admin-api"
import type { PortfolioEvent } from "@/lib/api"
import EventForm from "../EventForm"

export default function NewEvent() {
  const router = useRouter()

  const handleSave = async (data: Partial<PortfolioEvent>) => {
    await adminApi.events.create(data)
    router.push("/admin/events")
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Nouvel événement</h1>
      <EventForm onSave={handleSave} />
    </div>
  )
}
