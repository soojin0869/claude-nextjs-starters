/**
 * 견적서 상세 페이지 (SSR, 공개)
 *
 * 클라이언트가 공유 URL로 접속하여 견적서를 확인하고 PDF를 다운로드하는 페이지입니다.
 * 인증 없이 공개 접근 가능합니다. (F001, F002, F003)
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getInvoice } from '@/lib/notion/get-invoice'
import { InvoiceView } from '@/components/invoice/invoice-view'
import { PdfDownloadButton } from '@/components/invoice/pdf-download-button'

interface InvoicePageProps {
  params: Promise<{ id: string }>
}

/** 페이지 메타데이터 동적 생성 */
export async function generateMetadata({
  params,
}: InvoicePageProps): Promise<Metadata> {
  const { id } = await params
  const invoice = await getInvoice(id)

  if (!invoice) {
    return { title: '견적서를 찾을 수 없습니다' }
  }

  return {
    title: invoice.title,
    description: `${invoice.clientName} 앞으로 발행된 견적서입니다.`,
  }
}

export default async function InvoicePage({ params }: InvoicePageProps) {
  const { id } = await params
  const invoice = await getInvoice(id)

  // 견적서가 존재하지 않으면 not-found.tsx 표시
  if (!invoice) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 print:bg-white print:py-0">
      <div className="mx-auto max-w-3xl px-4">
        {/* PDF 다운로드 버튼 (인쇄 시 숨김) */}
        <div className="mb-6 flex justify-end print:hidden">
          <PdfDownloadButton invoiceTitle={invoice.title} />
        </div>

        {/* 견적서 본문 */}
        <div id="invoice-content">
          <InvoiceView invoice={invoice} />
        </div>
      </div>
    </div>
  )
}
