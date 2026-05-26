/**
 * Notion 클라이언트 초기화
 *
 * @notionhq/client 패키지를 사용해 서버사이드 전용 Notion API 클라이언트를 생성합니다.
 *
 * 설정:
 *   .env.local 파일에 NOTION_API_KEY, NOTION_DATABASE_ID 환경변수를 추가하세요.
 *   .env.example 파일 참조
 */

import { Client } from '@notionhq/client'

/**
 * Notion API 클라이언트 싱글톤 인스턴스
 * 서버사이드에서만 사용해야 합니다.
 */
export const notion = new Client({ auth: process.env.NOTION_API_KEY })

/** 견적서 데이터베이스 ID */
export const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID ?? ''
