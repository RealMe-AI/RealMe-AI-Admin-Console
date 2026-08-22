"use client";

import { DATE_PRESETS, type DatePreset } from "@/types/aiUsage";
import { cn } from "@/utils/utils";

interface DateRangeFilterProps {
  value: DatePreset;
  onChange: (value: DatePreset) => void;
  className?: string;
}

export function DateRangeFilter({
  value,
  onChange,
  className,
}: DateRangeFilterProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-0.5 rounded-lg bg-muted p-[3px]",
        className,
      )}
    >
      {DATE_PRESETS.map((preset) => (
        <button
          key={preset.value}
          type="button"
          onClick={() => onChange(preset.value)}
          className={cn(
            "rounded-md px-3 py-1 text-xs font-medium whitespace-nowrap transition-colors",
            value === preset.value
              ? "bg-background text-foreground shadow-sm dark:bg-input/30"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {preset.label}
        </button>
      ))}
    </div>
  );
}
