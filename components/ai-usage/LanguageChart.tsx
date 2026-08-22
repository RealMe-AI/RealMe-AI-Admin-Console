"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"
import { Skeleton } from "@/components/ui/skeleton"
import { getLanguageName } from "@/constants/languages"
import type { LanguageUsage } from "@/types/aiUsage"

interface LanguageChartProps {
  data?: LanguageUsage[]
  loading?: boolean
}

export function LanguageChart({ data, loading }: LanguageChartProps) {
  if (loading || !data) {
    return (
      <div className="flex h-72 flex-col justify-center gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-3 w-16" />
            <Skeleton
              className="h-5"
              style={{ width: `${75 - i * 9}%` }}
            />
          </div>
        ))}
      </div>
    )
  }

  const chartData = data.map((d) => ({
    ...d,
    languageName: getLanguageName(d.language),
  }))

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} layout="vertical">
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--color-border)"
            horizontal={false}
          />
          <XAxis
            type="number"
            tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
          />
          <YAxis
            dataKey="languageName"
            type="category"
            tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
            tickLine={false}
            axisLine={false}
            width={80}
          />
          <Tooltip
            contentStyle={{
              background: "var(--color-popover)",
              border: "1px solid var(--color-border)",
              borderRadius: "8px",
              fontSize: "12px",
            }}
            formatter={(value) => [
              `${Number(value).toLocaleString()} calls`,
              "Usage",
            ]}
          />
          <Bar
            dataKey="calls"
            fill="var(--color-primary)"
            radius={[0, 4, 4, 0]}
            barSize={20}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
