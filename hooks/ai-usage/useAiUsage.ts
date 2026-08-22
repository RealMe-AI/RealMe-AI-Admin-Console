import { useQuery } from "@tanstack/react-query"
import { GetRequest } from "@/lib/api/api"
import { API_ROUTES } from "@/lib/api/routes"
import { presetToRange, type DateRange } from "./dateRange"
import type {
  AiUsageStats,
  DailyCostPoint,
  DatePreset,
  LanguageUsage,
  ModelUsage,
  UsageLogListResponse,
} from "@/types/aiUsage"

export function useAiStats(preset: DatePreset) {
  return useQuery({
    queryKey: ["ai-usage-stats", preset],
    queryFn: () => GetRequest<AiUsageStats>(API_ROUTES.admin.aiUsage.stats, presetToRange(preset)),
  })
}

export function useLanguageBreakdown(preset: DatePreset) {
  return useQuery({
    queryKey: ["ai-usage-by-language", preset],
    queryFn: () =>
      GetRequest<LanguageUsage[]>(API_ROUTES.admin.aiUsage.byLanguage, {
        ...presetToRange(preset),
        limit: 8,
      }),
  })
}

export function useDailyCost(preset: DatePreset) {
  return useQuery({
    queryKey: ["ai-usage-daily-cost", preset],
    queryFn: () =>
      GetRequest<DailyCostPoint[]>(API_ROUTES.admin.aiUsage.dailyCost, presetToRange(preset)),
  })
}

export function useModelBreakdown(preset: DatePreset) {
  return useQuery({
    queryKey: ["ai-usage-by-model", preset],
    queryFn: () =>
      GetRequest<ModelUsage[]>(API_ROUTES.admin.aiUsage.byModel, presetToRange(preset)),
  })
}

export interface UsageLogsFilters extends DateRange {
  model?: string
  page?: number
  limit?: number
}

export function useUsageLogs(
  filters: UsageLogsFilters,
  options?: { enabled?: boolean }
) {
  const { page = 1, limit = 10, model, ...range } = filters

  return useQuery({
    queryKey: ["ai-usage-logs", model ?? "", range.from ?? "", range.to ?? "", page, limit],
    queryFn: () =>
      GetRequest<UsageLogListResponse>(API_ROUTES.admin.aiUsage.logs, {
        ...(model ? { model } : {}),
        ...(range.from ? { from: range.from } : {}),
        ...(range.to ? { to: range.to } : {}),
        page,
        limit,
      }),
    enabled: options?.enabled ?? true,
  })
}

export type { DateRange }
