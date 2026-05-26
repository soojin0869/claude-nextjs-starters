/**
 * 단건 견적서 조회
 *
 * Notion 페이지 ID로 특정 견적서 데이터를 조회합니다. (F001)
 * 서버사이드 전용 함수입니다.
 *
 * 항목(항목명/수량/단가/금액)은 별도 DB의 relation 페이지에서 조회합니다.
 */

import { unstable_cache } from 'next/cache'
import type { Invoice, InvoiceItem } from '@/lib/types/invoice'
import type { NotionPropertyMap } from '@/lib/types/notion'

import { notion } from './client'
import {
  extractDate,
  extractFormulaNumber,
  extractNumber,
  extractRelation,
  extractRichText,
  extractStatus,
  extractTitle,
} from './mappers'

/**
 * relation 페이지 ID로 견적 항목을 가져옵니다.
 */
async function fetchInvoiceItems(itemIds: string[]): Promise<InvoiceItem[]> {
  const items: InvoiceItem[] = []

  for (const id of itemIds) {
    const page = await notion.pages.retrieve({ page_id: id })
    if (!('properties' in page)) continue

    const props = page.properties as unknown as NotionPropertyMap

    items.push({
      id: page.id,
      name: extractTitle(props, '항목명'),
      quantity: extractNumber(props, '수량') ?? 0,
      unitPrice: extractNumber(props, '단가') ?? 0,
      amount: extractFormulaNumber(props, '금액') ?? 0,
    })
  }

  return items
}

async function fetchInvoice(id: string): Promise<Invoice | null> {
  try {
    const page = await notion.pages.retrieve({ page_id: id })

    if (!('properties' in page)) return null

    // 아카이브(삭제) 처리된 페이지인 경우 null 반환
    if ('in_trash' in page && page.in_trash) return null

    const props = page.properties as unknown as NotionPropertyMap

    // 항목 relation IDs 추출 후 각 페이지에서 세부 데이터 조회
    const itemIds = extractRelation(props, '항목')
    const items = await fetchInvoiceItems(itemIds)

    const totalAmount = extractNumber(props, '총 금액') ?? 0

    const invoice: Invoice = {
      id: page.id,
      title: extractTitle(props, '견적서 번호'),
      clientName: extractRichText(props, '클라이언트명') ?? '',
      clientEmail: null, // DB에 이메일 필드 없음
      issueDate: extractDate(props, '발행일') ?? '',
      dueDate: extractDate(props, '유효기간'),
      status: extractStatus(props, '상태') ?? '대기',
      currency: 'KRW', // DB에 통화 필드 없음, 기본값 사용
      note: null, // DB에 메모 필드 없음
      items,
      totalAmount,
    }

    return invoice
  } catch (error) {
    const isNotFound =
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code: string }).code === 'object_not_found'

    if (isNotFound) return null

    if (process.env.NODE_ENV === 'development') {
      console.warn('[getInvoice] 개발환경 오류, null 반환:', error)
      return null
    }
    throw error
  }
}

/**
 * Notion 페이지 ID로 견적서 단건을 조회합니다.
 * @param id - Notion 페이지 ID
 * @returns 견적서 데이터 또는 null (존재하지 않는 경우)
 */
export const getInvoice = unstable_cache(fetchInvoice, ['invoice'], {
  revalidate: 60,
  tags: ['invoice'],
})
