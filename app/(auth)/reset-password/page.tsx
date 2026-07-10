import type { Metadata } from "next"
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm"

export const metadata: Metadata = {
  title: "Reset password - RealMe AI",
}

export default function ResetPasswordPage() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-lg font-semibold">Set new password</h2>
        <p className="text-sm text-muted-foreground">
          Must be at least 8 characters
        </p>
      </div>
      <ResetPasswordForm />
    </div>
  )
}
