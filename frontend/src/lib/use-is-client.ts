"use client"

import { useSyncExternalStore } from "react"

/** Aucun changement à notifier : la valeur bascule une fois, à l'hydratation. */
const subscribe = () => () => {}

/**
 * `false` pendant le rendu serveur, `true` une fois hydraté.
 *
 * Remplace le motif `useState(false)` + `useEffect(() => setMounted(true))`,
 * qui déclenche un rendu en cascade et que le lint React signale à juste
 * titre. Ici la valeur vient directement du moteur de rendu.
 */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  )
}
