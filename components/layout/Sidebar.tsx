"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { PanelLeftClose, PanelLeft } from "lucide-react"
import { useSidebar } from "@/hooks/useSidebar"
import { sidebarItems } from "@/constants/sidebar"
import { SidebarItem } from "./SidebarItem"
import { Button } from "@/components/ui/button"

export function Sidebar() {
  const { collapsed, isDesktop, toggle } = useSidebar()

  return (
    <motion.aside
      animate={{ width: collapsed ? 56 : 224 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="hidden lg:flex flex-col border-r border-sidebar-border bg-sidebar"
    >
      <div className="flex h-14 items-center gap-3 border-b border-sidebar-border px-3">
        <Link href="/dashboard" className="flex items-center gap-3 overflow-hidden">
          <Image
            src="/logo.png"
            alt="RealMe AI"
            width={28}
            height={28}
            className="size-7 shrink-0 dark:invert"
          />
          {!collapsed && (
            <span className="text-sm font-semibold text-sidebar-foreground whitespace-nowrap">
              RealMe AI
            </span>
          )}
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-2">
        {sidebarItems.map((item) => (
          <SidebarItem key={item.href} item={item} collapsed={collapsed} />
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggle}
          className="w-full justify-center text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground"
        >
          {collapsed ? <PanelLeft className="size-4" /> : <PanelLeftClose className="size-4" />}
        </Button>
      </div>
    </motion.aside>
  )
}
