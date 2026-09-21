import Link from "next/link"

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-6 px-4 py-24 text-center">
      <p className="font-mono text-sm tracking-widest text-muted-foreground">ERREUR 404</p>
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Cette page n&apos;existe pas</h1>
      <p className="text-muted-foreground">
        Le lien est peut-être obsolète, ou le projet a été renommé.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-lg border border-primary bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Voir tous les projets
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-muted"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  )
}
