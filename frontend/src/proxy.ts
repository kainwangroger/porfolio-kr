import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/**
 * Proxy Next.js — redirection des routes /admin/* vers la page de connexion.
 *
 * Ce contrôle ne vérifie que la *présence* d'un jeton, jamais sa signature :
 * poser un cookie `admin_token` bidon suffit à le franchir. Il s'agit d'un
 * confort de navigation, pas d'une protection — la sécurité réelle est
 * appliquée par l'API, qui valide le JWT sur chaque route authentifiée.
 *
 * Un commentaire affirmait ici l'inverse. Pour que ce soit une vraie barrière,
 * il faudrait vérifier la signature (`jose` fonctionne en runtime Edge) et
 * poser le cookie en HttpOnly ; c'est suivi comme constat SEC-03 dans l'audit
 * backend.
 */
export default function proxy(request: NextRequest) {
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
