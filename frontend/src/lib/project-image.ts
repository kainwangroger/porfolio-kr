/**
 * project-image.ts
 *
 * Vignettes SVG générées pour les cartes de projets, sans dépendance externe.
 *
 * Ces vignettes étaient auparavant encodées en data-URI directement dans
 * l'attribut `src`. Next sérialisant une seconde fois chaque attribut dans la
 * charge utile RSC, la page /projects transportait 206 Ko de balisage SVG
 * quasi identique — 64 % de son poids. Le SVG est désormais servi par
 * `/api/thumb`, mis en cache par le navigateur, et le HTML ne porte plus
 * qu'une URL courte.
 */

import { DOMAINS, projectDomain, type DomainId } from "./project-domain"

export function cleanProjectTitle(title: string): string {
  if (!title) return ""

  // 1. Supprimer les chiffres/numéros au début (ex: "01-", "10_", "04. ", "02 - ")
  let cleaned = title.replace(/^\d+[\s\-_.]*/, "")

  // 2. Remplacer les tirets et underscores par des espaces
  cleaned = cleaned.replace(/[_-]+/g, " ").trim()

  // 3. Formater la casse et préserver les acronymes techniques courants
  const acronyms: Record<string, string> = {
    ml: "ML",
    ai: "AI",
    iot: "IoT",
    llm: "LLM",
    rag: "RAG",
    cnn: "CNN",
    ocr: "OCR",
    yolo: "YOLO",
    bert: "BERT",
    cdc: "CDC",
    api: "API",
    rlhf: "RLHF",
    mlops: "MLOps",
    finops: "FinOps",
    h3: "H3",
    prdiction: "Prediction",
    prediction: "Prediction",
    rul: "RUL",
    qdrant: "Qdrant",
    clip: "CLIP",
  }

  return cleaned
    .split(/\s+/)
    .map((word) => {
      const lower = word.toLowerCase()
      if (acronyms[lower]) return acronyms[lower]
      if (word === word.toLowerCase()) {
        return word.charAt(0).toUpperCase() + word.slice(1)
      }
      return word
    })
    .join(" ")
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;"
      case ">":
        return "&gt;"
      case "&":
        return "&amp;"
      case "'":
        return "&apos;"
      case '"':
        return "&quot;"
      default:
        return c
    }
  })
}

/** Dimensions de la vignette, reprises telles quelles par les `<img>`. */
export const THUMB_WIDTH = 800
export const THUMB_HEIGHT = 450

/**
 * Rend la vignette. Appelé côté serveur par la route `/api/thumb`, jamais
 * pendant le rendu d'une page.
 */
export function renderProjectThumb(title: string, domainId: DomainId): string {
  const domain = DOMAINS[domainId] ?? DOMAINS.data
  const titleClean = cleanProjectTitle(title)

  // Découper le titre en 1 ou 2 lignes si nécessaire
  const words = titleClean.split(" ")
  let line1 = titleClean
  let line2 = ""

  if (titleClean.length > 22 && words.length > 2) {
    const mid = Math.ceil(words.length / 2)
    line1 = words.slice(0, mid).join(" ")
    line2 = words.slice(mid).join(" ")
  }

  const accent = domain.accent

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${THUMB_WIDTH}" height="${THUMB_HEIGHT}" viewBox="0 0 ${THUMB_WIDTH} ${THUMB_HEIGHT}" role="img" aria-label="${escapeXml(titleClean)}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0b0f19"/>
      <stop offset="50%" stop-color="#111827"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <linearGradient id="cardBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1e293b" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#0f172a" stop-opacity="0.95"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.35"/>
      <stop offset="50%" stop-color="${accent}"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0.35"/>
    </linearGradient>
    <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
      <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#334155" stroke-width="0.5" stroke-opacity="0.25"/>
    </pattern>
  </defs>

  <rect width="100%" height="100%" fill="url(#bg)"/>
  <rect width="100%" height="100%" fill="url(#grid)"/>

  <circle cx="150" cy="100" r="160" fill="${accent}" opacity="0.10"/>
  <circle cx="650" cy="350" r="160" fill="${accent}" opacity="0.07"/>

  <rect x="70" y="65" width="660" height="320" rx="16" fill="url(#cardBg)" stroke="#334155" stroke-width="1"/>
  <rect x="70" y="65" width="660" height="4" fill="url(#accent)" rx="2"/>

  <g transform="translate(400, 145)" stroke="${accent}" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M-22 -10 L-32 0 L-22 10"/>
    <path d="M22 -10 L32 0 L22 10"/>
    <path d="M-7 14 L7 -14"/>
    <circle cx="0" cy="0" r="3" fill="${accent}"/>
  </g>

  <g text-anchor="middle" font-family="system-ui, -apple-system, sans-serif">
    ${
      line2
        ? `<text x="400" y="225" font-size="26" font-weight="700" fill="#f8fafc" letter-spacing="-0.5">${escapeXml(line1)}</text>
           <text x="400" y="262" font-size="26" font-weight="700" fill="#f8fafc" letter-spacing="-0.5">${escapeXml(line2)}</text>`
        : `<text x="400" y="240" font-size="28" font-weight="700" fill="#f8fafc" letter-spacing="-0.5">${escapeXml(line1)}</text>`
    }
    <text x="400" y="315" font-size="12" font-weight="600" fill="${accent}" letter-spacing="2.5">${escapeXml(domain.label.toUpperCase())}</text>
  </g>
</svg>`
}

/**
 * URL de la vignette d'un projet. Renvoie `image_url` s'il est renseigné,
 * sinon une URL courte vers la route de génération.
 */
export function projectImageUrl(project: {
  slug: string
  title: string
  tech_stack?: string
  image_url?: string | null
}): string {
  if (project.image_url) return project.image_url

  const params = new URLSearchParams({
    t: project.title,
    d: projectDomain(project).id,
  })
  return `/api/thumb?${params.toString()}`
}
