/**
 * 어드민 쿠키 검증 유틸
 *
 * httpOnly 쿠키 기반의 어드민 인증을 처리합니다. (F010)
 * 별도 인증 라이브러리 없이 Next.js 기본 기능으로 구현합니다.
 */

import { createHmac } from 'crypto'
import { cookies } from 'next/headers'

/** 어드민 인증 쿠키 이름 */
export const ADMIN_COOKIE_NAME = 'admin_session'

/**
 * ADMIN_PASSWORD를 secret으로 사용한 HMAC-SHA256 서명 토큰을 생성합니다.
 * 고정된 페이로드('admin-session')에 서명하여 위변조를 방지합니다.
 */
function generateSessionToken(): string {
  const secret = process.env.ADMIN_PASSWORD ?? ''
  return createHmac('sha256', secret).update('admin-session').digest('hex')
}

/**
 * 현재 요청의 어드민 인증 쿠키를 검증합니다.
 * HMAC 서명 값과 비교하여 위변조된 쿠키를 거부합니다.
 * @returns 인증된 어드민이면 true, 아니면 false
 */
export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(ADMIN_COOKIE_NAME)

  if (!sessionCookie?.value) {
    return false
  }

  return sessionCookie.value === generateSessionToken()
}

/**
 * 어드민 인증 쿠키를 설정합니다. (로그인 성공 시 호출)
 * Server Action 내부에서 사용합니다.
 */
export async function setAdminCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(ADMIN_COOKIE_NAME, generateSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7일
    path: '/',
  })
}

/**
 * 어드민 인증 쿠키를 삭제합니다. (로그아웃 시 호출)
 * Server Action 내부에서 사용합니다.
 */
export async function deleteAdminCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_COOKIE_NAME)
}
