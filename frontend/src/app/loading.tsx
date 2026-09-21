/**
 * Squelette affiché pendant la récupération des données côté serveur.
 *
 * Le backend gratuit se met en veille et met plusieurs secondes à répondre au
 * premier appel. Sans cet écran, la navigation semblait figée.
 */
export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl animate-pulse px-4 py-12 sm:py-20" aria-busy="true">
      <span className="sr-only">Chargement du contenu…</span>
      <div className="mb-4 h-10 w-64 rounded bg-muted" />
      <div className="mb-12 h-5 w-80 rounded bg-muted" />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-lg border border-border bg-card">
            <div className="aspect-video w-full bg-muted" />
            <div className="space-y-3 p-5">
              <div className="h-4 w-20 rounded bg-muted" />
              <div className="h-5 w-3/4 rounded bg-muted" />
              <div className="h-4 w-full rounded bg-muted" />
              <div className="h-4 w-5/6 rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
