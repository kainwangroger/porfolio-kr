import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Message lisible tiré d'une valeur attrapée dans un `catch`.
 *
 * TypeScript type la variable d'un `catch` en `unknown` : rien ne garantit
 * qu'elle porte un `.message`. Cette fonction remplace les `catch (err: any)`
 * qui parsemaient le code et supposaient le contraire.
 */
export function errorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error && error.message) return error.message
  if (typeof error === "string" && error) return error
  return fallback
}
