"use client"

import { motion } from "framer-motion"
import { Download } from "lucide-react"
import { api } from "@/lib/api"

export function Hero() {
  const handleDownload = async () => {
    try {
      await api.stats.cvDownload()
    } catch {}
    const a = document.createElement("a")
    a.href = "/CV_KainwangRoger -master.pdf"
    a.download = "CV_KainwangRoger.pdf"
    a.click()
  }

  return (
    <section className="mb-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        <p className="text-sm font-medium text-primary">Bonjour, je suis</p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Data Engineer
          <br />
          <span className="text-primary">& Data Scientist</span>
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Je conçois des pipelines de données et des solutions ML avec Python,
          SQL et le cloud. Passionné par la donnée, la performance et l&apos;analytics.
        </p>
        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-2 rounded-lg border border-primary bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
        >
          <Download className="h-4 w-4" />
          Télécharger le CV
        </button>
      </motion.div>
    </section>
  )
}
