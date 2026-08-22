"use client"

import { useMutation } from "@tanstack/react-query"
import { PostRequest } from "@/lib/api/api"
import { API_ROUTES } from "@/lib/api/routes"
import type {
  SupportEmailRequest,
  SupportEmailResponse,
} from "@/types/support"

export function useSendSupportEmail() {
  return useMutation({
    mutationFn: (payload: SupportEmailRequest) =>
      PostRequest<SupportEmailResponse>(
        API_ROUTES.admin.support.sendEmail,
        payload
      ),
  })
}
