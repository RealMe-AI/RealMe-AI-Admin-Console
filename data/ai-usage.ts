import type { ModelUsage, UsageLog } from "@/types/aiUsage"

export interface AIUsageData {
  totalCalls: number
  totalTokens: number
  totalCost: number
  avgResponseTime: number
  callsByLanguage: { language: string; calls: number; percentage: number }[]
  callsByDay: { date: string; calls: number; cost: number }[]
}

export const aiUsageData: AIUsageData = {
  totalCalls: 2845123,
  totalTokens: 89245000,
  totalCost: 14289.5,
  avgResponseTime: 1.8,
  callsByLanguage: [
    { language: "English", calls: 982000, percentage: 34.5 },
    { language: "French", calls: 421000, percentage: 14.8 },
    { language: "Spanish", calls: 389000, percentage: 13.7 },
    { language: "Hausa", calls: 312000, percentage: 11.0 },
    { language: "Yoruba", calls: 245000, percentage: 8.6 },
    { language: "Portuguese", calls: 198000, percentage: 7.0 },
    { language: "Swahili", calls: 156000, percentage: 5.5 },
    { language: "Arabic", calls: 142000, percentage: 5.0 },
  ],
  callsByDay: Array.from({ length: 30 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (29 - i))
    return {
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      calls: Math.round(85000 + Math.random() * 40000),
      cost: Math.round((420 + Math.random() * 200) * 100) / 100,
    }
  }),
}

export const modelsByUsage: ModelUsage[] = [
  {
    model: "llama-3.3-70b-versatile",
    calls: 1200000,
    tokens: 55000000,
    cost: 110.0,
  },
  {
    model: "openai/gpt-oss-120b",
    calls: 800000,
    tokens: 22000000,
    cost: 44.0,
  },
  {
    model: "llama-3.1-8b-instant",
    calls: 620000,
    tokens: 9500000,
    cost: 6.5,
  },
  {
    model: "whisper-large-v3",
    calls: 225000,
    tokens: 2750000,
    cost: 16.4,
  },
]

const LOG_USERS = [
  { name: "Ada Obi", email: "ada@example.com" },
  { name: "Chinedu Okafor", email: "chinedu@example.com" },
  { name: "Fatima Bello", email: "fatima.bello@example.com" },
  { name: "Tunde Adeyemi", email: "tunde.a@example.com" },
  { name: "Ngozi Eze", email: "ngozi.eze@example.com" },
  { name: "Kwame Mensah", email: "kwame.m@example.com" },
  { name: "Zainab Musa", email: "zainab.musa@example.com" },
  { name: "Emeka Nwosu", email: "emeka.nwosu@example.com" },
]

const LOG_MODELS = [
  "llama-3.3-70b-versatile",
  "openai/gpt-oss-120b",
  "llama-3.1-8b-instant",
]

const LOG_REQUEST_TYPES = ["chat", "translation", "summary", "transcription"]

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

export const usageLogs: UsageLog[] = (() => {
  const rand = seededRandom(42)
  return Array.from({ length: 48 }, (_, i) => {
    const user = LOG_USERS[Math.floor(rand() * LOG_USERS.length)]
    const createdAt = new Date()
    createdAt.setDate(createdAt.getDate() - Math.floor(rand() * 95))
    createdAt.setHours(Math.floor(rand() * 24), Math.floor(rand() * 60))
    return {
      id: `log-${String(i + 1).padStart(4, "0")}`,
      user: {
        id: `user-${Math.floor(rand() * 9000 + 1000)}`,
        name: user.name,
        email: user.email,
        avatar: null,
      },
      model: LOG_MODELS[Math.floor(rand() * LOG_MODELS.length)],
      requestType: LOG_REQUEST_TYPES[Math.floor(rand() * LOG_REQUEST_TYPES.length)],
      tokensUsed: Math.round(150 + rand() * 4500),
      cost: Math.round(rand() * 0.008 * 1e7) / 1e7,
      conversationId: null,
      createdAt: createdAt.toISOString(),
    }
  }).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
})()

export const usageLogsMeta = {
  total: 142257,
  page: 1,
  limit: 10,
  totalPages: 14226,
}
