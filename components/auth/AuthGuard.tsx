"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/authStore"
import { Loader } from "../shared/Loader"

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { accessToken, isAdmin } = useAuthStore()

  useEffect(() => {
    if (!accessToken || !isAdmin) {
      router.replace("/login")
    }
  }, [accessToken, isAdmin, router])

  if (!accessToken || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader />
      </div>
    )
  }

  return <>{children}</>
}
