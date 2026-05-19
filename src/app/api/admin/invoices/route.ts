/**
 * GET /api/admin/invoices
 *
 * Notion 데이터베이스 전체 견적서 목록을 조회합니다. (F005)
 * 어드민 쿠키 인증이 필요한 엔드포인트입니다.
 */

import { NextResponse } from 'next/server'
import { isAdminAuthenticated } from '@/lib/auth/admin-auth'
import { getInvoices } from '@/lib/notion/get-invoices'

export async function GET(): Promise<NextResponse> {
  // 어드민 쿠키 검증
  const authenticated = await isAdminAuthenticated()

  if (!authenticated) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
  }

  const invoices = await getInvoices()

  return NextResponse.json(invoices)
}
