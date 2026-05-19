/**
 * PDF 생성 유틸
 *
 * html2canvas + jspdf를 사용해 렌더링된 DOM을 캡처하여 PDF를 생성합니다. (F003)
 * 브라우저 클라이언트 측에서만 실행되는 함수입니다.
 *
 * 설치: npm install html2canvas jspdf
 */

// TODO: html2canvas, jspdf 설치 후 아래 주석을 해제하세요
// import html2canvas from 'html2canvas'
// import jsPDF from 'jspdf'

/**
 * 특정 DOM 엘리먼트를 PDF로 생성하여 다운로드합니다.
 * @param elementId - PDF로 변환할 DOM 엘리먼트의 id
 * @param fileName - 다운로드될 PDF 파일명 (예: "견적서_2026-05.pdf")
 */
export async function generatePdf(
  elementId: string,
  fileName: string
): Promise<void> {
  // TODO: html2canvas, jspdf 설치 후 구현
  // 1. document.getElementById(elementId) 로 엘리먼트 선택
  // 2. html2canvas(element, { scale: 2 }) 로 고해상도 캔버스 생성
  // 3. new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' }) 인스턴스 생성
  // 4. pdf.addImage(...) 로 캔버스 이미지를 PDF에 추가
  // 5. pdf.save(fileName) 으로 다운로드 트리거

  void elementId
  void fileName

  throw new Error(
    'PDF 생성 기능은 html2canvas, jspdf 패키지 설치 후 구현 예정입니다.'
  )
}
