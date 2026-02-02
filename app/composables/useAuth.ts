import { storeToRefs } from 'pinia'
import type { IFormForgotPassword, IFormLogin, IFormRegister } from '~/schemas/auth.schema'
import { apiAuth } from '~/services'
import { useAuthStore } from '~/stores/auth.store'

export const useAuth = () => {
  const { showSuccess, showError } = useNotification()
  const { accessTokenCookie } = storeToRefs(useAuthStore())
  const { t } = useI18n()

  const isProcessing = ref(false)
  const formLogin = ref<IFormLogin>({
    email: '',
    password: ''
  })

  const handleLogin = async () => {
    try {
      isProcessing.value = true

      const data = await apiAuth.login(formLogin.value)
      showSuccess(data.message)
      accessTokenCookie.value = data.token
      localStorage.setItem('email', data.user.email)

      formLogin.value = {
        email: '',
        password: ''
      }
      navigateTo('/')
    } catch (error) {
      console.error(error)
      showError(t('auth.messageLoginFail'))
    } finally {
      isProcessing.value = false
    }
  }

  const formRegister = ref<IFormRegister>({
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })

  const handleRegister = async () => {
    try {
      isProcessing.value = true

      const data = await apiAuth.register(formRegister.value)
      showSuccess(data.message)

      formRegister.value = {
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
      }
      navigateTo('/login')
    } catch (error) {
      console.error(error)
      showError(t('auth.createAccountFail'))
    } finally {
      isProcessing.value = false
    }
  }

  const formResetPassword = ref<IFormForgotPassword>({
    email: '',
    newPassword: '',
    confirmNewPassword: ''
  })

  const handleResetPassword = async () => {
    try {
      isProcessing.value = true

      const data = await apiAuth.resetPassword(formResetPassword.value)
      showSuccess(data.message)
      formResetPassword.value = {
        email: '',
        newPassword: '',
        confirmNewPassword: ''
      }
      navigateTo('/login')
    } catch (error) {
      console.error(error)
      showError(t('auth.createAccountFail'))
    } finally {
      isProcessing.value = false
    }
  }

  return { isProcessing, formLogin, formRegister, formResetPassword, handleLogin, handleRegister, handleResetPassword }
}
