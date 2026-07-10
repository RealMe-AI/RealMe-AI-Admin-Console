import type { ReactNode } from "react"
import { Inbox } from "lucide-react"

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4 text-muted-foreground/50">
        {icon || <Inbox className="size-12" />}
      </div>
      <h3 className="text-sm font-medium text-foreground">{title}</h3>
      {description && (
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
