"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { PatchRequest, getErrorMessage } from "@/lib/api/api"
import { API_ROUTES } from "@/lib/api/routes"

export function useUnsuspendUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (userId: string) =>
      PatchRequest(API_ROUTES.admin.users.unsuspend(userId)),
    onSuccess: () => {
      toast.success("User unsuspended")
      queryClient.invalidateQueries({ queryKey: ["admin-users"] })
    },
    onError: (err) => {
      toast.error(getErrorMessage(err))
    },
  })
}
