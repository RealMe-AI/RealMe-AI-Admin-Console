"use client"

import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { GetRequest } from "@/lib/api/api"
import { API_ROUTES } from "@/lib/api/routes"
import type { UserListParams, UserListResponse } from "@/types/user"

export function useAdminUsers(filters?: UserListParams) {
  return useQuery({
    queryKey: ["admin-users", filters],
    queryFn: () =>
      GetRequest<UserListResponse>(API_ROUTES.admin.users.list, filters),
    placeholderData: keepPreviousData,
  })
}
