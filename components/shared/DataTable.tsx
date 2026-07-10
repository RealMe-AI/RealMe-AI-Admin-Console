"use client"

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { EmptyState } from "./EmptyState"
import { LoadingSkeleton } from "./LoadingSkeleton"

interface DataTableProps<T> {
  columns: ColumnDef<T>[]
  data: T[]
  sorting?: SortingState
  onSortingChange?: (sorting: SortingState) => void
  loading?: boolean
  emptyTitle?: string
  emptyDescription?: string
}

export function DataTable<T>({
  columns,
  data,
  sorting,
  onSortingChange,
  loading,
  emptyTitle = "No data found",
  emptyDescription,
}: DataTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: onSortingChange as any,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true,
  })

  if (loading) {
    return (
      <div className="rounded-lg border border-border">
        <LoadingSkeleton rows={5} columns={columns.length} className="p-4" />
      </div>
    )
  }

  if (!data.length) {
    return (
      <div className="rounded-lg border border-border">
        <EmptyState title={emptyTitle} description={emptyDescription} />
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b border-border">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="h-10 px-3 text-left text-xs font-medium text-muted-foreground"
                >
                  {header.isPlaceholder ? null : (
                    <button
                      type="button"
                      className={cn(
                        "flex items-center gap-1 select-none",
                        header.column.getCanSort() && "cursor-pointer hover:text-foreground",
                      )}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {header.column.getCanSort() && (
                        <ArrowUpDown className="size-3" />
                      )}
                    </button>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="border-b border-border transition-colors last:border-b-0 hover:bg-muted/50"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="h-12 px-3 text-sm text-card-foreground">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export { createColumnHelper } from "@tanstack/react-table"
