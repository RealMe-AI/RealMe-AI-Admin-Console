"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"

interface ForgotPasswordFormProps {
  onSent?: () => void
}

export function ForgotPasswordForm({ onSent }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setLoading(false)
    setSent(true)
    onSent?.()
  }

  if (sent) {
    return (
      <div className="text-center space-y-4">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-success/10 text-success">
          <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold">Check your email</h2>
        <p className="text-sm text-muted-foreground">
          We&apos;ve sent a password reset link to <span className="font-medium text-foreground">{email}</span>
        </p>
        <p className="text-xs text-muted-foreground">
          Didn&apos;t receive the email?{" "}
          <button
            type="button"
            onClick={() => {
              setSent(false)
              setEmail("")
            }}
            className="text-foreground underline underline-offset-4 hover:text-primary"
          >
            Try again
          </button>
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="reset-email">Email address</Label>
        <Input
          id="reset-email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Sending..." : "Send reset link"}
      </Button>

      <div className="text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          Back to login
        </Link>
      </div>
    </form>
  )
}
