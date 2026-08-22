"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useSendSupportEmail } from "@/hooks/support/useSendSupportEmail"
import { getErrorMessage } from "@/lib/api/api"
import { useUIStore } from "@/store/ui"
import type { SupportEmailTarget } from "@/types/support"

const SUBJECT_MAX = 200
const MESSAGE_MAX = 10_000

interface FieldErrors {
  recipient?: string
  subject?: string
  message?: string
}

export function EmailSupportForm() {
  const [target, setTarget] = useState<SupportEmailTarget>("all")
  const [recipient, setRecipient] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState<FieldErrors>({})

  const { showConfirmation } = useUIStore()
  const sendEmail = useSendSupportEmail()

  function validate(): boolean {
    const next: FieldErrors = {}

    if (target === "particular") {
      if (!recipient.trim()) {
        next.recipient = 'Recipient email is required when target is "particular"'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient.trim())) {
        next.recipient = "Enter a valid email address"
      }
    }
    if (!subject.trim()) {
      next.subject = "Subject is required"
    } else if (subject.length > SUBJECT_MAX) {
      next.subject = `Subject must be ${SUBJECT_MAX} characters or less`
    }
    if (!message.trim()) {
      next.message = "Message is required"
    } else if (message.length > MESSAGE_MAX) {
      next.message = `Message must be ${MESSAGE_MAX} characters or less`
    }

    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSuccess(data: {
    sent: number
    failed: number
    total: number
  }) {
    if (data.sent === 0) {
      toast.error("No emails were delivered", {
        description: `${data.failed} of ${data.total} failed`,
      })
    } else if (data.failed > 0) {
      toast.warning(`Email sent to ${data.sent} users (${data.failed} failed)`)
    } else {
      toast.success(
        data.total === 1
          ? "Email sent successfully"
          : `Email sent to ${data.sent} users`
      )
    }
    setSubject("")
    setMessage("")
    setRecipient("")
    setErrors({})
  }

  function submit() {
    sendEmail.mutate(
      {
        target,
        ...(target === "particular" ? { recipientEmail: recipient.trim() } : {}),
        subject: subject.trim(),
        message: message.trim(),
      },
      {
        onSuccess: handleSuccess,
        onError: (err) => toast.error(getErrorMessage(err)),
      }
    )
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    if (target === "all") {
      showConfirmation({
        title: "Broadcast to all users",
        message:
          "This will send an email to all active users. This cannot be undone. Continue?",
        variant: "default",
        onConfirm: () => submit(),
      })
      return
    }

    submit()
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2 w-48">
        <Label htmlFor="sendTo">Send to</Label>
        <Select
          value={target}
          onValueChange={(v) => {
            setTarget(v as SupportEmailTarget)
            setErrors((prev) => ({ ...prev, recipient: undefined }))
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All users</SelectItem>
            <SelectItem value="particular">Particular user</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {target === "particular" && (
        <div className="space-y-2">
          <Label htmlFor="recipient">Recipient email</Label>
          <Input
            id="recipient"
            type="email"
            placeholder="user@example.com"
            value={recipient}
            onChange={(e) => {
              setRecipient(e.target.value)
              setErrors((prev) => ({ ...prev, recipient: undefined }))
            }}
          />
          {errors.recipient && (
            <p className="text-xs text-destructive">{errors.recipient}</p>
          )}
        </div>
      )}

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="subject">Subject</Label>
          <span className="text-xs text-muted-foreground">
            {subject.length}/{SUBJECT_MAX}
          </span>
        </div>
        <Input
          id="subject"
          placeholder="How can we help?"
          value={subject}
          maxLength={SUBJECT_MAX}
          onChange={(e) => {
            setSubject(e.target.value)
            setErrors((prev) => ({ ...prev, subject: undefined }))
          }}
        />
        {errors.subject && (
          <p className="text-xs text-destructive">{errors.subject}</p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="message">Message</Label>
          <span className="text-xs text-muted-foreground">
            {message.length.toLocaleString()}/{MESSAGE_MAX.toLocaleString()}
          </span>
        </div>
        <textarea
          id="message"
          rows={5}
          placeholder="Describe your issue..."
          value={message}
          onChange={(e) => {
            setMessage(e.target.value)
            setErrors((prev) => ({ ...prev, message: undefined }))
          }}
          className="w-full rounded-lg border border-border bg-background p-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/20"
        />
        {errors.message && (
          <p className="text-xs text-destructive">{errors.message}</p>
        )}
      </div>

      <Button type="submit" disabled={sendEmail.isPending}>
        {sendEmail.isPending ? "Sending…" : "Send message"}
      </Button>
    </form>
  )
}
