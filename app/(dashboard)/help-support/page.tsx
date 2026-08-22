"use client"

import { useState } from "react"
import { PageHeader } from "@/components/shared/PageHeader"
import { PageContainer } from "@/components/shared/PageContainer"
import { SectionCard } from "@/components/shared/SectionCard"
import { ConfirmationDialog } from "@/components/shared/ConfirmationDialog"
import { EmailSupportForm } from "@/components/help-support/EmailSupportForm"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mail, MessageSquare } from "lucide-react"

const supportOptions = [
  {
    icon: Mail,
    title: "Email Support",
    description: "Respond within 24 hours",
    action: "Send email",
    key: "email" as const,
    available: true,
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Chat with our users",
    action: "Start chat",
    key: "chat" as const,
    available: true,
  },
]

const mockMessages = [
  { id: 1, role: "agent", text: "Hello! How can I help you today?" },
  { id: 2, role: "user", text: "Hi, I'm having trouble with my account." },
  { id: 3, role: "agent", text: "I'd be happy to help. Can you tell me more about the issue?" },
  { id: 4, role: "user", text: "I can't log in to my dashboard." },
  { id: 5, role: "agent", text: "Let me check your account. One moment please..." },
]

export default function HelpSupportPage() {
  const [activeSupport, setActiveSupport] = useState<"email" | "chat">("email")

  return (
    <PageContainer>
      <PageHeader
        title="Help & Support"
        description="Get help or send us a message"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {supportOptions.map((option) => (
          <SectionCard
            key={option.title}
            className={activeSupport === option.key ? "ring-2 ring-ring" : ""}
            onClick={() => option.available && setActiveSupport(option.key)}
          >
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
              <span className="text-xs font-medium text-muted-foreground">
                {option.action}
              </span>
            </div>
          </SectionCard>
        ))}
      </div>

      {activeSupport === "email" ? (
        <SectionCard title="Send us a message">
          <EmailSupportForm />
        </SectionCard>
      ) : (
        <SectionCard title="Live Chat">
          <div className="space-y-4">
            <div className="flex flex-col gap-3 max-h-80 overflow-y-auto">
              {mockMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] rounded-lg px-3 py-2 text-sm ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 pt-2">
              <Input placeholder="Type a message..." className="flex-1" />
              <Button size="sm" disabled>
                Send
              </Button>
            </div>
          </div>
        </SectionCard>
      )}

      <ConfirmationDialog />
    </PageContainer>
  )
}
