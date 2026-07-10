export interface PlanFeature {
  text: string
  included: boolean
}

export interface Plan {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  currency: string
  interval: "month" | "year"
  features: PlanFeature[]
  highlighted: boolean
  popular?: boolean
  cta: string
}
