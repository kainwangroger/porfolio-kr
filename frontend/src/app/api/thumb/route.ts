import { renderProjectThumb } from "@/lib/project-image"
import { DOMAINS, type DomainId } from "@/lib/project-domain"

/**
 * Vignette SVG d'un projet.
 *
 * Le SVG était auparavant encodé en data-URI dans le HTML, dupliqué par la
 * charge utile RSC. Le servir ici le sort du document : le navigateur le met
 * en cache et le mutualise entre les pages.
 *
 * La réponse ne dépend que de la requête, jamais de la base : rien à
 * invalider, et le cache peut être long.
 */

const MAX_TITLE_LENGTH = 120

export function GET(request: Request) {
  const params = new URL(request.url).searchParams

  const title = (params.get("t") ?? "Projet").slice(0, MAX_TITLE_LENGTH)
  const requested = params.get("d") ?? ""
  const domain: DomainId = requested in DOMAINS ? (requested as DomainId) : "data"

  return new Response(renderProjectThumb(title, domain), {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  })
}
