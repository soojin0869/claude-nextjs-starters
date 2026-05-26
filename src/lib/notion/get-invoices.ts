/**
 * 견적서 목록 조회
 *
 * Notion 데이터베이스 전체의 견적서 목록을 조회합니다. (F005)
 * 서버사이드 전용 함수입니다.
 *
 * @notionhq/client v5에서 databases.query가 제거되었고,
 * dataSources.query는 일반 DB에 동작하지 않으므로
 * Notion REST API에 직접 fetch를 사용합니다.
 */

import type { InvoiceSummary } from '@/lib/types/invoice'
import type { NotionPropertyMap } from '@/lib/types/notion'

import { NOTION_DATABASE_ID } from './client'
import {
  extractDate,
  extractNumber,
  extractRichText,
  extractStatus,
  extractTitle,
} from './mappers'

/** Notion REST API에서 반환되는 페이지 객체의 최소 형태 */
interface NotionPageObject {
  object: string
  id: string
  in_trash: boolean
  properties: NotionPropertyMap
}

/** Notion databases.query REST 응답 형태 */
interface NotionQueryResponse {
  results: NotionPageObject[]
  code?: string
  message?: string
}

/**
 * Notion 데이터베이스에서 전체 견적서 목록을 조회합니다.
 * 발행일(issue_date) 내림차순으로 정렬되어 반환됩니다.
 *
 * @notionhq/client v5에서 databases.query가 제거되어
 * REST API에 직접 fetch로 POST /databases/{id}/query 를 호출합니다.
 *
 * @returns 견적서 요약 목록
 */
export async function getInvoices(): Promise<InvoiceSummary[]> {
  const NOTION_API_KEY = process.env.NOTION_API_KEY ?? ''

  try {
    // Notion REST API에 직접 fetch - SDK v5에서 databases.query가 제거됨
    const res = await fetch(
      `https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${NOTION_API_KEY}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // 실제 Notion DB 속성명은 한국어 '발행일' (영문 매핑 없음)
          sorts: [{ property: '발행일', direction: 'descending' }],
        }),
        // Next.js 캐시: 어드민에서 변경 시 갱신될 수 있도록 캐시 없음
        cache: 'no-store',
      }
    )

    if (!res.ok) {
      const errorBody = (await res.json()) as {
        code?: string
        message?: string
      }
      console.error(
        `[getInvoices] Notion API 오류: ${errorBody.code} - ${errorBody.message}`
      )
      return []
    }

    const response = (await res.json()) as NotionQueryResponse

    // API 레벨 오류 코드 확인 (HTTP 200이어도 오류가 올 수 있음)
    if (response.code) {
      console.error(
        `[getInvoices] Notion 응답 오류: ${response.code} - ${response.message}`
      )
      return []
    }

    const summaries: InvoiceSummary[] = []

    for (const page of response.results) {
      // object가 'page'인 항목만 처리 (database 행)
      if (page.object !== 'page') continue

      // 아카이브(삭제) 처리된 페이지는 제외
      if (page.in_trash) continue

      // Notion 속성 맵을 우리 타입으로 캐스팅
      const props = page.properties as unknown as NotionPropertyMap

      const summary: InvoiceSummary = {
        id: page.id,
        title: extractTitle(props, '견적서 번호'),
        clientName: extractRichText(props, '클라이언트명') ?? '',
        clientEmail: null, // DB에 이메일 필드 없음
        issueDate: extractDate(props, '발행일') ?? '',
        dueDate: extractDate(props, '유효기간'),
        status: extractStatus(props, '상태') ?? '대기',
        currency: 'KRW', // DB에 통화 필드 없음, 기본값 사용
        totalAmount: extractNumber(props, '총 금액') ?? 0,
      }

      summaries.push(summary)
    }

    return summaries
  } catch (error) {
    // 네트워크 오류 등 예상치 못한 오류 처리
    console.error('[getInvoices] 예상치 못한 오류:', error)
    throw error
  }
}
