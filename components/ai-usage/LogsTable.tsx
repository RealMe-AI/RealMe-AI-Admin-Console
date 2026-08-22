"use client";

import { useState } from "react";
import { FilterBar, FilterSelect } from "@/components/shared/FilterBar";
import { DataTable } from "@/components/shared/DataTable";
import { Pagination } from "@/components/shared/Pagination";
import { useUsageLogs, type DateRange } from "@/hooks/ai-usage";
import type { ColumnDef } from "@tanstack/react-table";
import type { ModelUsage, UsageLog } from "@/types/aiUsage";

const PAGE_SIZE = 10;

interface LogsTableProps {
  enabled: boolean;
  dateRange: DateRange;
  models?: ModelUsage[];
}

export function LogsTable({ enabled, dateRange, models }: LogsTableProps) {
  const [model, setModel] = useState("");
  const [page, setPage] = useState(1);

  const query = useUsageLogs(
    {
      ...(model ? { model } : {}),
      ...dateRange,
      page,
      limit: PAGE_SIZE,
    },
    { enabled },
  );

  const logs = query.data?.data ?? [];
  const meta = query.data?.meta;

  const modelOptions =
    models?.map((m) => ({ value: m.model, label: m.model })) ?? [];

  const columns: ColumnDef<UsageLog>[] = [
    {
      accessorKey: "user",
      header: "User",
      enableSorting: false,
      cell: ({ row }) => (
        <div>
          <p className="text-sm font-medium text-card-foreground">
            {row.original.user.name}
          </p>
          <p className="text-xs text-muted-foreground">
            {row.original.user.email}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "model",
      header: "Model",
      enableSorting: false,
      cell: (info) => (
        <span className="text-sm text-card-foreground">
          {info.getValue() as string}
        </span>
      ),
    },
    {
      accessorKey: "requestType",
      header: "Request Type",
      enableSorting: false,
      cell: (info) => (
        <span className="inline-flex rounded-full bg-muted px-2 py-0.5 text-xs capitalize text-muted-foreground">
          {info.getValue() as string}
        </span>
      ),
    },
    {
      accessorKey: "tokensUsed",
      header: "Tokens",
      cell: (info) => (
        <span className="text-sm text-card-foreground">
          {(info.getValue() as number).toLocaleString()}
        </span>
      ),
    },
    {
      accessorKey: "cost",
      header: "Cost",
      cell: (info) => (
        <span className="text-sm text-card-foreground">
          ${(info.getValue() as number).toFixed(7)}
        </span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      enableSorting: false,
      cell: (info) => (
        <span className="text-sm whitespace-nowrap text-muted-foreground">
          {new Date(info.getValue() as string).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-3">
      <FilterBar>
        <FilterSelect
          label="Model"
          value={model}
          options={modelOptions}
          onChange={(v) => {
            setModel(v);
            setPage(1);
          }}
          placeholder="All Models"
        />
      </FilterBar>

      <DataTable
        columns={columns}
        data={logs}
        loading={query.isPending || query.isFetching}
        emptyTitle="No usage logs found"
        emptyDescription="Try adjusting the filters above"
      />

      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          {meta
            ? `Page ${meta.page} of ${meta.totalPages} · ${meta.total.toLocaleString()} logs`
            : "—"}
        </p>
        <Pagination
          page={page}
          totalPages={meta?.totalPages ?? 1}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
