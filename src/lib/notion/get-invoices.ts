/**
 * 견적서 목록 조회
 *
 * Notion 데이터베이스 전체의 견적서 목록을 조회합니다. (F005)
 * 서버사이드 전용 함수입니다.
 */

import type { InvoiceSummary } from '@/lib/types/invoice'

/**
 * Notion 데이터베이스에서 전체 견적서 목록을 조회합니다.
 * @returns 견적서 요약 목록 (발행일 내림차순 정렬)
 */
export async function getInvoices(): Promise<InvoiceSummary[]> {
  // TODO: @notionhq/client 설치 후 구현
  // 1. notion.databases.query({ database_id: NOTION_DATABASE_ID }) 로 전체 목록 조회
  // 2. sorts 옵션으로 issue_date 내림차순 정렬
  // 3. 각 페이지를 InvoiceSummary 타입으로 매핑하여 반환

  return []
}
