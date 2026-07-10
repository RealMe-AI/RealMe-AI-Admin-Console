import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionCardProps {
  title?: string
  description?: string
  children: ReactNode
  className?: string
  action?: ReactNode
}

export function SectionCard({
  title,
  description,
  children,
  className,
  action,
}: SectionCardProps) {
  return (
    <div className={cn("rounded-lg border border-border bg-card", className)}>
      {(title || action) && (
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <div>
            {title && (
              <h3 className="text-sm font-medium text-card-foreground">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  )
}
