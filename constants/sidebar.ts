import {
  LayoutDashboard,
  Users,
  Cpu,
  CreditCard,
  HelpCircle,
  FileQuestion,
  Settings,
  type LucideIcon,
} from "lucide-react"

export interface SidebarItemConfig {
  label: string
  href: string
  icon: LucideIcon
}

export const sidebarItems: SidebarItemConfig[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Users", href: "/users", icon: Users },
  { label: "AI Usage", href: "/ai-usage", icon: Cpu },
  { label: "Pricing", href: "/pricing", icon: CreditCard },
  { label: "Help & Support", href: "/help-support", icon: HelpCircle },
  { label: "FAQ", href: "/faq", icon: FileQuestion },
  { label: "Settings", href: "/settings", icon: Settings },
]
