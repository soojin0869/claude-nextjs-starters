/**
 * 환경변수 검증 및 타입 안전성 보장
 *
 * Zod를 사용해 환경변수를 검증합니다.
 * 서버사이드 전용 변수와 클라이언트 공개 변수를 분리합니다.
 *
 * 주의: 실제 배포 전 .env.local 파일에 필수 변수를 모두 설정해야 합니다.
 * 참고: .env.example
 */

import { z } from 'zod'

/** 서버사이드 전용 환경변수 스키마 */
const serverEnvSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),

  // Notion (배포 시 필수)
  NOTION_API_KEY: z.string().optional(),
  NOTION_DATABASE_ID: z.string().optional(),

  // 어드민 대시보드 인증 (배포 시 필수)
  ADMIN_PASSWORD: z.string().optional(),

  // 발행자 정보 (견적서 하단 표시)
  ADMIN_NAME: z.string().optional(),
  ADMIN_EMAIL: z.string().email().optional(),
  ADMIN_PHONE: z.string().optional(),
})

/** 클라이언트 공개 환경변수 스키마 */
const clientEnvSchema = z.object({
  NEXT_PUBLIC_BASE_URL: z.string().url().optional(),
})

/**
 * 서버사이드 환경변수
 *
 * 주의: 이 객체는 서버 컴포넌트 및 서버사이드 코드에서만 사용하세요.
 */
export const serverEnv = serverEnvSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  NOTION_API_KEY: process.env.NOTION_API_KEY,
  NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  ADMIN_NAME: process.env.ADMIN_NAME,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PHONE: process.env.ADMIN_PHONE,
})

/** 클라이언트 공개 환경변수 */
export const clientEnv = clientEnvSchema.parse({
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
})

export type ServerEnv = z.infer<typeof serverEnvSchema>
export type ClientEnv = z.infer<typeof clientEnvSchema>
