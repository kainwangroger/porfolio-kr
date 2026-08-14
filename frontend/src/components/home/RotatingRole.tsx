"use client"

import { useEffect, useState } from "react"

import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion"

const ROTATING_ROLES = [
  "Pipelines Big Data & Streaming",
  "Modélisation Machine Learning & IA",
  "Architecture Cloud & MLOps",
  "Visualisation & Analytics",
]

/**
 * Spécialité qui défile.
 *
 * Le premier libellé est rendu tel quel côté serveur : sans JavaScript, le
 * visiteur voit une spécialité au lieu d'un vide, et la rotation n'est qu'un
 * agrément. Le rendu initial est identique à celui du serveur, il n'y a donc
 * pas d'écart d'hydratation.
 */
export function RotatingRole() {
  const [index, setIndex] = useState(0)
  const [fading, setFading] = useState(false)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (reducedMotion) return

    const timer = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % ROTATING_ROLES.length)
        setFading(false)
      }, 250)
    }, 3500)

    return () => clearInterval(timer)
  }, [reducedMotion])

  return (
    <span
      className={`font-semibold text-foreground underline decoration-primary/50 decoration-2 underline-offset-4 transition-opacity duration-200 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      {ROTATING_ROLES[index]}
    </span>
  )
}
