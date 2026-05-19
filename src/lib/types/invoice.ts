/**
 * 견적 항목 타입
 * Notion 페이지 본문의 Simple Table 블록 한 행을 나타냅니다.
 */
export interface InvoiceItem {
  /** 항목 고유 식별자 */
  id: string
  /** 서비스 또는 작업 이름 */
  name: string
  /** 수량 */
  quantity: number
  /** 단가 */
  unitPrice: number
  /** 금액 (수량 × 단가) */
  amount: number
}

/** 견적서 상태 */
export type InvoiceStatus = '초안' | '발송됨' | '확정됨'

/** 통화 단위 */
export type InvoiceCurrency = 'KRW' | 'USD'

/**
 * 견적서 타입
 * Notion 데이터베이스의 Invoice 페이지 한 건을 나타냅니다.
 */
export interface Invoice {
  /** Notion 페이지 ID */
  id: string
  /** 견적서 제목 */
  title: string
  /** 수신 클라이언트명 */
  clientName: string
  /** 클라이언트 이메일 (선택) */
  clientEmail: string | null
  /** 발행일 (ISO date 문자열) */
  issueDate: string
  /** 견적 유효기간 (선택, ISO date 문자열) */
  dueDate: string | null
  /** 견적 상태 */
  status: InvoiceStatus
  /** 통화 단위 */
  currency: InvoiceCurrency
  /** 하단 메모 또는 결제 안내 (선택) */
  note: string | null
  /** 견적 항목 목록 */
  items: InvoiceItem[]
  /** 합계 금액 */
  totalAmount: number
}

/**
 * 어드민 대시보드 목록용 견적서 요약 타입
 * 목록 조회 시 전체 items 없이 핵심 필드만 포함합니다.
 */
export type InvoiceSummary = Omit<Invoice, 'items' | 'note'>
