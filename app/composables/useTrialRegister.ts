import type { IFormTrialRegister } from '~/schemas/trial-register.schema'

export const useTrialRegister = () => {
  const { t } = useI18n()
  const isTrialRegisterModalVisible = useState<boolean>('trial-register-modal', () => false)
  const isProcessing = useState<boolean>('is-processing-trial-register', () => false)

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
  const formRef = ref()
  const form = ref<IFormTrialRegister>({
    name: '',
    email: '',
    phone: '',
    englishLevel: ''
  })

  const onSubmit = async () => {
    try {
      const isValid = await formRef.value?.validate()
      if (!isValid) {
        return
      }
      isProcessing.value = true
    } catch (error) {
      console.error(error)
    } finally {
      isProcessing.value = false
    }
  }

  return {
    isTrialRegisterModalVisible,
    isProcessing,
    formRef,
    form,
    englishLevelOptions,

    openTrialRegisterModal,
    closeTrialRegisterModal,
    toggleTrialRegisterModal,
    onSubmit
  }
}
