"use client"

import { useQuery } from "@tanstack/react-query"
import { GetRequest } from "@/lib/api/api"
import { API_ROUTES } from "@/lib/api/routes"
import type { ChartDataPoint } from "@/types/dashboard"

export function useUsageChart() {
  return useQuery({
    queryKey: ["admin-dashboard-usage-chart"],
    queryFn: () =>
      GetRequest<ChartDataPoint[]>(API_ROUTES.admin.dashboard.usageChart),
  })
}