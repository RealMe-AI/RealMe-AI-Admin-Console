"use client"

import { DataTable } from "@/components/shared/DataTable"
import { columns } from "./columns"
import type { User } from "@/types/user"

interface UserTableProps {
  users: User[]
  loading?: boolean
}

export function UserTable({ users, loading }: UserTableProps) {
  return <DataTable columns={columns} data={users} loading={loading} />
}
