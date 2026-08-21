"use client";

import { useMemo, useState } from "react";
import { FilterBar, FilterSelect } from "@/components/shared/FilterBar";
import { DataTable } from "@/components/shared/DataTable";
import { Pagination } from "@/components/shared/Pagination";
import type { DatePreset, UsageLog } from "@/types/aiUsage";
import { DATE_PRESETS } from "@/types/aiUsage";
import type { ColumnDef } from "@tanstack/react-table";

const PAGE_SIZE = 10;

function getDaysAgo(preset: DatePreset): number {
  return DATE_PRESETS.find((p) => p.value === preset)?.days ?? 0;
}

export function LogsTable({ logs }: { logs: UsageLog[] }) {
  const [model, setModel] = useState("");
  const [datePreset, setDatePreset] = useState<DatePreset>("all");
  const [dateCutoff, setDateCutoff] = useState(0);
  const [page, setPage] = useState(1);

  function handlePresetChange(value: string) {
    const days = getDaysAgo(value as DatePreset);
    setDatePreset(value as DatePreset);
    setPage(1);
    setDateCutoff(days ? Date.now() - days * 864e5 : 0);
  }

  const modelOptions = useMemo(
    () =>
      Array.from(new Set(logs.map((l) => l.model))).map((m) => ({
        value: m,
        label: m,
      })),
    [logs],
  );

  const filtered = useMemo(
    () =>
      logs.filter(
        (log) =>
          (!model || log.model === model) &&
          new Date(log.createdAt).getTime() >= dateCutoff,
      ),
    [logs, model, dateCutoff],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageData = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const columns: ColumnDef<UsageLog>[] = useMemo(
    () => [
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
          <span className="inline-flex rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground capitalize">
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
    ],
    [],
  );

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
        <FilterSelect
          label="Date range"
          value={datePreset}
          options={DATE_PRESETS.map((p) => ({
            value: p.value,
            label: p.label,
          }))}
          onChange={handlePresetChange}
          placeholder="All Time"
        />
      </FilterBar>

      <DataTable
        columns={columns}
        data={pageData}
        emptyTitle="No usage logs found"
        emptyDescription="Try adjusting the filters above"
      />

      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Showing {pageData.length} of {filtered.length} logs
          <span className="mx-1.5">·</span>
          mock data
        </p>
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
