import type { DashboardData } from "@/types/dashboard"

function generateChartData(days: number, base: number, variance: number) {
  const data = []
  const today = new Date()
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      value: Math.round(base + Math.random() * variance * 2 - variance),
    })
  }
  return data
}

export const dashboardData: DashboardData = {
  stats: [
    {
      id: "totalUsers",
      label: "Total Users",
      value: "12,845",
      change: "+12.5%",
      changeType: "positive",
      icon: "Users",
    },
    {
      id: "activeUsers",
      label: "Active Users",
      value: "8,234",
      change: "+8.2%",
      changeType: "positive",
      icon: "Activity",
    },
    {
      id: "revenue",
      label: "Revenue (MTD)",
      value: "$48,290",
      change: "+23.1%",
      changeType: "positive",
      icon: "DollarSign",
    },
    {
      id: "apiUsage",
      label: "API Calls (MTD)",
      value: "2.4M",
      change: "-3.2%",
      changeType: "negative",
      icon: "Cpu",
    },
  ],
  usageChart: generateChartData(30, 75000, 25000),
  revenueChart: generateChartData(30, 42000, 8000),
  activities: [
    {
      id: "act-001",
      user: { name: "Chioma Okonkwo", avatar: "" },
      action: "upgraded to",
      target: "Pro plan",
      timestamp: "2 minutes ago",
    },
    {
      id: "act-002",
      user: { name: "Emily Johnson", avatar: "" },
      action: "exported",
      target: "Analytics report",
      timestamp: "15 minutes ago",
    },
    {
      id: "act-003",
      user: { name: "Zuri Okafor", avatar: "" },
      action: "created",
      target: "new project 'TransBot'",
      timestamp: "1 hour ago",
    },
    {
      id: "act-004",
      user: { name: "System", avatar: "" },
      action: "API usage reached",
      target: "75% of monthly limit",
      timestamp: "2 hours ago",
    },
    {
      id: "act-005",
      user: { name: "Nneka Eze", avatar: "" },
      action: "submitted",
      target: "feature request",
      timestamp: "3 hours ago",
    },
    {
      id: "act-006",
      user: { name: "James Adewale", avatar: "" },
      action: "invited",
      target: "3 team members",
      timestamp: "5 hours ago",
    },
    {
      id: "act-007",
      user: { name: "Kwame Asante", avatar: "" },
      action: "reported",
      target: "a bug in voice translation",
      timestamp: "6 hours ago",
    },
    {
      id: "act-008",
      user: { name: "Sarah Müller", avatar: "" },
      action: "completed",
      target: "onboarding checklist",
      timestamp: "8 hours ago",
    },
  ],
}
