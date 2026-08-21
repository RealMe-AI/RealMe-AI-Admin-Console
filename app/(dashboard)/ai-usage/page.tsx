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
import { modelsByUsage, usageLogs } from "@/data/ai-usage";
import type { DatePreset } from "@/types/aiUsage";

export default function AIUsagePage() {
  const [datePreset, setDatePreset] = useState<DatePreset>("30d");

  return (
    <PageContainer>
      <PageHeader
        title="AI Usage"
        description="Monitor API usage, costs, and language distribution"
      />

      <Tabs defaultValue="overview">
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

          <UsageCards />

          <div className="grid gap-6 lg:grid-cols-2">
            <SectionCard
              title="By Language"
              description="API calls distributed by language"
            >
              <LanguageChart />
            </SectionCard>

            <SectionCard
              title="Daily Cost"
              description="Cost breakdown over the last 30 days"
            >
              <CostCard />
            </SectionCard>
          </div>

          <SectionCard
            title="By Model"
            description="API usage breakdown by AI model"
          >
            <ModelTable models={modelsByUsage} />
          </SectionCard>
        </TabsContent>

        <TabsContent value="logs" className="pt-4">
          <LogsTable logs={usageLogs} />
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}
