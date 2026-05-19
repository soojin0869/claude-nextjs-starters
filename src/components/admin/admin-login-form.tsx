'use client'

/**
 * 어드민 로그인 폼 컴포넌트 (F010)
 *
 * React Hook Form + Zod로 검증하고 Server Action으로 인증합니다.
 * 클라이언트 컴포넌트입니다.
 */

import { useActionState } from 'react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  adminLoginAction,
  type ActionResult,
} from '@/actions/admin-auth-actions'

const initialState: ActionResult | null = null

export function AdminLoginForm() {
  const [state, formAction, isPending] = useActionState(
    adminLoginAction,
    initialState
  )
  const [showPassword, setShowPassword] = useState(false)

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="password">패스워드</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="어드민 패스워드를 입력해 주세요"
            autoComplete="current-password"
            required
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600"
            aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
          >
            {showPassword ? (
              <EyeOffIcon className="h-4 w-4" />
            ) : (
              <EyeIcon className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* 에러 메시지 */}
      {state && !state.success && state.error && (
        <p className="text-sm text-red-500">{state.error}</p>
      )}

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? '로그인 중...' : '로그인'}
      </Button>
    </form>
  )
}
