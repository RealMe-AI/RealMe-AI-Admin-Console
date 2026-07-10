"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, Minus, Users, Activity, DollarSign, Cpu } from "lucide-react"
import type { Stat } from "@/types/dashboard"
import { cn } from "@/lib/utils"

const iconMap: Record<string, React.ElementType> = {
  Users,
  Activity,
  DollarSign,
  Cpu,
}

export function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const Icon = iconMap[stat.icon] || Activity
  const TrendIcon = stat.changeType === "positive" ? TrendingUp : stat.changeType === "negative" ? TrendingDown : Minus

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="rounded-lg border border-border bg-card p-5"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
          <p className="text-2xl font-semibold tracking-tight text-card-foreground">
            {stat.value}
          </p>
        </div>
        <div className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          <Icon className="size-4" />
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1.5">
        <TrendIcon
          className={cn(
            "size-3.5",
            stat.changeType === "positive" && "text-success",
            stat.changeType === "negative" && "text-destructive",
            stat.changeType === "neutral" && "text-muted-foreground",
          )}
        />
        <span
          className={cn(
            "text-xs font-medium",
            stat.changeType === "positive" && "text-success",
            stat.changeType === "negative" && "text-destructive",
            stat.changeType === "neutral" && "text-muted-foreground",
          )}
        >
          {stat.change}
        </span>
        <span className="text-xs text-muted-foreground">vs last month</span>
      </div>
    </motion.div>
  )
}
