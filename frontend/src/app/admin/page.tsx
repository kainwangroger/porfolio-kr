"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Eye, Download, MessageSquare, FolderKanban, Code2 } from "lucide-react"
import { adminApi } from "@/lib/admin-api"

export default function AdminDashboard() {
  const [stats, setStats] = useState({ projects: 0, skills: 0, page_visits: 0, cv_downloads: 0, unread_messages: 0 })

  useEffect(() => {
    Promise.all([
      adminApi.projects.list().then((d) => d.length).catch(() => 0),
      adminApi.skills.list().then((d) => d.length).catch(() => 0),
      adminApi.stats.all().catch(() => ({ page_visits: 0, cv_downloads: 0, unread_messages: 0 })),
    ]).then(([projects, skills, siteStats]) => {
      setStats({ projects, skills, ...siteStats })
    })
  }, [])

  // `href: null` = indicateur de lecture seule. Ces cartes avaient un style de
  // survol qui les faisait passer pour cliquables sans mener nulle part.
  const cards = [
    { label: "Projets", value: stats.projects, href: "/admin/projects", icon: FolderKanban },
    { label: "Compétences", value: stats.skills, href: "/admin/skills", icon: Code2 },
    { label: "Visites", value: stats.page_visits, href: null, icon: Eye },
    { label: "CV téléchargés", value: stats.cv_downloads, href: null, icon: Download },
    { label: "Messages non lus", value: stats.unread_messages, href: "/admin/messages", icon: MessageSquare },
  ]

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold">Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon
          const content = (
            <div
              className={`h-full rounded-lg border border-border bg-card p-6 ${
                card.href ? "transition-colors hover:border-primary" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold tabular-nums">{card.value}</div>
                <Icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{card.label}</div>
            </div>
          )
          if (!card.href) return <div key={card.label}>{content}</div>
          return (
            <Link key={card.label} href={card.href}>
              {content}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
