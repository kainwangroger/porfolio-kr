"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

/**
 * Galerie d'un événement, avec agrandissement au clic.
 *
 * Les photos ajoutées depuis le back-office peuvent être hébergées n'importe
 * où : `next/image` n'accepte une source distante que si son domaine est
 * déclaré dans `next.config`. On ne l'utilise donc que pour les fichiers
 * servis par le site (chemins commençant par « / ») et on retombe sur une
 * balise simple pour le reste — plutôt que d'autoriser l'optimiseur à aller
 * chercher des images sur n'importe quel domaine.
 */

function isLocal(src: string) {
  return src.startsWith("/")
}

function Photo({
  src,
  alt,
  sizes,
  priority = false,
  contain = false,
}: {
  src: string
  alt: string
  sizes: string
  priority?: boolean
  /** La visionneuse montre la photo entière ; la grille la recadre. */
  contain?: boolean
}) {
  // Les photos mélangent portrait et paysage. Dans la grille, on cadre par
  // le haut : un portrait recadré en son centre coupe les visages.
  const fit = contain ? "object-contain" : "object-cover object-top"
  if (isLocal(src)) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={fit}
      />
    )
  }
  // eslint-disable-next-line @next/next/no-img-element -- source distante non déclarée dans next.config
  return <img src={src} alt={alt} className={`absolute inset-0 h-full w-full ${fit}`} />
}

export function EventGallery({ images, title }: { images: string[]; title: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const close = useCallback(() => setOpenIndex(null), [])
  const step = useCallback(
    (delta: number) =>
      setOpenIndex((current) =>
        current === null ? null : (current + delta + images.length) % images.length
      ),
    [images.length]
  )

  useEffect(() => {
    if (openIndex === null) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close()
      if (event.key === "ArrowRight") step(1)
      if (event.key === "ArrowLeft") step(-1)
    }

    document.addEventListener("keydown", onKey)
    // Empêche la page de défiler derrière la visionneuse.
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [openIndex, close, step])

  if (images.length === 0) return null

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((src, index) => (
          <li key={src}>
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={`Agrandir la photo ${index + 1} sur ${images.length} — ${title}`}
              className="group relative block aspect-square w-full overflow-hidden rounded-lg border border-border bg-muted"
            >
              <Photo
                src={src}
                alt={`${title} — photo ${index + 1}`}
                sizes="(min-width: 1024px) 14rem, (min-width: 640px) 20vw, 45vw"
                priority={index === 0}
              />
              <span className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
            </button>
          </li>
        ))}
      </ul>

      {openIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} — photo ${openIndex + 1} sur ${images.length}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Fermer"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  step(-1)
                }}
                aria-label="Photo précédente"
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  step(1)
                }}
                aria-label="Photo suivante"
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          <figure
            className="relative max-h-full w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative mx-auto h-[70vh] w-full">
              <Photo
                src={images[openIndex]}
                alt={`${title} — photo ${openIndex + 1}`}
                sizes="(min-width: 1024px) 56rem, 100vw"
                priority
                contain
              />
            </div>
            <figcaption className="mt-3 text-center text-sm text-white/70">
              {title} — {openIndex + 1} / {images.length}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  )
}
