import { Invoice, InvoiceSummary } from '@/lib/types/invoice'

/** 견적서 단건 응답 타입 */
export type InvoiceResponse = Invoice

/** 견적서 목록 응답 타입 */
export type InvoiceListResponse = InvoiceSummary[]

/** API 에러 응답 타입 */
export interface ErrorResponse {
  error: string
}

/** 어드민 인증 상태 타입 */
export interface AdminAuthState {
  isAuthenticated: boolean
}
