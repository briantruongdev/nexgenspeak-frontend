import type { IFormTrialRegister } from '~/schemas/trial-register.schema'
import { apiTrialRegister } from '~/services'

export const useTrialRegister = () => {
  const { t } = useI18n()
  const isTrialRegisterModalVisible = useState<boolean>('trial-register-modal', () => false)
  const isProcessing = useState<boolean>('is-processing-trial-register', () => false)
  const { showSuccess, showError } = useNotification()

  const englishLevelOptions = computed(() => [
    { label: t('trialRegister.beginner'), value: 'BEGINNER' },
    { label: t('trialRegister.elementary'), value: 'ELEMENTARY' },
    { label: t('trialRegister.intermediate'), value: 'INTERMEDIATE' },
    { label: t('trialRegister.upperIntermediate'), value: 'UPPER-INTERMEDIATE' },
    { label: t('trialRegister.advanced'), value: 'ADVANCED' },
    { label: t('trialRegister.proficient'), value: 'PROFICIENT' }
  ])

  const openTrialRegisterModal = () => {
    isTrialRegisterModalVisible.value = true
  }

  const closeTrialRegisterModal = () => {
    isTrialRegisterModalVisible.value = false
  }

  const toggleTrialRegisterModal = () => {
    isTrialRegisterModalVisible.value = !isTrialRegisterModalVisible.value
  }

  const form = ref<IFormTrialRegister>({
    name: '',
    email: '',
    phone: '',
    englishLevel: ''
  })

  const onSubmit = async () => {
    try {
      isProcessing.value = true
      const data = {
        ...form.value,
        englishLevel: englishLevelOptions.value.find(item => item.value === form.value.englishLevel)?.label || ''
      }
      const { message } = await apiTrialRegister.register(data)
      showSuccess(message)
      form.value = {
        name: '',
        email: '',
        phone: '',
        englishLevel: ''
      }
      closeTrialRegisterModal()
    } catch (error) {
      console.error(error)
      showError(t('trialRegister.messageError'))
    } finally {
      isProcessing.value = false
    }
  }

  return {
    isTrialRegisterModalVisible,
    isProcessing,
    form,
    englishLevelOptions,

    openTrialRegisterModal,
    closeTrialRegisterModal,
    toggleTrialRegisterModal,
    onSubmit
  }
}
