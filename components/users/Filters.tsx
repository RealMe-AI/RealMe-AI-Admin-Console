"use client"

import { FilterBar, FilterSelect } from "@/components/shared/FilterBar"
import { SearchBar } from "@/components/shared/SearchBar"
import { countries } from "@/constants/countries"
import type { UserFilters, UserPlan, UserStatus } from "@/types/user"

const plans: { value: UserPlan | ""; label: string }[] = [
  { value: "", label: "All Plans" },
  { value: "free", label: "Free" },
  { value: "pro", label: "Pro" },
  { value: "enterprise", label: "Enterprise" },
]

const statuses: { value: UserStatus | ""; label: string }[] = [
  { value: "", label: "All Statuses" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "suspended", label: "Suspended" },
]

interface FiltersProps {
  filters: UserFilters
  onFiltersChange: (filters: UserFilters) => void
}

export function Filters({ filters, onFiltersChange }: FiltersProps) {
  function update(key: keyof UserFilters, value: string) {
    onFiltersChange({ ...filters, [key]: value || undefined })
  }

  return (
    <FilterBar>
      <SearchBar
        value={filters.search}
        onChange={(v) => update("search", v)}
        placeholder="Search users..."
        className="w-56"
      />
      <FilterSelect
        label="Country"
        value={filters.country || ""}
        options={countries}
        onChange={(v) => update("country", v)}
        placeholder="All Countries"
      />
      <FilterSelect
        label="Plan"
        value={filters.plan || ""}
        options={plans}
        onChange={(v) => update("plan", v)}
        placeholder="All Plans"
      />
      <FilterSelect
        label="Status"
        value={filters.status || ""}
        options={statuses}
        onChange={(v) => update("status", v)}
        placeholder="All Statuses"
      />
    </FilterBar>
  )
}
