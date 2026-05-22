/**
 * 공통 포맷 유틸리티 함수
 *
 * 날짜, 통화, 숫자 형식 변환 함수를 제공합니다.
 * 컴포넌트에서 인라인으로 중복 정의하던 로직을 통합합니다.
 */

import type { InvoiceCurrency } from '@/lib/types/invoice'

/**
 * 날짜 문자열을 한국식 날짜 형식으로 변환합니다.
 * @param dateStr ISO 날짜 문자열 또는 null
 * @returns 한국식 날짜 문자열 (예: "2026년 5월 19일") 또는 '-'
 * @example formatDate("2026-05-19") → "2026년 5월 19일"
 * @example formatDate(null) → "-"
 */
export function formatDate(dateStr: string | null): string {
  if (!dateStr) return '-'
  const date = new Date(dateStr)
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * 금액을 통화 형식으로 변환합니다.
 * @param amount 금액 숫자
 * @param currency 통화 단위 (KRW 또는 USD)
 * @returns 통화 기호가 포함된 형식 문자열 (예: "₩1,500,000")
 * @example formatCurrency(1500000, "KRW") → "₩1,500,000"
 */
export function formatCurrency(
  amount: number,
  currency: InvoiceCurrency
): string {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency,
  }).format(amount)
}

/**
 * 숫자를 천 단위 구분 기호로 포맷합니다.
 * @param value 포맷할 숫자
 * @returns 천 단위 구분 기호가 포함된 문자열 (예: "1,500,000")
 * @example formatNumber(1500000) → "1,500,000"
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('ko-KR').format(value)
}
