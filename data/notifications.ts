export interface Notification {
  id: string
  type: "upgrade" | "usage" | "users" | "bug" | "system"
  title: string
  description: string
  timestamp: string
  read: boolean
}

export const notifications: Notification[] = [
  {
    id: "notif-001",
    type: "upgrade",
    title: "Plan Upgrade",
    description: "John upgraded to Pro plan",
    timestamp: "2 minutes ago",
    read: false,
  },
  {
    id: "notif-002",
    type: "usage",
    title: "Usage Alert",
    description: "API usage reached 75% of monthly limit",
    timestamp: "1 hour ago",
    read: false,
  },
  {
    id: "notif-003",
    type: "users",
    title: "New Users",
    description: "5 new users registered today",
    timestamp: "3 hours ago",
    read: false,
  },
  {
    id: "notif-004",
    type: "bug",
    title: "Bug Report",
    description: "New bug report from Kwame Asante",
    timestamp: "6 hours ago",
    read: true,
  },
  {
    id: "notif-005",
    type: "system",
    title: "System Update",
    description: "v2.4.1 deployed successfully",
    timestamp: "1 day ago",
    read: true,
  },
  {
    id: "notif-006",
    type: "usage",
    title: "Cost Threshold",
    description: "Monthly costs exceeded $10,000",
    timestamp: "2 days ago",
    read: true,
  },
  {
    id: "notif-007",
    type: "upgrade",
    title: "Enterprise Trial",
    description: "Acme Corp started enterprise trial",
    timestamp: "3 days ago",
    read: true,
  },
]
