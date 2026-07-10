"use client"

import { useUIStore } from "@/store/ui"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function ConfirmationDialog() {
  const { confirmationDialog, closeConfirmation } = useUIStore()
  const { open, title, message, variant, onConfirm } = confirmationDialog

  function handleConfirm() {
    onConfirm?.()
    closeConfirmation()
  }

  return (
    <Dialog open={open} onOpenChange={(open) => !open && closeConfirmation()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={closeConfirmation}>
            Cancel
          </Button>
          <Button variant={variant === "destructive" ? "destructive" : "default"} onClick={handleConfirm}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
