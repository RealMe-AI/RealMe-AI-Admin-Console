"use client"

import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/authStore"

export function useLogout() {
  const router = useRouter()

  return () => {
    useAuthStore.getState().clearAuth()
    router.push("/login")
  }
}
