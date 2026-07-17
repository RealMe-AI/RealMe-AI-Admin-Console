import { Loader2 } from "lucide-react";

export function Loader({ className }: { className?: string }) {
  return (
    <div className="flex items-center justify-center">
      <Loader2 className={`animate-spin ${className}`} />
    </div>
  );
}
