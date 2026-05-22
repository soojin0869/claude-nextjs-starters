import { z } from 'zod'

/** 어드민 로그인 폼 입력 스키마 */
export const loginSchema = z.object({
  password: z.string().min(1, '비밀번호를 입력해 주세요.'),
})

/** 로그인 폼 값 타입 */
export type LoginFormValues = z.infer<typeof loginSchema>
