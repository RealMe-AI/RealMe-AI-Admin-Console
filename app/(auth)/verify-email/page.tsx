import type { Metadata } from "next"
import { VerifyEmailForm } from "@/components/auth/VerifyEmailForm"

export const metadata: Metadata = {
  title: "Verify email - RealMe AI",
}

export default function VerifyEmailPage() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-lg font-semibold">Verify your email</h2>
        <p className="text-sm text-muted-foreground">
          We sent a 5-digit code to your email
        </p>
      </div>
      <VerifyEmailForm />
    </div>
  )
}
