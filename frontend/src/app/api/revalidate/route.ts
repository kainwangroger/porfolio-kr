import { revalidatePath, revalidateTag } from "next/cache"

import { CACHE_TAGS, type CacheTag } from "@/lib/api"

/**
 * Purge le cache d'une ressource après une écriture depuis le back-office.
 *
 * Les pages publiques sont régénérées toutes les heures : sans cette route,
 * un projet ajouté n'apparaîtrait qu'au bout d'une heure. Passer les pages en
 * rendu dynamique réglerait aussi le problème, mais ferait payer le réveil du
 * backend à chaque visiteur — c'est précisément ce qu'on cherche à éviter.
 *
 * Autorisation : le jeton présenté est validé par l'API, seule à détenir la
 * clé de signature. Un secret partagé serait ici illusoire, le back-office
 * s'exécutant dans le navigateur : tout ce qu'on lui confie est public.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001/api/v1"

/** Routes dont le contenu dépend d'une ressource, au-delà de ses pages. */
const EXTRA_PATHS: Record<CacheTag, string[]> = {
  projects: ["/sitemap.xml"],
  events: ["/sitemap.xml"],
  skills: [],
  blog: [],
}

function isCacheTag(value: unknown): value is CacheTag {
  return typeof value === "string" && (CACHE_TAGS as readonly string[]).includes(value)
}

async function tokenIsValid(authorization: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: { Authorization: authorization },
      cache: "no-store",
    })
    return res.ok
  } catch {
    // API injoignable : on refuse plutôt que d'ouvrir la purge à tous.
    return false
  }
}

export async function POST(request: Request) {
  const authorization = request.headers.get("authorization")
  if (!authorization) {
    return Response.json({ error: "Jeton manquant" }, { status: 401 })
  }

  if (!(await tokenIsValid(authorization))) {
    return Response.json({ error: "Jeton invalide" }, { status: 401 })
  }

  const body = await request.json().catch(() => null)
  const tag = (body as { tag?: unknown } | null)?.tag

  if (!isCacheTag(tag)) {
    return Response.json(
      { error: `Ressource inconnue. Attendu : ${CACHE_TAGS.join(", ")}` },
      { status: 400 }
    )
  }

  // Next 16 attend un profil d'expiration en second argument. Avec « max »,
  // la première visite après la purge reçoit encore l'ancienne version
  // pendant que la nouvelle se prépare en arrière-plan ; `{ expire: 0 }`
  // marque l'entrée comme périmée, et la régénération devient bloquante —
  // c'est ce qu'on veut ici, l'auteur venant d'enregistrer.
  revalidateTag(tag, { expire: 0 })
  for (const path of EXTRA_PATHS[tag]) {
    revalidatePath(path)
  }

  return Response.json({ revalidated: tag, at: Date.now() })
}
