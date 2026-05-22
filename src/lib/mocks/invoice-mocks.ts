/**
 * 견적서 더미 데이터
 *
 * 개발 환경에서 Notion API 없이 UI를 확인하기 위한 목업 데이터입니다.
 * 실제 Invoice 및 InvoiceSummary 타입을 준수합니다.
 */

import type { Invoice, InvoiceSummary } from '@/lib/types/invoice'

/**
 * 단건 견적서 더미 데이터
 * 3개의 견적 항목을 포함하며 totalAmount는 items의 amount 합계와 일치합니다.
 */
export const MOCK_INVOICE: Invoice = {
  id: 'mock-invoice-001',
  title: '2026년 5월 웹사이트 개발 견적서',
  clientName: '김민준',
  clientEmail: 'minjun.kim@example.com',
  issueDate: '2026-05-01',
  dueDate: '2026-05-31',
  status: '발송됨',
  currency: 'KRW',
  note: '본 견적서는 발행일로부터 30일간 유효합니다.\n세금계산서 발행 가능합니다.\n문의사항은 이메일로 연락 주세요.',
  items: [
    {
      id: 'item-001',
      name: '웹사이트 기획 및 설계',
      quantity: 1,
      unitPrice: 1500000,
      amount: 1500000,
    },
    {
      id: 'item-002',
      name: '프론트엔드 개발 (Next.js)',
      quantity: 3,
      unitPrice: 2000000,
      amount: 6000000,
    },
    {
      id: 'item-003',
      name: 'UI/UX 디자인',
      quantity: 2,
      unitPrice: 1000000,
      amount: 2000000,
    },
  ],
  // totalAmount = 1,500,000 + 6,000,000 + 2,000,000 = 9,500,000
  totalAmount: 9500000,
}

/**
 * 어드민 목록용 견적서 요약 더미 데이터 (3건)
 */
export const MOCK_INVOICES: InvoiceSummary[] = [
  {
    id: 'mock-invoice-001',
    title: '2026년 5월 웹사이트 개발 견적서',
    clientName: '김민준',
    clientEmail: 'minjun.kim@example.com',
    issueDate: '2026-05-01',
    dueDate: '2026-05-31',
    status: '발송됨',
    currency: 'KRW',
    totalAmount: 9500000,
  },
  {
    id: 'mock-invoice-002',
    title: '모바일 앱 개발 견적서',
    clientName: '박서연',
    clientEmail: 'seoyeon.park@example.com',
    issueDate: '2026-04-15',
    dueDate: '2026-04-30',
    status: '확정됨',
    currency: 'KRW',
    totalAmount: 15000000,
  },
  {
    id: 'mock-invoice-003',
    title: '브랜딩 디자인 견적서',
    clientName: '이도현',
    clientEmail: null,
    issueDate: '2026-05-10',
    dueDate: null,
    status: '초안',
    currency: 'KRW',
    totalAmount: 3500000,
  },
]
