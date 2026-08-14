import Image from "next/image"

import { HeroActions } from "./CvDownloadButton"
import { RotatingRole } from "./RotatingRole"

/**
 * Hero de la page d'accueil — composant serveur.
 *
 * L'animation d'entrée passait auparavant par Framer Motion, dont l'état
 * `initial` est sérialisé dans le HTML : le `h1` partait en `opacity:0` et
 * n'apparaissait qu'une fois JavaScript chargé. Elle est maintenant portée par
 * des animations CSS (`.animate-rise`), qui se jouent dès le premier rendu et
 * laissent le texte lisible même si le script échoue.
 */
export function Hero() {
  return (
    <section className="relative mb-24 overflow-hidden py-4">
      {/* Halos de lumière d'arrière-plan */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/15" />
      <div className="pointer-events-none absolute right-0 top-1/2 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl dark:bg-purple-500/15" />

      <div className="flex flex-col gap-12 md:flex-row md:items-center md:justify-between">
        <div className="animate-rise flex-1 space-y-6">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="block text-foreground">Data Engineer</span>
            <span className="mt-1 block bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-300 dark:to-cyan-300">
              &amp; Data Scientist
            </span>
          </h1>

          <div className="flex h-7 items-center gap-2 overflow-hidden text-sm font-medium text-muted-foreground">
            <span className="shrink-0 font-semibold text-primary">Spécialisé en :</span>
            <RotatingRole />
          </div>

          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Je conçois des pipelines de données robustes et des solutions ML scalables avec
            Python, SQL, Spark, Kafka et les environnements cloud. Passionné par la performance,
            l&apos;architecture et la valorisation de la donnée.
          </p>

          <HeroActions />
        </div>

        <div className="animate-rise animate-delay-200 w-full shrink-0 sm:mx-auto sm:max-w-xs md:mx-0 md:w-72 lg:w-80">
          <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-border bg-muted shadow-md transition-all duration-500 hover:border-primary hover:shadow-xl">
            <Image
              src="/photo_roger.jpg"
              alt="Portrait de KAINWANG Roger"
              width={400}
              height={533}
              priority
              sizes="(min-width: 1024px) 20rem, (min-width: 768px) 18rem, 100vw"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        </div>
      </div>
    </section>
  )
}
