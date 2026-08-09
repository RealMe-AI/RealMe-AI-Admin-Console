import { format } from "date-fns"

export function formatChartDate(date: string) {
  return format(new Date(date), "MMM d")
}

export const formatCount = (v: number) => String(v)