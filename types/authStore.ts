export type AuthState = {
  accessToken: string | null
  isAdmin: boolean
  _hasHydrated: boolean
  setAuth: (payload: { accessToken: string; isAdmin: boolean }) => void
  clearAuth: () => void
}
