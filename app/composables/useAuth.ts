import { storeToRefs } from 'pinia'
import type { IFormLogin } from '~/schemas/auth.schema'
import { apiAuth } from '~/services'
import { useAuthStore } from '~/stores/auth.store'

export const useAuth = () => {
  const { showSuccess, showError } = useNotification()
  const { email, accessTokenCookie } = storeToRefs(useAuthStore())
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
      showError(t('trialRegister.messageError'))
    } finally {
      isProcessing.value = false
    }
  }

  return { isProcessing, formLogin, handleLogin }
}
