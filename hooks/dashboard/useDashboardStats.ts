"use client"

import { useQuery } from "@tanstack/react-query"
import { GetRequest } from "@/lib/api/api"
import { API_ROUTES } from "@/lib/api/routes"
import type { Stat } from "@/types/dashboard"

export function useDashboardStats() {
  return useQuery({
    queryKey: ["admin-dashboard-stats"],
    queryFn: () =>
      GetRequest<Stat[]>(API_ROUTES.admin.dashboard.stats),
  })
}