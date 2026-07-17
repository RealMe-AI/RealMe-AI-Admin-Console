"use client"

import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { PostRequest, getErrorMessage } from "@/lib/api/api"
import { API_ROUTES } from "@/lib/api/routes"
import { useAuthStore } from "@/store/authStore"
import type { LoginResponse } from "@/types/auth"
import type { CredentialResponse } from "@react-oauth/google"

export function useGoogleLogin() {
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: (idToken: string) =>
      PostRequest<LoginResponse>(API_ROUTES.auth.googleSignin, { idToken }),
    onSuccess: (res) => {
      if (!res.isAdmin) {
        toast.error("Access denied. Admin privileges required.")
        return
      }
      useAuthStore.getState().setAuth(res)
      toast.success("Signed in successfully")
      router.push("/dashboard")
    },
    onError: (err) => {
      toast.error(getErrorMessage(err))
    },
  })

  return {
    onSuccess: (credentialResponse: CredentialResponse) => {
      if (credentialResponse.credential) {
        mutation.mutate(credentialResponse.credential)
      }
    },
    isPending: mutation.isPending,
  }
}
