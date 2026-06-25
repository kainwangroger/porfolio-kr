"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { adminApi } from "@/lib/admin-api"
import ProjectForm from "../ProjectForm"

export default function EditProject() {
  const { slug } = useParams()
  const router = useRouter()
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    adminApi.projects.get(slug as string).then(setProject).catch(() => router.push("/admin/projects")).finally(() => setLoading(false))
  }, [slug, router])

  const handleSave = async (data: any) => {
    await adminApi.projects.update(slug as string, data)
    router.push("/admin/projects")
  }

  if (loading) return <p className="text-sm text-muted-foreground">Chargement...</p>
  if (!project) return null

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Modifier le projet</h1>
      <ProjectForm onSave={handleSave} initial={project} />
    </div>
  )
}
