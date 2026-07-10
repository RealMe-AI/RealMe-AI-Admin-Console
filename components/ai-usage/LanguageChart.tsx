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
import { aiUsageData } from "@/data/ai-usage"

export function LanguageChart() {
  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={aiUsageData.callsByLanguage} layout="vertical">
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
            dataKey="language"
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
