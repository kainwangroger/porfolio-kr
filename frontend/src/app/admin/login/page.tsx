"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { adminApi } from "@/lib/admin-api"
import { errorMessage } from "@/lib/utils"

export default function AdminLogin() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const res = await adminApi.login(username, password)
      // Stockage localStorage pour la compatibilité avec l'admin-api client
      localStorage.setItem("admin_token", res.access_token)
      // Stockage cookie pour le middleware Next.js (protection côté serveur)
      const maxAge = 60 * 60 * 24 // 24h
      document.cookie = `admin_token=${res.access_token}; path=/; max-age=${maxAge}; SameSite=Strict`
      const params = new URLSearchParams(window.location.search)
      const next = params.get("next") || "/admin"
      router.replace(next)
    } catch (err) {
      setError(errorMessage(err, "Erreur de connexion"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 rounded-lg border border-border bg-card p-8"
      >
        <h1 className="text-xl font-bold">Connexion</h1>

        {error && (
          <div className="rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-500">
            {error}
          </div>
        )}

        <div>
          <label className="mb-1 block text-sm font-medium">Identifiant</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </div>
  )
}
