"use client"

import { useEffect, useState } from "react"
import { Mail, User, Clock, MessageSquare } from "lucide-react"
import { adminApi } from "@/lib/admin-api"

export default function AdminMessages() {
  const [messages, setMessages] = useState<any[]>([])

  useEffect(() => {
    adminApi.messages.list().then(setMessages).catch(() => {})
  }, [])

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold">Messages</h1>
      {messages.length === 0 && (
        <p className="text-sm text-muted-foreground">Aucun message pour le moment.</p>
      )}
      <div className="space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="rounded-lg border border-border bg-card p-6">
            <div className="mb-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {msg.name}
              </span>
              <span className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                {msg.email}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {new Date(msg.created_at).toLocaleDateString("fr-FR")}
              </span>
            </div>
            <p className="text-sm leading-relaxed">{msg.message}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
