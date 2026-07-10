import { PageHeader } from "@/components/shared/PageHeader"
import { PageContainer } from "@/components/shared/PageContainer"
import { PricingCard } from "@/components/pricing/PricingCard"
import { EditPricingDialog } from "@/components/pricing/EditPricingDialog"
import { plans } from "@/data/pricing"

export default function PricingPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Pricing"
        description="Manage your subscription plans"
      >
        <EditPricingDialog />
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-3">
        {plans.map((plan, i) => (
          <PricingCard key={plan.id} plan={plan} index={i} />
        ))}
      </div>
    </PageContainer>
  )
}
