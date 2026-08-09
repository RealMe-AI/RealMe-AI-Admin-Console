"use client"

import { useEffect } from "react"
import { toast } from "sonner"
import { useDashboardStats } from "@/hooks/dashboard"
import { getErrorMessage } from "@/lib/api/api"
import { CardSkeleton } from "@/components/shared/LoadingSkeleton"
import { StatCard } from "./StatCard"

export function OverviewCards() {
  const { data, isLoading, isError, error } = useDashboardStats()

  useEffect(() => {
    if (isError) {
      toast.error(getErrorMessage(error))
    }
  }, [isError, error])

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {isLoading || isError
        ? Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
        : data?.map((stat, i) => (
            <StatCard key={stat.id} stat={stat} index={i} />
          ))}
    </div>
  )
}