import { storeToRefs } from 'pinia'
import type { IFormForgotPassword, IFormLogin, IFormRegister } from '~/schemas/auth.schema'
import { apiAuth } from '~/services'
import { useAuthStore } from '~/stores/auth.store'

export const useAuth = () => {
  const { showSuccess, showError } = useNotification()
  const { accessTokenCookie, email } = storeToRefs(useAuthStore())
  const { t } = useI18n()

  const isProcessing = ref(false)
  const formLogin = ref<IFormLogin>({
    email: '',
    password: ''
  })
  const canLogin = computed(() => formLogin.value.email && formLogin.value.password)

  const handleLogin = async () => {
    try {
      isProcessing.value = true

      const data = await apiAuth.login(formLogin.value)
      showSuccess(data.message)
      accessTokenCookie.value = data.token
      email.value = data.user.email

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
  const canRegister = computed(
    () =>
      formRegister.value.email && formRegister.value.phone && formRegister.value.password && formRegister.value.confirmPassword
  )
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
  const canResetPassword = computed(
    () => formResetPassword.value.email && formResetPassword.value.newPassword && formResetPassword.value.confirmNewPassword
  )

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

  const handleLogout = () => {
    accessTokenCookie.value = null
    email.value = ''
    navigateTo('/')
  }

  return {
    isProcessing,
    formLogin,
    formRegister,
    formResetPassword,
    canLogin,
    canRegister,
    canResetPassword,
    handleLogin,
    handleRegister,
    handleResetPassword,
    handleLogout
  }
}
