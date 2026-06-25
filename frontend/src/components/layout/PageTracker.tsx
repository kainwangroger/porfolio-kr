"use client"

import { useEffect, useRef } from "react"
import { api } from "@/lib/api"

export function PageTracker() {
  const tracked = useRef(false)

  useEffect(() => {
    if (tracked.current) return
    tracked.current = true
    api.stats.pageVisit().catch(() => {})
  }, [])

  return null
}
