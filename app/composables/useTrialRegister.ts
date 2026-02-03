import type { IFormTrialRegister } from '~/schemas/trial-register.schema'
import { apiTrialRegister } from '~/services'

export const useTrialRegister = () => {
  const { t } = useI18n()
  const isTrialRegisterModalVisible = useState<boolean>('trial-register-modal', () => false)
  const isProcessing = useState<boolean>('is-processing-trial-register', () => false)
  const agreePolicy = useState<boolean>('agree-policy', () => false)
  const showPolicy = useState<boolean>('show-policy', () => false)
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

  watch(agreePolicy, value => {
    if (value) {
      showPolicy.value = false
    }
  })

  const canTrailRegister = computed(() => form.value.name && form.value.email && form.value.phone && form.value.englishLevel)
  const onSubmit = async () => {
    if (!agreePolicy.value) {
      showPolicy.value = true
      return
    }

    try {
      isProcessing.value = true
      const data = {
        ...form.value,
        englishLevel: englishLevelOptions.value.find(item => item.value === form.value.englishLevel)?.label || ''
      }
      const { message } = await apiTrialRegister.register(data)
      showSuccess(message)
      closeTrialRegisterModal()
      resetForm()
    } catch (error) {
      console.error(error)
      showError(t('trialRegister.messageError'))
    } finally {
      isProcessing.value = false
    }
  }

  const resetForm = () => {
    form.value = {
      name: '',
      email: '',
      phone: '',
      englishLevel: ''
    }
    agreePolicy.value = false
    showPolicy.value = false
  }

  return {
    isTrialRegisterModalVisible,
    isProcessing,
    form,
    englishLevelOptions,
    canTrailRegister,
    agreePolicy,
    showPolicy,
    openTrialRegisterModal,
    closeTrialRegisterModal,
    toggleTrialRegisterModal,
    onSubmit,
    resetForm
  }
}
