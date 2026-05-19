/**
 * 어드민 쿠키 검증 유틸
 *
 * httpOnly 쿠키 기반의 어드민 인증을 처리합니다. (F010)
 * 별도 인증 라이브러리 없이 Next.js 기본 기능으로 구현합니다.
 */

import { cookies } from 'next/headers'

/** 어드민 인증 쿠키 이름 */
export const ADMIN_COOKIE_NAME = 'admin_session'

/**
 * 현재 요청의 어드민 인증 쿠키를 검증합니다.
 * @returns 인증된 어드민이면 true, 아니면 false
 */
export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(ADMIN_COOKIE_NAME)

  if (!sessionCookie?.value) {
    return false
  }

  // TODO: 쿠키 값 검증 로직 구현
  // 단순 값 비교 또는 서명된 토큰 검증 방식 선택
  return sessionCookie.value === 'authenticated'
}

/**
 * 어드민 인증 쿠키를 설정합니다. (로그인 성공 시 호출)
 * Server Action 내부에서 사용합니다.
 */
export async function setAdminCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(ADMIN_COOKIE_NAME, 'authenticated', {
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
