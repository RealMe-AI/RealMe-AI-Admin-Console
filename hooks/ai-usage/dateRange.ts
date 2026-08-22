import type { DatePreset } from "@/types/aiUsage"

export interface DateRange {
  from?: string
  to?: string
  [key: string]: string | number | undefined
}

const PRESET_DAYS: Record<Exclude<DatePreset, "all">, number> = {
  "7d": 7,
  "30d": 30,
  "90d": 90,
}

export function presetToRange(preset: DatePreset): DateRange {
  const days = PRESET_DAYS[preset as Exclude<DatePreset, "all">]
  if (!days) return {}
  return {
    from: new Date(Date.now() - days * 864e5).toISOString(),
    to: new Date().toISOString(),
  }
}
