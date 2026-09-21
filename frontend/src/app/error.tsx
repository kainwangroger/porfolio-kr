"use client"

import { useEffect } from "react"
import Link from "next/link"
import { RefreshCw } from "lucide-react"

/**
 * Panne côté données.
 *
 * Auparavant, chaque page avalait l'exception et retombait sur une liste vide —
 * le site annonçait alors « Aucun projet pour le moment », ce qui laissait
 * croire au visiteur que ce développeur n'a rien réalisé. Un contenu
 * indisponible et un contenu inexistant sont deux choses différentes, et le
 * visiteur a droit à la distinction.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-6 px-4 py-24 text-center">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        Ce contenu est momentanément indisponible
      </h1>
      <p className="text-muted-foreground">
        Le serveur qui héberge les données ne répond pas. C&apos;est passager : il se met en
        veille après une période d&apos;inactivité et redémarre en quelques secondes.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-lg border border-primary bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <RefreshCw className="h-4 w-4" />
          Réessayer
        </button>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-muted"
        >
          Me contacter directement
        </Link>
      </div>
    </div>
  )
}
