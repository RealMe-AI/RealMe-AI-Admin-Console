export interface ModelUsage {
  model: string
  calls: number
  tokens: number
  cost: number
}

export interface UsageLogUser {
  id: string
  name: string
  email: string
  avatar: string | null
}

export interface UsageLog {
  id: string
  user: UsageLogUser
  model: string
  requestType: string
  tokensUsed: number
  cost: number
  conversationId: string | null
  createdAt: string
}

export type DatePreset = "7d" | "30d" | "90d" | "all"

export const DATE_PRESETS: { value: DatePreset; label: string; days: number }[] = [
  { value: "7d", label: "Last 7 days", days: 7 },
  { value: "30d", label: "Last 30 days", days: 30 },
  { value: "90d", label: "Last 90 days", days: 90 },
  { value: "all", label: "All time", days: 0 },
]
