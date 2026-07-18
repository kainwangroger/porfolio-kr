"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Download } from "lucide-react"
import { api } from "@/lib/api"

export function Hero() {
  const [cvError, setCvError] = useState<string | null>(null)

  const handleDownload = async () => {
    setCvError(null)
    try {
      await api.stats.cvDownload()
    } catch {}
    // Vérifie que le fichier existe avant de lancer le téléchargement
    const check = await fetch("/cv_kainwang_linkedin.pdf", { method: "HEAD" })
    if (!check.ok) {
      setCvError("Le CV n'est pas encore disponible. Contactez-moi directement.")
      return
    }
    const a = document.createElement("a")
    a.href = "/cv_kainwang_linkedin.pdf"
    a.download = "CV_KainwangRoger.pdf"
    a.click()
  }

  return (
    <section className="mb-32">
      <div className="flex flex-col gap-12 md:flex-row md:items-center md:justify-between">
        {/* Colonne de gauche: Textes et Actions */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 space-y-6"
        >
          <p className="text-sm font-medium text-primary">Bonjour, je suis</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Data Engineer
            <br />
            <span className="text-primary">& Data Scientist</span>
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Je conçois des pipelines de données et des solutions ML avec Python,
            SQL et le cloud. Passionné par la donnée, la performance et l&apos;analytics.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              onClick={handleDownload}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-95 shadow-sm hover:shadow"
            >
              <Download className="h-4 w-4" />
              Télécharger le CV
            </button>
          </div>
          {cvError && (
            <p className="text-sm text-red-500">{cvError}</p>
          )}
        </motion.div>

        {/* Colonne de droite: Photo de profil */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="w-full shrink-0 sm:mx-auto sm:max-w-xs md:mx-0 md:w-72 lg:w-80"
        >
          <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-border bg-muted shadow-md transition-all duration-300 hover:border-primary hover:shadow-lg">
            <img
              src="/photo_roger.jpg" // Remplacer par l'URL définitive de la photo
              alt="KAINWANG Roger"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-103"
              onError={(e) => {
                // Image de secours si le lien n'est pas encore chargé
                e.currentTarget.src = "https://placehold.co/400x533/1e293b/94a3b8?text=KAINWANG+Roger"
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

