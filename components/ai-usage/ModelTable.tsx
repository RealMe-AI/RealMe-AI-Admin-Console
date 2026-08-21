import type { ModelUsage } from "@/types/aiUsage";

function abbreviate(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return n.toLocaleString();
}

export function ModelTable({ models }: { models: ModelUsage[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            {["Model", "Calls", "Tokens", "Cost"].map((h) => (
              <th
                key={h}
                className="h-10 px-3 text-left text-xs font-medium text-muted-foreground"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {models.map((m) => (
            <tr
              key={m.model}
              className="border-b border-border transition-colors last:border-b-0 hover:bg-muted/50"
            >
              <td className="h-12 px-3 font-medium text-card-foreground">
                {m.model}
              </td>
              <td className="h-12 px-3 text-card-foreground">
                {abbreviate(m.calls)}
              </td>
              <td className="h-12 px-3 text-card-foreground">
                {abbreviate(m.tokens)}
              </td>
              <td className="h-12 px-3 text-card-foreground">
                ${m.cost.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
