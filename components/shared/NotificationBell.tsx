"use client";

import {
  Bell,
  ArrowUp,
  BarChart3,
  UserPlus,
  Bug,
  Cog,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { notifications } from "@/data/notifications";
import { cn } from "@/utils/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const typeIcons: Record<string, LucideIcon> = {
  upgrade: ArrowUp,
  usage: BarChart3,
  users: UserPlus,
  bug: Bug,
  system: Cog,
};

const typeColors: Record<string, string> = {
  upgrade: "bg-success/10 text-success",
  usage: "bg-info/10 text-info",
  users: "bg-primary/10 text-primary",
  bug: "bg-destructive/10 text-destructive",
  system: "bg-muted text-muted-foreground",
};

export function NotificationBell() {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="size-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
                {unreadCount}
              </span>
            )}
          </Button>
        }
      />
      <SheetContent side="right" className="w-80 p-0">
        <SheetHeader className="border-b border-border px-5 py-3">
          <SheetTitle className="text-sm font-medium">Notifications</SheetTitle>
        </SheetHeader>
        <div className="max-h-[calc(100vh-8rem)] space-y-0.5 overflow-y-auto p-2">
          {notifications.map((n) => {
            const Icon = typeIcons[n.type];
            return (
              <button
                key={n.id}
                type="button"
                className={cn(
                  "flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-muted",
                  !n.read && "bg-muted/50",
                )}
              >
                <div
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-lg",
                    typeColors[n.type],
                  )}
                >
                  <Icon className="size-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-foreground truncate">
                      {n.title}
                    </span>
                    {!n.read && (
                      <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {n.description}
                  </p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {n.timestamp}
                </span>
              </button>
            );
          })}
        </div>
        <div className="border-t border-border p-3">
          <Button variant="ghost" size="sm" className="w-full text-xs">
            View all notifications
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
