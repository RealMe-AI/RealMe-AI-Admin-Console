export type UserStatus = "active" | "suspended" | "inactive"
export type UserPlan = "free" | "pro" | "enterprise"

export interface User {
  id: string
  name: string
  initials?: string
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
  plan?: UserPlan | ""
  status?: UserStatus | ""
}

export type UserListParams = {
  search?: string
  status?: string
  plan?: string
  page?: number
  limit?: number
}

export interface UserListMeta {
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface UserListResponse {
  data: User[]
  meta: UserListMeta
}
