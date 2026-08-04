"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { DeleteRequest, getErrorMessage } from "@/lib/api/api"
import { API_ROUTES } from "@/lib/api/routes"

export function useDeleteUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (userId: string) =>
      DeleteRequest(API_ROUTES.admin.users.delete(userId)),
    onSuccess: () => {
      toast.success("User deleted")
      queryClient.invalidateQueries({ queryKey: ["admin-users"] })
    },
    onError: (err) => {
      toast.error(getErrorMessage(err))
    },
  })
}
