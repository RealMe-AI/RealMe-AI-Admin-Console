"use client"

import { useQuery } from "@tanstack/react-query"
import { GetRequest } from "@/lib/api/api"
import { API_ROUTES } from "@/lib/api/routes"
import type { User } from "@/types/user"

export function useAdminUser(userId: string | null) {
  return useQuery({
    queryKey: ["admin-users", userId],
    queryFn: () => GetRequest<User>(API_ROUTES.admin.users.detail(userId!)),
    enabled: !!userId,
  })
}
