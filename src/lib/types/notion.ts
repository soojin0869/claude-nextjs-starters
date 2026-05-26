/** Notion 텍스트 콘텐츠 */
export interface NotionTextContent {
  plain_text: string
  href: string | null
}

/** Notion 제목 속성 */
export interface NotionTitleProperty {
  type: 'title'
  title: NotionTextContent[]
}

/** Notion 리치텍스트 속성 */
export interface NotionRichTextProperty {
  type: 'rich_text'
  rich_text: NotionTextContent[]
}

/** Notion 날짜 속성 */
export interface NotionDateProperty {
  type: 'date'
  date: { start: string; end: string | null } | null
}

/** Notion 셀렉트 속성 */
export interface NotionSelectProperty {
  type: 'select'
  select: { name: string } | null
}

/** Notion 이메일 속성 */
export interface NotionEmailProperty {
  type: 'email'
  email: string | null
}

/** Notion 숫자 속성 */
export interface NotionNumberProperty {
  type: 'number'
  number: number | null
}

/** Notion 상태 속성 (select와 다른 별도 타입) */
export interface NotionStatusProperty {
  type: 'status'
  status: { name: string; color: string } | null
}

/** Notion 관계 속성 */
export interface NotionRelationProperty {
  type: 'relation'
  relation: { id: string }[]
  has_more: boolean
}

/** Notion 수식 속성 */
export interface NotionFormulaProperty {
  type: 'formula'
  formula: { type: 'number'; number: number | null } | { type: string }
}

/** Notion 속성 값 유니온 타입 */
export type NotionPropertyValue =
  | NotionTitleProperty
  | NotionRichTextProperty
  | NotionDateProperty
  | NotionSelectProperty
  | NotionEmailProperty
  | NotionNumberProperty
  | NotionStatusProperty
  | NotionRelationProperty
  | NotionFormulaProperty

/** Notion 속성 맵 (lib/notion/mappers.ts에서 사용) */
export interface NotionPropertyMap {
  [key: string]: NotionPropertyValue
}

/** Notion Invoice 페이지 */
export interface NotionInvoicePage {
  id: string
  properties: NotionPropertyMap
}
