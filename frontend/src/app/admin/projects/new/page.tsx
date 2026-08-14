"use client"

import { useRouter } from "next/navigation"
import { adminApi } from "@/lib/admin-api"
import ProjectForm from "../ProjectForm"
import type { Project } from "@/lib/api"

export default function NewProject() {
  const router = useRouter()

  const handleSave = async (data: Partial<Project>) => {
    await adminApi.projects.create(data)
    router.push("/admin/projects")
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Nouveau projet</h1>
      <ProjectForm onSave={handleSave} />
    </div>
  )
}
