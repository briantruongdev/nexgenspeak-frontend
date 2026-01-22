<script lang="ts" setup>
const { t } = useI18n()

useSeo({
  title: t('pageTitle') || 'Chinh phục Tiếng Anh với NexGen Speak',
  description:
    t('pageDescription') ||
    'Học Tiếng Anh trực tuyến với giáo viên bản xứ. Môi trường học tập tối ưu, phương pháp hiện đại, cam kết đầu ra.',
  image: '/images/banner.png'
})
</script>

<template>
  <NuxtLayout>
    <UApp>
      <NuxtPage />
    </UApp>
  </NuxtLayout>
</template>
