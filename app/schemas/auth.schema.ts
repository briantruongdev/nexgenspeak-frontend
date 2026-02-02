import { z } from 'zod'
import { PASSWORD_REGEX, PHONE_REGEX } from '~/constants'

export function loginSchema(t: (key: string) => string) {
  return z.object({
    email: z.email({ message: t('auth.invalidEmail') }).min(1, { message: t('auth.emailIsRequired') }),
    password: z.string().regex(PASSWORD_REGEX, {
      message: t('validation.password')
    })
  })
}

export function forgotPassword(t: (key: string) => string) {
  return z
    .object({
      email: z.email({ message: t('auth.invalidEmail') }).min(1, { message: t('auth.emailIsRequired') }),

      newPassword: z.string().regex(PASSWORD_REGEX, {
        message: t('validation.newPassword')
      }),
      confirmNewPassword: z.string().min(1, t('auth.confirmNewPasswordIsRequired'))
    })
    .refine(data => data.newPassword === data.confirmNewPassword, {
      path: ['confirmNewPassword'],
      message: t('auth.newPasswordsDoNotMatch')
    })
}

export function registerSchema(t: (key: string) => string) {
  return z
    .object({
      email: z.email({ message: t('auth.invalidEmail') }).min(1, { message: t('auth.emailIsRequired') }),
      phone: z.string().min(1, t('auth.phoneNumberIsRequired')).regex(PHONE_REGEX, t('auth.phoneNumberInvalid')),

      password: z.string().regex(PASSWORD_REGEX, {
        message: t('validation.password')
      }),
      confirmPassword: z.string().min(1, t('auth.confirmPasswordIsRequired'))
    })
    .refine(data => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
      message: t('auth.passwordsDoNotMatch')
    })
}

// Types
export type IFormLogin = z.infer<ReturnType<typeof loginSchema>>
export type IFormForgotPassword = z.infer<ReturnType<typeof forgotPassword>>
export type IFormRegister = z.infer<ReturnType<typeof registerSchema>>
