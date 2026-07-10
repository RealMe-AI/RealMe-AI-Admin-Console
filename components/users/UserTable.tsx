"use client"

import { useState } from "react"
import { DataTable, createColumnHelper } from "@/components/shared/DataTable"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { UserActions } from "./UserActions"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { User } from "@/types/user"

const columnHelper = createColumnHelper<User>()

const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => (
      <div className="flex items-center gap-2.5">
        <Avatar className="size-7">
          <AvatarFallback className="text-[10px] font-medium bg-muted text-muted-foreground">
            {info
              .getValue()
              .split(" ")
              .map((n: string) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium text-card-foreground">{info.getValue()}</p>
          <p className="text-xs text-muted-foreground">{info.row.original.email}</p>
        </div>
      </div>
    ),
  }),
  columnHelper.accessor("country", {
    header: "Location",
    cell: (info) => (
      <span className="text-sm text-card-foreground">
        {info.row.original.city}, {info.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor("plan", {
    header: "Plan",
    cell: (info) => <StatusBadge status={info.getValue()} />,
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => <StatusBadge status={info.getValue()} />,
  }),
  columnHelper.accessor("totalUsage", {
    header: "Usage",
    cell: (info) => (
      <span className="text-sm text-card-foreground">
        {info.getValue().toLocaleString()}
      </span>
    ),
  }),
  columnHelper.display({
    id: "actions",
    cell: (info) => <UserActions user={info.row.original} />,
  }),
]

interface UserTableProps {
  users: User[]
}

export function UserTable({ users }: UserTableProps) {
  return <DataTable columns={columns as any} data={users} />
}
