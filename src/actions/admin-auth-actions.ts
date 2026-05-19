'use server'

/**
 * 어드민 인증 Server Actions
 *
 * 어드민 로그인 및 로그아웃을 처리합니다. (F010)
 */

import { redirect } from 'next/navigation'
import { z } from 'zod'
import { deleteAdminCookie, setAdminCookie } from '@/lib/auth/admin-auth'

/** 로그인 폼 입력 스키마 */
const loginSchema = z.object({
  password: z.string().min(1, '비밀번호를 입력해 주세요.'),
})

/** Server Action 응답 타입 */
export interface ActionResult {
  success: boolean
  error?: string
}

/**
 * 어드민 로그인 Server Action
 * 환경변수 ADMIN_PASSWORD와 입력값을 비교하여 인증합니다.
 * 성공 시 httpOnly 쿠키를 발급하고 /admin으로 리다이렉트합니다.
 */
export async function adminLoginAction(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const parsed = loginSchema.safeParse({
    password: formData.get('password'),
  })

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? '입력값이 올바르지 않습니다.',
    }
  }

  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminPassword) {
    return {
      success: false,
      error: '서버 설정 오류가 발생했습니다. 관리자에게 문의해 주세요.',
    }
  }

  if (parsed.data.password !== adminPassword) {
    return {
      success: false,
      error: '비밀번호가 올바르지 않습니다.',
    }
  }

  await setAdminCookie()
  redirect('/admin')
}

/**
 * 어드민 로그아웃 Server Action
 * 어드민 쿠키를 삭제하고 /admin/login으로 리다이렉트합니다.
 */
export async function adminLogoutAction(): Promise<void> {
  await deleteAdminCookie()
  redirect('/admin/login')
}
