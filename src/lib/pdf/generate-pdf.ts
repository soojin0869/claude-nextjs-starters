/**
 * PDF 생성 유틸 (F003)
 *
 * html-to-image + jspdf UMD 빌드를 public/libs에서 동적 로딩하여 PDF를 생성합니다.
 * html-to-image는 SVG foreignObject 방식으로 브라우저가 CSS를 직접 렌더링하므로
 * TailwindCSS v4의 oklch/lab 색상 함수를 html2canvas와 달리 네이티브하게 지원합니다.
 */

declare global {
  interface Window {
    htmlToImage: {
      toCanvas: (
        element: HTMLElement,
        options?: { pixelRatio?: number; cacheBust?: boolean }
      ) => Promise<HTMLCanvasElement>
    }
    jspdf: {
      jsPDF: new (options: {
        orientation: string
        unit: string
        format: string
      }) => {
        internal: {
          pageSize: { getWidth: () => number; getHeight: () => number }
        }
        addPage: () => void
        addImage: (
          data: string,
          format: string,
          x: number,
          y: number,
          w: number,
          h: number
        ) => void
        save: (filename: string) => void
      }
    }
  }
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve()
      return
    }
    const script = document.createElement('script')
    script.src = src
    script.onload = () => resolve()
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`))
    document.head.appendChild(script)
  })
}

/**
 * 특정 DOM 엘리먼트를 PDF로 생성하여 다운로드합니다.
 * data-pdf-hide 속성이 있는 엘리먼트는 캡처 중 임시로 숨겨집니다.
 *
 * @param elementId - PDF로 변환할 DOM 엘리먼트의 id
 * @param fileName - 다운로드될 PDF 파일명 (예: "견적서-2026-05-26.pdf")
 */
export async function generatePdf(
  elementId: string,
  fileName: string
): Promise<void> {
  const element = document.getElementById(elementId)
  if (!element) throw new Error(`Element #${elementId} not found`)

  await Promise.all([
    loadScript('/libs/html-to-image.js'),
    loadScript('/libs/jspdf.umd.min.js'),
  ])

  // data-pdf-hide 속성 엘리먼트를 캡처 전 임시 숨김
  const hideEls = element.querySelectorAll<HTMLElement>('[data-pdf-hide]')
  hideEls.forEach(el => {
    el.dataset.prevVisibility = el.style.visibility
    el.style.visibility = 'hidden'
  })

  try {
    const canvas = await window.htmlToImage.toCanvas(element, {
      pixelRatio: 2,
      cacheBust: true,
    })

    const imgData = canvas.toDataURL('image/png')
    const pdf = new window.jspdf.jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })

    const pageW = pdf.internal.pageSize.getWidth()
    const pageH = pdf.internal.pageSize.getHeight()
    const imgW = pageW
    const imgH = (canvas.height * pageW) / canvas.width

    let page = 0
    let remaining = imgH
    while (remaining > 0) {
      if (page > 0) pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, -page * pageH, imgW, imgH)
      remaining -= pageH
      page++
    }

    pdf.save(fileName)
  } finally {
    hideEls.forEach(el => {
      el.style.visibility = el.dataset.prevVisibility ?? ''
      delete el.dataset.prevVisibility
    })
  }
}
