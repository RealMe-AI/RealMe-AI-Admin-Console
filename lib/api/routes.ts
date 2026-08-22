export const API_ROUTES = {
  auth: {
    login: "/auth/admin/login",
    googleSignin: "/auth/admin/google",
  },
  admin: {
    // user management
    users: {
      list: "/admin/users",
      detail: (id: string) => `/admin/users/${id}`,
      suspend: (id: string) => `/admin/users/${id}/suspend`,
      unsuspend: (id: string) => `/admin/users/${id}/unsuspend`,
      delete: (id: string) => `/admin/users/${id}`,
    },
    // dashboard
    dashboard: {
      stats: "/admin/dashboard/stats",
      usageChart: "/admin/dashboard/usage-chart",
      activities: "/admin/dashboard/activities",
    },
    // ai usage
    aiUsage: {
      stats: "/admin/ai-usage/stats",
      byLanguage: "/admin/ai-usage/by-language",
      dailyCost: "/admin/ai-usage/daily-cost",
      byModel: "/admin/ai-usage/by-model",
      logs: "/admin/ai-usage/logs",
    },
    // support
    support: {
      sendEmail: "/admin/support/send-email",
    },
  },
};
