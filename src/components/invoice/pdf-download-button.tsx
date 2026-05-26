'use client'

/**
 * PDF 다운로드 버튼 컴포넌트 (F003)
 *
 * 버튼 클릭 시 html2canvas + jspdf로 견적서 DOM을 PDF로 변환하여 다운로드합니다.
 */

import { useState } from 'react'
import { DownloadIcon } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { generatePdf } from '@/lib/pdf/generate-pdf'

interface PdfDownloadButtonProps {
  invoiceTitle: string
}

export function PdfDownloadButton({ invoiceTitle }: PdfDownloadButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleDownload = async () => {
    setIsLoading(true)
    try {
      const today = new Date().toISOString().slice(0, 10)
      await generatePdf('invoice-content', `${invoiceTitle}-${today}.pdf`)
      toast.success('PDF가 다운로드되었습니다.')
    } catch {
      toast.error(
        'PDF 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'
      )
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
