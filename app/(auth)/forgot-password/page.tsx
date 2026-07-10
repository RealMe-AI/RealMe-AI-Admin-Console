import type { Metadata } from "next"
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm"

export const metadata: Metadata = {
  title: "Forgot password - RealMe AI",
}

export default function ForgotPasswordPage() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-lg font-semibold">Forgot password?</h2>
        <p className="text-sm text-muted-foreground">
          No worries, we&apos;ll send you a reset link
        </p>
      </div>
      <ForgotPasswordForm />
    </div>
  )
}
