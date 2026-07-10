"use client"

import { useState } from "react"
import { PageHeader } from "@/components/shared/PageHeader"
import { PageContainer } from "@/components/shared/PageContainer"
import { SectionCard } from "@/components/shared/SectionCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, MessageSquare, Phone, BookOpen } from "lucide-react"

const supportOptions = [
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Chat with our support team",
    action: "Start chat",
    available: true,
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "We respond within 24 hours",
    action: "Send email",
    available: true,
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Enterprise customers only",
    action: "Book a call",
    available: false,
  },
  {
    icon: BookOpen,
    title: "Documentation",
    description: "Check our guides and API docs",
    action: "View docs",
    available: true,
  },
]

export default function HelpSupportPage() {
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  return (
    <PageContainer>
      <PageHeader
        title="Help & Support"
        description="Get help or send us a message"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {supportOptions.map((option) => (
          <SectionCard key={option.title}>
            <div className="flex flex-col items-center text-center gap-3 py-2">
              <div className="flex size-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <option.icon className="size-5" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-card-foreground">
                  {option.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {option.description}
                </p>
              </div>
              <Button variant="outline" size="sm" disabled={!option.available}>
                {option.action}
              </Button>
            </div>
          </SectionCard>
        ))}
      </div>

      <SectionCard title="Send us a message">
        <form
          className="space-y-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              placeholder="How can we help?"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <textarea
              id="message"
              rows={5}
              placeholder="Describe your issue..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-lg border border-border bg-background p-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/20"
            />
          </div>
          <Button type="submit">Send message</Button>
        </form>
      </SectionCard>
    </PageContainer>
  )
}
