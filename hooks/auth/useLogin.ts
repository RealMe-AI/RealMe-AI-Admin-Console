"use client"

import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { PostRequest, getErrorMessage } from "@/lib/api/api"
import { API_ROUTES } from "@/lib/api/routes"
import { useAuthStore } from "@/store/authStore"
import type { LoginRequest, LoginResponse } from "@/types/auth"

export function useLogin() {
  const router = useRouter()

  return useMutation({
    mutationFn: (data: LoginRequest) =>
      PostRequest<LoginResponse>(API_ROUTES.auth.login, data),
    onSuccess: (res) => {
      if (!res.isAdmin) {
        toast.error("Access denied. Admin privileges required.")
        return
      }
      useAuthStore.getState().setAuth(res)
      toast.success("Logged in successfully")
      router.push("/dashboard")
    },
    onError: (err) => {
      toast.error(getErrorMessage(err))
    },
  })
}
