"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"

const navItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "Projets", href: "/admin/projects" },
  { label: "Compétences", href: "/admin/skills" },
  { label: "Messages", href: "/admin/messages" },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [ready, setReady] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const token = localStorage.getItem("admin_token")
    if (!token && pathname !== "/admin/login") {
      router.replace("/admin/login")
    } else {
      setAuthenticated(!!token)
    }
    setReady(true)
  }, [pathname, router])

  if (!ready) return null

  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  if (!authenticated) return null

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl px-4 py-8">
      <aside className="mr-8 w-56 shrink-0">
        <div className="mb-6 text-lg font-bold">Backoffice</div>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-4 py-2 text-sm transition-colors ${
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={() => {
              localStorage.removeItem("admin_token")
              router.replace("/admin/login")
            }}
            className="mt-4 rounded-lg px-4 py-2 text-left text-sm text-red-500 hover:bg-muted"
          >
            Déconnexion
          </button>
        </nav>
      </aside>
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  )
}
