/**
 * Next.js 미들웨어
 *
 * /admin 경로 접근 시 어드민 인증 쿠키를 확인하고,
 * 미인증 상태이면 /admin/login으로 리다이렉트합니다. (F010)
 */

import { NextRequest, NextResponse } from 'next/server'

// crypto 모듈은 Edge Runtime 비지원이므로 admin-auth.ts를 직접 import하지 않음
const ADMIN_COOKIE_NAME = 'admin_session'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // /admin/login은 미들웨어 검사에서 제외 (무한 리다이렉트 방지)
  if (pathname === '/admin/login') {
    return NextResponse.next()
  }

  // /admin 하위 경로 접근 시 쿠키 존재 여부 확인 (값 검증은 Server Component에서 수행)
  if (pathname.startsWith('/admin')) {
    const sessionCookie = request.cookies.get(ADMIN_COOKIE_NAME)

    if (!sessionCookie?.value) {
      // 미인증 상태 → 로그인 페이지로 리다이렉트
      const loginUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  // 미들웨어를 적용할 경로 패턴
  matcher: ['/admin/:path*'],
}
