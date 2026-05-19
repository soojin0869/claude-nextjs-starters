/**
 * GET /api/invoice/[id]
 *
 * Notion API로 특정 견적서 데이터를 조회합니다. (F001)
 * 인증 불필요한 공개 엔드포인트입니다.
 */

import { NextRequest, NextResponse } from 'next/server'
import { getInvoice } from '@/lib/notion/get-invoice'

interface RouteContext {
  params: Promise<{ id: string }>
}

export async function GET(
  _request: NextRequest,
  { params }: RouteContext
): Promise<NextResponse> {
  const { id } = await params

  if (!id) {
    return NextResponse.json(
      { error: '견적서 ID가 필요합니다.' },
      { status: 400 }
    )
  }

  const invoice = await getInvoice(id)

  if (!invoice) {
    return NextResponse.json(
      { error: '견적서를 찾을 수 없습니다.' },
      { status: 404 }
    )
  }

  return NextResponse.json(invoice)
}
