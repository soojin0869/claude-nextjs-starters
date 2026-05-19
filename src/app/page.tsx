/**
 * 루트 페이지
 *
 * 루트 경로(/) 접근 시 어드민 대시보드(/admin)로 리다이렉트합니다.
 * 클라이언트는 직접 /invoice/[id] URL로 접근합니다.
 */

import { redirect } from 'next/navigation'

export default function RootPage() {
  redirect('/admin')
}
