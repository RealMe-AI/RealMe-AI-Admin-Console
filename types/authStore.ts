export type AuthUser = {
  id: string;
  email: string;
};

export type AuthState = {
  accessToken: string | null;
  user: AuthUser | null;
  setAuth: (payload: {
    access_token: string;
    user: AuthUser;
  }) => void;
  clearAuth: () => void;
};