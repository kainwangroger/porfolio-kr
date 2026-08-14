"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { cn } from "@/lib/utils"

/**
 * L'accueil était étiqueté « À propos » — un libellé qui décrivait une page
 * inexistante et privait le site d'une entrée « Accueil ». Le blog est retiré
 * du menu tant qu'aucun article n'est publié : mettre en avant une section
 * vide souligne l'absence au lieu de la couvrir. La page reste accessible par
 * son URL, il suffit de remettre la ligne le jour venu.
 */
const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/about", label: "Parcours" },
  { href: "/projects", label: "Projets" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="group flex items-center gap-3 transition-opacity hover:opacity-95">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 text-white font-extrabold text-xs shadow-sm transition-transform group-hover:scale-105">
            KR
          </div>
          <div className="flex flex-col">
            <span className="text-base font-extrabold tracking-tight text-foreground transition-colors group-hover:text-primary leading-tight">
              KAINWANG Roger
            </span>
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest leading-none">
              Portfolio Data &amp; IA
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === link.href
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <MobileMenu pathname={pathname} />
        </div>
      </div>
    </header>
  )
}

function MobileMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-muted"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={open}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {open && (
        <nav className="absolute right-0 top-12 w-48 rounded-lg border border-border bg-background p-2 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "block rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-muted",
                pathname === link.href ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  )
}
