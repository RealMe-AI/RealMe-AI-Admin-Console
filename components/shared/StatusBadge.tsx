import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: string
}

const variants: Record<string, string> = {
  active: "bg-success/10 text-success",
  inactive: "bg-muted text-muted-foreground",
  suspended: "bg-destructive/10 text-destructive",
  free: "bg-muted text-muted-foreground",
  pro: "bg-info/10 text-info",
  enterprise: "bg-primary/10 text-primary",
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize",
        variants[status] || "bg-muted text-muted-foreground",
      )}
    >
      {status}
    </span>
  )
}
