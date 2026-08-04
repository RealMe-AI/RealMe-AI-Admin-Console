"use client"

import { MoreHorizontal, Eye, Ban, UserCheck, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useUIStore } from "@/store/ui"
import { useSuspendUser, useUnsuspendUser, useDeleteUser } from "@/hooks/users"
import type { User } from "@/types/user"

interface UserActionsProps {
  user: User
}

export function UserActions({ user }: UserActionsProps) {
  const { openUserDrawer, showConfirmation } = useUIStore()
  const suspendUser = useSuspendUser()
  const unsuspendUser = useUnsuspendUser()
  const deleteUser = useDeleteUser()

  function handleSuspend() {
    showConfirmation({
      title: "Suspend user",
      message: `Are you sure you want to suspend ${user.name}? They will be locked out on their next login.`,
      variant: "default",
      onConfirm: () => suspendUser.mutate(user.id),
    })
  }

  function handleUnsuspend() {
    showConfirmation({
      title: "Unsuspend user",
      message: `Are you sure you want to unsuspend ${user.name}? They will be able to log in again.`,
      variant: "default",
      onConfirm: () => unsuspendUser.mutate(user.id),
    })
  }

  function handleDelete() {
    showConfirmation({
      title: "Delete user",
      message: `Are you sure you want to delete ${user.name}? This action cannot be undone.`,
      variant: "destructive",
      onConfirm: () => deleteUser.mutate(user.id),
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon-xs">
            <MoreHorizontal className="size-4" />
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={() => openUserDrawer(user.id)}>
          <Eye className="mr-2 size-4" />
          View
        </DropdownMenuItem>
        {user.status === "suspended" ? (
          <DropdownMenuItem onClick={handleUnsuspend}>
            <UserCheck className="mr-2 size-4" />
            Unsuspend
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={handleSuspend}>
            <Ban className="mr-2 size-4" />
            Suspend
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={handleDelete}>
          <Trash2 className="mr-2 size-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
