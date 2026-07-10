"use client"

import { Fragment } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const labelMap: Record<string, string> = {
  dashboard: "Dashboard",
  users: "Users",
  "ai-usage": "AI Usage",
  pricing: "Pricing",
  "help-support": "Help & Support",
  faq: "FAQ",
  settings: "Settings",
}

export function Breadcrumbs() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  if (segments.length === 0) return null

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm">
      {segments.map((segment, i) => {
        const href = "/" + segments.slice(0, i + 1).join("/")
        const isLast = i === segments.length - 1
        const label = labelMap[segment] ?? segment.charAt(0).toUpperCase() + segment.slice(1)

        return (
          <Fragment key={href}>
            {i > 0 && (
              <ChevronRight className="size-3.5 shrink-0 text-muted-foreground" />
            )}
            {isLast ? (
              <span className="font-medium text-foreground">{label}</span>
            ) : (
              <Link
                href={href}
                className={cn(
                  "text-muted-foreground transition-colors hover:text-foreground",
                )}
              >
                {label}
              </Link>
            )}
          </Fragment>
        )
      })}
    </nav>
  )
}
