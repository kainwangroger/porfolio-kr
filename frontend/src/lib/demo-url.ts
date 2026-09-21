/**
 * Garde-fou d'affichage pour les liens de démo.
 *
 * Le badge « Tester » promet un service en ligne. Une URL pointant sur la
 * machine du visiteur tient la promesse à l'envers : elle produit une erreur de
 * connexion. La source du problème se corrige côté import (voir
 * `backend/app/core/demo_url.py`) ; cette fonction est la ceinture de sécurité
 * qui empêche une mauvaise donnée déjà en base de ressortir à l'écran.
 */

const LOCAL_HOSTNAMES = new Set(["localhost", "127.0.0.1", "0.0.0.0", "::1", "[::1]"])

const PRIVATE_PREFIXES = ["10.", "192.168.", "172.16.", "172.17.", "172.18.", "172.19."]

export function isPublicDemoUrl(url: string | null | undefined): boolean {
  if (!url) return false

  let parsed: URL
  try {
    parsed = new URL(url.trim())
  } catch {
    return false
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return false

  const host = parsed.hostname.toLowerCase()
  if (!host) return false
  if (LOCAL_HOSTNAMES.has(host) || host.endsWith(".local")) return false
  if (PRIVATE_PREFIXES.some((prefix) => host.startsWith(prefix))) return false

  return true
}
