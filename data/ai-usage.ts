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
