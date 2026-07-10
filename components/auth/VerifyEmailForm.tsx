"use client"

import { useState, useRef, type KeyboardEvent } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

const DIGIT_COUNT = 5

export function VerifyEmailForm() {
  const router = useRouter()
  const [digits, setDigits] = useState<string[]>(Array(DIGIT_COUNT).fill(""))
  const [loading, setLoading] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  function handleChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return
    const digit = value.slice(-1)
    const newDigits = [...digits]
    newDigits[index] = digit
    setDigits(newDigits)

    if (digit && index < DIGIT_COUNT - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  function handleKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault()
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, DIGIT_COUNT)
    const newDigits = Array(DIGIT_COUNT).fill("")
    for (let i = 0; i < pasted.length; i++) {
      newDigits[i] = pasted[i]
    }
    setDigits(newDigits)
    const nextIndex = Math.min(pasted.length, DIGIT_COUNT - 1)
    inputRefs.current[nextIndex]?.focus()
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setLoading(false)
    router.push("/reset-password")
  }

  const code = digits.join("")
  const isComplete = code.length === DIGIT_COUNT

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground">
          Enter the verification code sent to your email
        </p>
      </div>

      <div className="flex items-center justify-center gap-2" onPaste={handlePaste}>
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => { inputRefs.current[i] = el }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className="flex size-12 items-center justify-center rounded-lg border border-border bg-background text-center text-lg font-semibold outline-none transition-all focus:border-ring focus:ring-3 focus:ring-ring/20"
            autoFocus={i === 0}
          />
        ))}
      </div>

      <Button type="submit" className="w-full" disabled={!isComplete || loading}>
        {loading ? "Verifying..." : "Verify code"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Didn&apos;t receive the code?{" "}
        <button
          type="button"
          className="text-foreground underline underline-offset-4 hover:text-primary"
        >
          Resend code
        </button>
      </p>
    </form>
  )
}
