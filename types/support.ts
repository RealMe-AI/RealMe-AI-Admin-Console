export type SupportEmailTarget = "all" | "particular"

export interface SupportEmailRequest {
  target: SupportEmailTarget
  recipientEmail?: string
  subject: string
  message: string
}

export interface SupportEmailResponse {
  target: SupportEmailTarget
  recipientEmail?: string
  sent: number
  failed: number
  total: number
}
