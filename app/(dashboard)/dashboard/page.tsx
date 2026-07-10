import { PageHeader } from "@/components/shared/PageHeader"
import { PageContainer } from "@/components/shared/PageContainer"
import { SectionCard } from "@/components/shared/SectionCard"
import { OverviewCards } from "@/components/dashboard/OverviewCards"
import { UsageChart } from "@/components/dashboard/UsageChart"
import { RecentActivity } from "@/components/dashboard/RecentActivity"

export default function DashboardPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Dashboard"
        description="Overview of your platform metrics"
      />

      <OverviewCards />

      <div className="grid gap-6 lg:grid-cols-3">
        <SectionCard
          title="API Usage"
          description="Daily API calls over the last 30 days"
          className="lg:col-span-2"
        >
          <UsageChart />
        </SectionCard>

        <SectionCard title="Recent Activity">
          <RecentActivity />
        </SectionCard>
      </div>
    </PageContainer>
  )
}
