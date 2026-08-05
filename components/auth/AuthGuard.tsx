"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/authStore"
import { Loader } from "../shared/Loader"

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const accessToken = useAuthStore((s) => s.accessToken)
  const isAdmin = useAuthStore((s) => s.isAdmin)
  const hydrated = useAuthStore((s) => s._hasHydrated)

  useEffect(() => {
    if (hydrated && (!accessToken || !isAdmin)) {
      router.replace("/login")
    }
  }, [hydrated, accessToken, isAdmin, router])

  if (!hydrated || !accessToken || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader />
      </div>
    )
  }

  return <>{children}</>
}
