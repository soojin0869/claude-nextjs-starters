/**
 * 견적서 상태값에 따른 배지 색상 클래스를 반환합니다.
 * invoice-view.tsx와 invoice-list-table.tsx 양쪽에서 공유합니다.
 */
export function getStatusBadgeClass(status: string): string {
  if (status === '대기') return 'bg-amber-100 text-amber-800'
  if (status === '완료' || status === '확정됨')
    return 'bg-green-100 text-green-800'
  if (status === '취소') return 'bg-red-100 text-red-700'
  return 'bg-gray-100 text-gray-700'
}
