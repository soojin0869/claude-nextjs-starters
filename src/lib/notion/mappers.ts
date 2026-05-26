/**
 * Notion 속성(properties) → 도메인 타입 변환 유틸리티
 *
 * Notion API 응답의 다양한 속성 타입을 안전하게 추출합니다.
 * 모든 함수는 속성이 없거나 타입이 맞지 않는 경우 null 또는 빈 문자열을 반환합니다.
 */

import type { NotionPropertyMap } from '@/lib/types/notion'

/**
 * Title 속성에서 plain_text 문자열을 추출합니다.
 * @param properties - Notion 페이지 속성 맵
 * @param key - 속성 키 이름
 * @returns 제목 문자열 (없으면 빈 문자열)
 */
export function extractTitle(
  properties: NotionPropertyMap,
  key: string
): string {
  const prop = properties[key]
  if (!prop || prop.type !== 'title') return ''
  return prop.title.map(t => t.plain_text).join('')
}

/**
 * Rich Text 속성에서 plain_text 문자열을 추출합니다.
 * @param properties - Notion 페이지 속성 맵
 * @param key - 속성 키 이름
 * @returns 리치텍스트 문자열 또는 null (없는 경우)
 */
export function extractRichText(
  properties: NotionPropertyMap,
  key: string
): string | null {
  const prop = properties[key]
  if (!prop || prop.type !== 'rich_text') return null
  const text = prop.rich_text.map(t => t.plain_text).join('')
  return text.length > 0 ? text : null
}

/**
 * Date 속성에서 시작일(start) ISO 날짜 문자열을 추출합니다.
 * @param properties - Notion 페이지 속성 맵
 * @param key - 속성 키 이름
 * @returns ISO date 문자열 또는 null (없는 경우)
 */
export function extractDate(
  properties: NotionPropertyMap,
  key: string
): string | null {
  const prop = properties[key]
  if (!prop || prop.type !== 'date') return null
  return prop.date?.start ?? null
}

/**
 * Select 속성에서 선택된 옵션 이름을 추출합니다.
 * @param properties - Notion 페이지 속성 맵
 * @param key - 속성 키 이름
 * @returns 선택 옵션 이름 또는 null (없는 경우)
 */
export function extractSelect(
  properties: NotionPropertyMap,
  key: string
): string | null {
  const prop = properties[key]
  if (!prop || prop.type !== 'select') return null
  return prop.select?.name ?? null
}

/**
 * Email 속성에서 이메일 문자열을 추출합니다.
 * @param properties - Notion 페이지 속성 맵
 * @param key - 속성 키 이름
 * @returns 이메일 문자열 또는 null (없는 경우)
 */
export function extractEmail(
  properties: NotionPropertyMap,
  key: string
): string | null {
  const prop = properties[key]
  if (!prop || prop.type !== 'email') return null
  return prop.email ?? null
}

/**
 * Number 속성에서 숫자 값을 추출합니다.
 * @param properties - Notion 페이지 속성 맵
 * @param key - 속성 키 이름
 * @returns 숫자 또는 null (없는 경우)
 */
export function extractNumber(
  properties: NotionPropertyMap,
  key: string
): number | null {
  const prop = properties[key]
  if (!prop || prop.type !== 'number') return null
  return prop.number ?? null
}

/**
 * Status 속성에서 상태 이름을 추출합니다. (Select와 다른 Notion 전용 타입)
 * @param properties - Notion 페이지 속성 맵
 * @param key - 속성 키 이름
 * @returns 상태 이름 문자열 또는 null (없는 경우)
 */
export function extractStatus(
  properties: NotionPropertyMap,
  key: string
): string | null {
  const prop = properties[key]
  if (!prop || prop.type !== 'status') return null
  return prop.status?.name ?? null
}

/**
 * Relation 속성에서 관계 페이지 ID 목록을 추출합니다.
 * @param properties - Notion 페이지 속성 맵
 * @param key - 속성 키 이름
 * @returns 관계 페이지 ID 배열
 */
export function extractRelation(
  properties: NotionPropertyMap,
  key: string
): string[] {
  const prop = properties[key]
  if (!prop || prop.type !== 'relation') return []
  return prop.relation.map(r => r.id)
}

/**
 * Formula(number) 속성에서 계산된 숫자 값을 추출합니다.
 * @param properties - Notion 페이지 속성 맵
 * @param key - 속성 키 이름
 * @returns 계산된 숫자 또는 null (없는 경우)
 */
export function extractFormulaNumber(
  properties: NotionPropertyMap,
  key: string
): number | null {
  const prop = properties[key]
  if (!prop || prop.type !== 'formula') return null
  if (prop.formula.type !== 'number') return null
  return (
    (prop.formula as { type: 'number'; number: number | null }).number ?? null
  )
}
