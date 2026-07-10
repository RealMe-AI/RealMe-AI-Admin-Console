"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import type { SidebarItemConfig } from "@/constants/sidebar"

interface SidebarItemProps {
  item: SidebarItemConfig
  collapsed: boolean
}

export function SidebarItem({ item, collapsed }: SidebarItemProps) {
  const pathname = usePathname()
  const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

  return (
    <Link
      href={item.href}
      className={cn(
        "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
        isActive
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
        collapsed && "justify-center px-2",
      )}
    >
      <item.icon className="size-5 shrink-0" />
      {!collapsed && (
        <span className="truncate">{item.label}</span>
      )}
    </Link>
  )
}
