"use client"

import { useEffect } from "react"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { useActivities } from "@/hooks/dashboard"
import { getErrorMessage } from "@/lib/api/api"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { EmptyState } from "@/components/shared/EmptyState"

export function RecentActivity() {
  const { data, isLoading, isError, error } = useActivities()

  useEffect(() => {
    if (isError) {
      toast.error(getErrorMessage(error))
    }
  }, [isError, error])

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 px-3 py-2.5">
            <Skeleton className="size-8 shrink-0 rounded-full" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <EmptyState
        title="Unable to load activity"
        description="Something went wrong fetching recent activity."
      />
    )
  }

  if (!data || data.length === 0) {
    return (
      <EmptyState
        title="No recent activity"
        description="User activity will appear here."
      />
    )
  }

  return (
    <div className="space-y-1">
      {data.slice(0, 6).map((activity, i) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: i * 0.03 }}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-muted/50"
        >
          <Avatar className="size-8">
            {activity.user.avatar && (
              <AvatarImage
                src={activity.user.avatar}
                alt={activity.user.name}
              />
            )}
            <AvatarFallback className="text-xs font-medium bg-muted text-muted-foreground">
              {activity.user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-card-foreground">
              <span className="font-medium">{activity.user.name}</span>{" "}
              {activity.action}{" "}
              <span className="font-medium">{activity.target}</span>
            </p>
          </div>
          <span className="shrink-0 text-xs text-muted-foreground">
            {activity.timestamp}
          </span>
        </motion.div>
      ))}
    </div>
  )
}