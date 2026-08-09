export interface Stat {
  id: string
  label: string
  value: string
  change: string
  changeType: "increase" | "decrease"
  icon: string
}

export interface Activity {
  id: string
  user: { name: string; avatar: string | null }
  action: string
  target: string
  timestamp: string
}

export interface ChartDataPoint {
  date: string
  value: number
}
