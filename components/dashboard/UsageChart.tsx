"use client"

import { useEffect } from "react"
import { toast } from "sonner"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"
import { useUsageChart } from "@/hooks/dashboard"
import { getErrorMessage } from "@/lib/api/api"
import { Skeleton } from "@/components/ui/skeleton"
import { formatChartDate, formatCount } from "./mapping"

export function UsageChart() {
  const { data, isLoading, isError, error } = useUsageChart()

  useEffect(() => {
    if (isError) {
      toast.error(getErrorMessage(error))
    }
  }, [isError, error])

  if (isLoading || isError) {
    return <Skeleton className="h-72 w-full" />
  }

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="usageGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.15} />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
            tickFormatter={formatChartDate}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatCount}
          />
          <Tooltip
            contentStyle={{
              background: "var(--color-popover)",
              border: "1px solid var(--color-border)",
              borderRadius: "8px",
              fontSize: "12px",
            }}
            labelFormatter={(label) =>
              typeof label === "string" ? formatChartDate(label) : label
            }
            formatter={(value) => [`${Number(value).toLocaleString()}`, "API Calls"]}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="var(--color-primary)"
            strokeWidth={2}
            fill="url(#usageGradient)"
            animationDuration={800}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}