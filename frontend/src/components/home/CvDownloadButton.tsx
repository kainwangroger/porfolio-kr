"use client"

import { useState } from "react"
import Link from "next/link"
import { Download } from "lucide-react"

import { api } from "@/lib/api"

const CV_PATH = "/cv_kainwang_linkedin.pdf"

/**
 * Actions du hero : téléchargement du CV et lien de contact.
 *
 * L'existence du fichier est vérifiée *avant* de comptabiliser le
 * téléchargement : l'ordre inverse gonflait la statistique de tentatives qui
 * n'aboutissaient pas.
 */
export function HeroActions() {
  const [error, setError] = useState<string | null>(null)

  const handleDownload = async () => {
    setError(null)

    let available = false
    try {
      const head = await fetch(CV_PATH, { method: "HEAD" })
      available = head.ok
    } catch {
      available = false
    }

    if (!available) {
      setError("Le CV n'est pas encore disponible. Contactez-moi directement.")
      return
    }

    api.stats.cvDownload().catch(() => {})

    const link = document.createElement("a")
    link.href = CV_PATH
    link.download = "CV_KainwangRoger.pdf"
    link.click()
  }

  return (
    <div className="space-y-3 pt-2">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={handleDownload}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90 hover:shadow-lg active:scale-95"
        >
          <Download className="h-4 w-4" />
          Télécharger le CV
        </button>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
        >
          Me contacter
        </Link>
      </div>
      {error && (
        <p role="alert" className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}
