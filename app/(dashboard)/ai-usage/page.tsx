import { PageHeader } from "@/components/shared/PageHeader"
import { PageContainer } from "@/components/shared/PageContainer"
import { SectionCard } from "@/components/shared/SectionCard"
import { UsageCards } from "@/components/ai-usage/UsageCard"
import { LanguageChart } from "@/components/ai-usage/LanguageChart"
import { CostCard } from "@/components/ai-usage/CostCard"

export default function AIUsagePage() {
  return (
    <PageContainer>
      <PageHeader
        title="AI Usage"
        description="Monitor API usage, costs, and language distribution"
      />

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
    </PageContainer>
  )
}
