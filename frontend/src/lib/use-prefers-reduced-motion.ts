"use client"

import { useSyncExternalStore } from "react"

const QUERY = "(prefers-reduced-motion: reduce)"

function subscribe(onChange: () => void): () => void {
  const media = window.matchMedia(QUERY)
  media.addEventListener("change", onChange)
  return () => media.removeEventListener("change", onChange)
}

/**
 * Préférence système « animations réduites ».
 *
 * `useSyncExternalStore` plutôt qu'un `useEffect` + `setState` : la valeur est
 * lue depuis le système, sans rendu supplémentaire, et elle suit les
 * changements de réglage en cours de session.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false // côté serveur, on suppose l'animation permise
  )
}
