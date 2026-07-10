import { create } from "zustand"

interface UIState {
  sidebarCollapsed: boolean
  theme: "light" | "dark" | "system"
  notificationPanelOpen: boolean
  userDrawerOpen: boolean
  userDrawerUserId: string | null
  confirmationDialog: {
    open: boolean
    title: string
    message: string
    variant: "default" | "destructive"
    onConfirm: (() => void) | null
  }

  toggleSidebar: () => void
  setSidebarCollapsed: (collapsed: boolean) => void
  setTheme: (theme: "light" | "dark" | "system") => void
  setNotificationPanelOpen: (open: boolean) => void
  openUserDrawer: (userId: string) => void
  closeUserDrawer: () => void
  showConfirmation: (params: Omit<UIState["confirmationDialog"], "open">) => void
  closeConfirmation: () => void
}

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,
  theme: "system",
  notificationPanelOpen: false,
  userDrawerOpen: false,
  userDrawerUserId: null,
  confirmationDialog: {
    open: false,
    title: "",
    message: "",
    variant: "default",
    onConfirm: null,
  },

  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  setTheme: (theme) => set({ theme }),
  setNotificationPanelOpen: (open) => set({ notificationPanelOpen: open }),
  openUserDrawer: (userId) => set({ userDrawerOpen: true, userDrawerUserId: userId }),
  closeUserDrawer: () => set({ userDrawerOpen: false, userDrawerUserId: null }),
  showConfirmation: (params) => set({ confirmationDialog: { open: true, ...params } }),
  closeConfirmation: () =>
    set((s) => ({
      confirmationDialog: { ...s.confirmationDialog, open: false, onConfirm: null },
    })),
}))
