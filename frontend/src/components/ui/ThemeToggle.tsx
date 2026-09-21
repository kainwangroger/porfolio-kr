"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/Button"
import { useIsClient } from "@/lib/use-is-client"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const isClient = useIsClient()

  // Le thème résolu n'est connu qu'après hydratation : on réserve la place
  // pour éviter que la barre de navigation ne bouge à l'affichage de l'icône.
  if (!isClient) {
    return <div className="h-10 w-10" aria-hidden="true" />
  }

  const isDark = resolvedTheme === "dark"

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Passer au thème clair" : "Passer au thème sombre"}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
  )
}
