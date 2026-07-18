import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/**
 * Middleware Next.js — Protection des routes /admin/*
 *
 * Vérifie la présence du token JWT dans les cookies ou l'en-tête Authorization.
 * Si absent, redirige vers /admin/login.
 * Ce contrôle s'effectue côté serveur Edge — impossible à contourner via JavaScript.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Ne protège que les routes /admin (sauf la page de login elle-même)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token =
      request.cookies.get("admin_token")?.value ||
      request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      const loginUrl = new URL("/admin/login", request.url)
      // Conserve l'URL cible pour redirection post-login
      loginUrl.searchParams.set("next", pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
