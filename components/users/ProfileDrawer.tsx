"use client"

import { X } from "lucide-react"
import { useUIStore } from "@/store/ui"
import { users } from "@/data/users"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export function ProfileDrawer() {
  const { userDrawerOpen, userDrawerUserId, closeUserDrawer } = useUIStore()
  const user = users.find((u) => u.id === userDrawerUserId)

  if (!userDrawerOpen || !user) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 bg-black/10 backdrop-blur-xs" onClick={closeUserDrawer} />
      <div className="relative flex h-full w-full max-w-sm flex-col border-l border-border bg-card shadow-lg animate-in slide-in-from-right">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-sm font-semibold text-card-foreground">User Profile</h2>
          <Button variant="ghost" size="icon-xs" onClick={closeUserDrawer}>
            <X className="size-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <div className="flex flex-col items-center gap-3 pb-5 border-b border-border">
            <Avatar className="size-16">
              <AvatarFallback className="text-lg font-medium bg-primary text-primary-foreground">
                {user.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h3 className="text-base font-semibold text-card-foreground">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <div className="space-y-4 pt-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Status</p>
                <StatusBadge status={user.status} />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Plan</p>
                <StatusBadge status={user.plan} />
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-muted-foreground">Location</p>
              <p className="text-sm text-card-foreground">
                {user.city}, {user.country}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-muted-foreground">Joined</p>
              <p className="text-sm text-card-foreground">
                {new Date(user.joinedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-muted-foreground">Total API Calls</p>
              <p className="text-sm text-card-foreground">
                {user.totalUsage.toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-muted-foreground">Total Sessions</p>
              <p className="text-sm text-card-foreground">
                {user.totalSessions.toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-muted-foreground">Last Active</p>
              <p className="text-sm text-card-foreground">
                {new Date(user.lastActive).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
