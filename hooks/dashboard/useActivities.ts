"use client"

import { useQuery } from "@tanstack/react-query"
import { GetRequest } from "@/lib/api/api"
import { API_ROUTES } from "@/lib/api/routes"
import type { Activity } from "@/types/dashboard"

export function useActivities() {
  return useQuery({
    queryKey: ["admin-dashboard-activities"],
    queryFn: () =>
      GetRequest<Activity[]>(API_ROUTES.admin.dashboard.activities),
  })
}