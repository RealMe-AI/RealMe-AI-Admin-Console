import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthState } from "@/types/authStore";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      setAuth: ({ access_token, user }) =>
        set({ accessToken: access_token, user }),
      clearAuth: () => set({ accessToken: null, user: null }),
    }),
    {
      name: "realme_ai_admin_auth",
    },
  ),
);
