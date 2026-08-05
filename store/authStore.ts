import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthState } from "@/types/authStore";

let setHasHydrated: (value: boolean) => void = () => {};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => {
      setHasHydrated = (value) => set({ _hasHydrated: value });
      return {
        accessToken: null,
        isAdmin: false,
        _hasHydrated: false,
        setAuth: ({ accessToken, isAdmin }) =>
          set({ accessToken, isAdmin }),
        clearAuth: () => set({ accessToken: null, isAdmin: false }),
      };
    },
    {
      name: "realme_ai_admin_auth",
      partialize: (state) => ({
        accessToken: state.accessToken,
        isAdmin: state.isAdmin,
      }),
      onRehydrateStorage: () => () => {
        setHasHydrated(true);
      },
    },
  ),
);
    