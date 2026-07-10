"use client"

import { motion } from "framer-motion"
import { PhoneCall, Braces, DollarSign, Timer } from "lucide-react"
import { cn } from "@/lib/utils"

interface UsageStat {
  label: string
  value: string
  icon: React.ElementType
}

const iconMap: Record<string, React.ElementType> = {
  totalCalls: PhoneCall,
  totalTokens: Braces,
  totalCost: DollarSign,
  avgResponseTime: Timer,
}

export function UsageCard({ id, label, value }: { id: string; label: string; value: string }) {
  const Icon = iconMap[id] || PhoneCall

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-lg border border-border bg-card p-5"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          <p className="text-xl font-semibold tracking-tight text-card-foreground">
            {value}
          </p>
        </div>
        <div className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          <Icon className="size-4" />
        </div>
      </div>
    </motion.div>
  )
}

export function UsageCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <UsageCard id="totalCalls" label="Total API Calls" value="2,845,123" />
      <UsageCard id="totalTokens" label="Total Tokens" value="89.2M" />
      <UsageCard id="totalCost" label="Total Cost" value="$14,289.50" />
      <UsageCard id="avgResponseTime" label="Avg Response Time" value="1.8s" />
    </div>
  )
}
