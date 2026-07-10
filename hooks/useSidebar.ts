"use client"

import { useUIStore } from "@/store/ui"
import { useMediaQuery } from "./useMediaQuery"
import { useEffect } from "react"

export function useSidebar() {
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const { sidebarCollapsed, toggleSidebar, setSidebarCollapsed } = useUIStore()

  useEffect(() => {
    if (!isDesktop) {
      setSidebarCollapsed(true)
    }
  }, [isDesktop, setSidebarCollapsed])

  return {
    collapsed: !isDesktop ? true : sidebarCollapsed,
    isDesktop,
    toggle: toggleSidebar,
  }
}
