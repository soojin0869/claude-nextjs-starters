/**
 * 어드민 로그인 페이지 (F010)
 *
 * 어드민 대시보드 접근을 위한 패스워드 인증 페이지입니다.
 * /admin 접근 시 미인증 상태이면 미들웨어가 이 페이지로 리다이렉트합니다.
 */

import type { Metadata } from 'next'
import { LockIcon } from 'lucide-react'
import { AdminLoginForm } from '@/components/admin/admin-login-form'

export const metadata: Metadata = {
  title: '어드민 로그인',
  description: '어드민 대시보드에 접근하려면 로그인이 필요합니다.',
}

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="w-full max-w-sm">
        <div className="rounded-xl border bg-white p-8 shadow-md">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
              <LockIcon className="h-6 w-6 text-gray-600" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              어드민 로그인
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              견적서 관리 대시보드에 접근하려면 패스워드를 입력해 주세요.
            </p>
          </div>
          <AdminLoginForm />
        </div>
      </div>
    </div>
  )
}
