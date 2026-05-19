/**
 * 단건 견적서 조회
 *
 * Notion 페이지 ID로 특정 견적서 데이터를 조회합니다. (F001)
 * 서버사이드 전용 함수입니다.
 */

import type { Invoice } from '@/lib/types/invoice'

/**
 * Notion 페이지 ID로 견적서 단건을 조회합니다.
 * @param id - Notion 페이지 ID
 * @returns 견적서 데이터 또는 null (존재하지 않는 경우)
 */
export async function getInvoice(id: string): Promise<Invoice | null> {
  // TODO: @notionhq/client 설치 후 구현
  // 1. notion.pages.retrieve({ page_id: id }) 로 페이지 속성 조회
  // 2. notion.blocks.children.list({ block_id: id }) 로 본문 블록(테이블) 조회
  // 3. 속성과 테이블 블록을 Invoice 타입으로 매핑하여 반환
  // 4. 페이지가 없거나 아카이브된 경우 null 반환

  void id // 미사용 파라미터 경고 억제 (구현 전 임시)
  return null
}
