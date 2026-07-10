"use client"

import { dashboardData } from "@/data/dashboard"
import { StatCard } from "./StatCard"

export function OverviewCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {dashboardData.stats.map((stat, i) => (
        <StatCard key={stat.id} stat={stat} index={i} />
      ))}
    </div>
  )
}
