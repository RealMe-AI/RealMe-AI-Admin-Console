"use client"

import { useState } from "react"
import { PageHeader } from "@/components/shared/PageHeader"
import { PageContainer } from "@/components/shared/PageContainer"
import { SectionCard } from "@/components/shared/SectionCard"
import { Pagination } from "@/components/shared/Pagination"
import { UserTable } from "@/components/users/UserTable"
import { Filters } from "@/components/users/Filters"
import { ProfileDrawer } from "@/components/users/ProfileDrawer"
import { ConfirmationDialog } from "@/components/shared/ConfirmationDialog"
import { useAdminUsers } from "@/hooks/users"
import type { UserFilters } from "@/types/user"

const ITEMS_PER_PAGE = 20

export default function UsersPage() {
  const [filters, setFilters] = useState<UserFilters>({})
  const [page, setPage] = useState(1)

  const { data, isLoading } = useAdminUsers({
    search: filters.search || undefined,
    status: filters.status || undefined,
    plan: filters.plan || undefined,
    page,
    limit: ITEMS_PER_PAGE,
  })

  const users = data?.data ?? []
  const meta = data?.meta

  function handleFiltersChange(next: UserFilters) {
    setFilters(next)
    setPage(1)
  }

  return (
    <PageContainer>
      <PageHeader
        title="Users"
        description={`${meta?.total ?? 0} total users`}
      />

      <SectionCard>
        <Filters filters={filters} onFiltersChange={handleFiltersChange} />
        <div className="mt-4">
          <UserTable users={users} loading={isLoading} />
        </div>
        <div className="mt-4">
          <Pagination
            page={meta?.page ?? page}
            totalPages={meta?.totalPages ?? 1}
            onPageChange={setPage}
          />
        </div>
      </SectionCard>

      <ProfileDrawer />
      <ConfirmationDialog />
    </PageContainer>
  )
}
