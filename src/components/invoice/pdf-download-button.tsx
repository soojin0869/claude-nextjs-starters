'use client'

/**
 * PDF 다운로드 버튼 컴포넌트 (F003)
 *
 * 클라이언트 컴포넌트입니다.
 * 버튼 클릭 시 html2canvas + jspdf로 견적서 DOM을 PDF로 변환하여 다운로드합니다.
 */

import { useState } from 'react'
import { DownloadIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { generatePdf } from '@/lib/pdf/generate-pdf'

interface PdfDownloadButtonProps {
  /** 견적서 제목 (PDF 파일명에 사용) */
  invoiceTitle: string
}

export function PdfDownloadButton({ invoiceTitle }: PdfDownloadButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleDownload = async () => {
    setIsLoading(true)
    try {
      // invoice-view.tsx에서 id="invoice-content"로 지정한 엘리먼트를 캡처
      await generatePdf('invoice-content', `${invoiceTitle}.pdf`)
    } catch (error) {
      // TODO: 에러 처리 (sonner 토스트 알림 연동)
      console.error('PDF 생성 중 오류가 발생했습니다:', error)
      alert('PDF 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleDownload}
      disabled={isLoading}
      variant="default"
      size="sm"
    >
      <DownloadIcon className="mr-2 h-4 w-4" />
      {isLoading ? 'PDF 생성 중...' : 'PDF 다운로드'}
    </Button>
  )
}
