export type UserStatus = "active" | "suspended" | "inactive"
export type UserPlan = "free" | "pro" | "enterprise"

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  country: string
  countryCode: string
  city: string
  status: UserStatus
  plan: UserPlan
  joinedAt: string
  lastActive: string
  totalUsage: number
  totalSessions: number
}

export interface UserFilters {
  search?: string
  country?: string
  city?: string
  plan?: UserPlan | ""
  status?: UserStatus | ""
}
