export interface Stat {
  id: string
  label: string
  value: string
  change: string
  changeType: "positive" | "negative" | "neutral"
  icon: string
}

export interface Activity {
  id: string
  user: { name: string; avatar: string }
  action: string
  target: string
  timestamp: string
}

export interface ChartDataPoint {
  date: string
  value: number
}

export interface DashboardData {
  stats: Stat[]
  usageChart: ChartDataPoint[]
  revenueChart: ChartDataPoint[]
  activities: Activity[]
}
