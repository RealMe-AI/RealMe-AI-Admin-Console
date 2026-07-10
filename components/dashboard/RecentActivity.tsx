"use client"

import { motion } from "framer-motion"
import { dashboardData } from "@/data/dashboard"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function RecentActivity() {
  return (
    <div className="space-y-1">
      {dashboardData.activities.slice(0, 6).map((activity, i) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: i * 0.03 }}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-muted/50"
        >
          <Avatar className="size-8">
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
