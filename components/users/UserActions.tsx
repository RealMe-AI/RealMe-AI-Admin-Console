"use client"

import { MoreHorizontal, Eye, Edit, Ban, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useUIStore } from "@/store/ui"
import type { User } from "@/types/user"

interface UserActionsProps {
  user: User
}

export function UserActions({ user }: UserActionsProps) {
  const { openUserDrawer, showConfirmation } = useUIStore()

  function handleDelete() {
    showConfirmation({
      title: "Delete user",
      message: `Are you sure you want to delete ${user.name}? This action cannot be undone.`,
      variant: "destructive",
      onConfirm: () => {
        console.log("Delete user:", user.id)
      },
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
        <DropdownMenuItem>
          <Edit className="mr-2 size-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Ban className="mr-2 size-4" />
          Suspend
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={handleDelete}>
          <Trash2 className="mr-2 size-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
