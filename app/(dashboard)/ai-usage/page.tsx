"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PageHeader } from "@/components/shared/PageHeader";
import { PageContainer } from "@/components/shared/PageContainer";
import { SectionCard } from "@/components/shared/SectionCard";
import { UsageCards } from "@/components/ai-usage/UsageCard";
import { LanguageChart } from "@/components/ai-usage/LanguageChart";
import { CostCard } from "@/components/ai-usage/CostCard";
import { DateRangeFilter } from "@/components/ai-usage/DateRangeFilter";
import { ModelTable } from "@/components/ai-usage/ModelTable";
import { LogsTable } from "@/components/ai-usage/LogsTable";
import {
  useAiStats,
  useLanguageBreakdown,
  useDailyCost,
  useModelBreakdown,
  presetToRange,
} from "@/hooks/ai-usage";
import type { DatePreset } from "@/types/aiUsage";

function QueryError({ error }: { error: Error | null }) {
  if (!error) return null;
  return (
    <p className="text-xs text-destructive">Failed to load: {error.message}</p>
  );
}

export default function AIUsagePage() {
  const [datePreset, setDatePreset] = useState<DatePreset>("30d");
  const [activeTab, setActiveTab] = useState("overview");

  const stats = useAiStats(datePreset);
  const languages = useLanguageBreakdown(datePreset);
  const dailyCost = useDailyCost(datePreset);
  const models = useModelBreakdown(datePreset);

  return (
    <PageContainer>
      <PageHeader
        title="AI Usage"
        description="Monitor API usage, costs, and language distribution"
      />

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as string)}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="logs">Usage Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 pt-4">
          <div className="flex justify-end">
            <DateRangeFilter
              value={datePreset}
              onChange={setDatePreset}
            />
          </div>

          <div className="space-y-2">
            <UsageCards stats={stats.data} loading={stats.isPending} />
            {stats.isError && <QueryError error={stats.error} />}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <SectionCard
              title="By Language"
              description="API calls distributed by language"
            >
              <LanguageChart data={languages.data} loading={languages.isPending} />
              {languages.isError && <QueryError error={languages.error} />}
            </SectionCard>

            <SectionCard
              title="Daily Cost"
              description="Cost breakdown over the last 30 days"
            >
              <CostCard data={dailyCost.data} loading={dailyCost.isPending} />
              {dailyCost.isError && <QueryError error={dailyCost.error} />}
            </SectionCard>
          </div>

          <SectionCard
            title="By Model"
            description="API usage breakdown by AI model"
          >
            <ModelTable models={models.data} loading={models.isPending} />
            {models.isError && <QueryError error={models.error} />}
          </SectionCard>
        </TabsContent>

        <TabsContent value="logs" className="pt-4">
          <LogsTable
            enabled={activeTab === "logs"}
            dateRange={presetToRange(datePreset)}
            models={models.data}
          />
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}
