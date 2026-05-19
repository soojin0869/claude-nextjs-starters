/**
 * 견적서 없음 에러 페이지 (F011)
 *
 * 존재하지 않는 견적서 ID로 접근했을 때 표시됩니다.
 */

export default function InvoiceNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <p className="text-muted-foreground mb-2 text-sm font-medium tracking-wide uppercase">
          404
        </p>
        <h1 className="mb-4 text-3xl font-bold text-gray-900">
          견적서를 찾을 수 없습니다
        </h1>
        <p className="mb-8 text-gray-500">
          요청하신 견적서가 존재하지 않거나 삭제되었습니다.
          <br />
          견적서 URL이 올바른지 확인하시거나 발행자에게 문의해 주세요.
        </p>
      </div>
    </div>
  )
}
