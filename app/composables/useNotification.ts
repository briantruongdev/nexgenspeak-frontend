export const useNotification = () => {
  const toast = useToast()
  const { t } = useI18n()

  const showError = (message: string) => {
    toast.add({
      title: t('notification.error'),
      description: message,
      color: 'error',
      icon: 'i-lucide-circle-x'
    })
  }

  const showSuccess = (message: string) => {
    toast.add({
      title: t('notification.success'),
      description: message,
      color: 'success',
      icon: 'i-lucide-circle-check'
    })
  }

  return {
    showError,
    showSuccess
  }
}
