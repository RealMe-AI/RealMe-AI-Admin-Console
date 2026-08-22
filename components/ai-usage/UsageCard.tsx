"use client";

import { motion } from "framer-motion";
import { PhoneCall, Braces, DollarSign, Timer } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const CARDS = [
  { id: "totalApiCalls", label: "Total API Calls", icon: PhoneCall },
  { id: "totalTokens", label: "Total Tokens", icon: Braces },
  { id: "totalCost", label: "Total Cost", icon: DollarSign },
  { id: "avgResponseTime", label: "Avg Response Time", icon: Timer },
] as const;

export function abbreviateNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return n.toLocaleString();
}

interface UsageCardsProps {
  stats?: {
    totalApiCalls: number;
    totalTokens: number;
    totalCost: number;
    avgResponseTime: string | null;
  };
  loading?: boolean;
}

function formatValue(id: string, stats: NonNullable<UsageCardsProps["stats"]>) {
  switch (id) {
    case "totalApiCalls":
      return stats.totalApiCalls.toLocaleString();
    case "totalTokens":
      return abbreviateNumber(stats.totalTokens);
    case "totalCost":
      return `$${stats.totalCost.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    case "avgResponseTime":
      return stats.avgResponseTime ?? "—";
    default:
      return "—";
  }
}

export function UsageCard({
  id,
  label,
  value,
}: {
  id: string;
  label: string;
  value: string;
}) {
  const card = CARDS.find((c) => c.id === id);
  const Icon = card?.icon ?? PhoneCall;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-lg border border-border bg-card p-5"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          <p className="text-xl font-semibold tracking-tight text-card-foreground">
            {value}
          </p>
        </div>
        <div className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          <Icon className="size-4" />
        </div>
      </div>
    </motion.div>
  );
}

export function UsageCards({ stats, loading }: UsageCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {CARDS.map((card) =>
        loading || !stats ? (
          <div
            key={card.id}
            className="rounded-lg border border-border bg-card p-5"
          >
            <Skeleton className="h-3 w-24" />
            <Skeleton className="mt-2 h-6 w-20" />
          </div>
        ) : (
          <UsageCard
            key={card.id}
            id={card.id}
            label={card.label}
            value={formatValue(card.id, stats)}
          />
        ),
      )}
    </div>
  );
}
