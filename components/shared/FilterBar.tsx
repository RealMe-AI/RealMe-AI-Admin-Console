"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface FilterOption {
  value: string
  label: string
}

interface FilterSelectProps {
  label: string
  value: string
  options: FilterOption[]
  onChange: (value: string) => void
  placeholder?: string
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
  placeholder = "All",
}: FilterSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-8 rounded-lg border border-border bg-background px-2.5 text-sm outline-none transition-colors focus:border-ring focus:ring-3 focus:ring-ring/20"
      aria-label={label}
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}

interface FilterBarProps {
  children?: ReactNode
  className?: string
}

export function FilterBar({ children, className }: FilterBarProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {children}
    </div>
  )
}

export { FilterSelect }
