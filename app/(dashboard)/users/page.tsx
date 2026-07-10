"use client"

import { useState, useMemo } from "react"
import { PageHeader } from "@/components/shared/PageHeader"
import { PageContainer } from "@/components/shared/PageContainer"
import { SectionCard } from "@/components/shared/SectionCard"
import { Pagination } from "@/components/shared/Pagination"
import { UserTable } from "@/components/users/UserTable"
import { Filters } from "@/components/users/Filters"
import { ProfileDrawer } from "@/components/users/ProfileDrawer"
import { ConfirmationDialog } from "@/components/shared/ConfirmationDialog"
import { users as allUsers } from "@/data/users"
import type { UserFilters } from "@/types/user"

const ITEMS_PER_PAGE = 5

export default function UsersPage() {
  const [filters, setFilters] = useState<UserFilters>({})
  const [page, setPage] = useState(1)

  const filteredUsers = useMemo(() => {
    let result = [...allUsers]

    if (filters.search) {
      const q = filters.search.toLowerCase()
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q),
      )
    }
    if (filters.country) {
      result = result.filter((u) => u.countryCode === filters.country)
    }
    if (filters.plan) {
      result = result.filter((u) => u.plan === filters.plan)
    }
    if (filters.status) {
      result = result.filter((u) => u.status === filters.status)
    }

    return result
  }, [filters])

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE)
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  )

  return (
    <PageContainer>
      <PageHeader
        title="Users"
        description={`${filteredUsers.length} total users`}
      />

      <SectionCard>
        <Filters filters={filters} onFiltersChange={setFilters} />
        <div className="mt-4">
          <UserTable users={paginatedUsers} />
        </div>
        <div className="mt-4">
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </SectionCard>

      {/* This pattern is ready for API integration:
          GET /admin/users?page=X&country=NG&status=ACTIVE&q=...
          just replace the mock filtering/pagination with props from the server */}
      <ProfileDrawer />
      <ConfirmationDialog />
    </PageContainer>
  )
}
