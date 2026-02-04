<script setup lang="ts">
const { t } = useI18n()

useSeo({
  title: () => t('pageTitle') || 'Chinh phục Tiếng Anh với NexGen Speak',
  description: () =>
    t('pageDescription') ||
    'Học Tiếng Anh trực tuyến với giáo viên bản xứ. Môi trường học tập tối ưu, phương pháp hiện đại, cam kết đầu ra.',
  image: '/images/banner.png'
})
</script>

<template>
  <div>
    <UiHomeBanner keepalive />
    <UiHomeRegister keepalive />
    <UiHomeTeachingStaff keepalive />
    <UiHomeBenefits keepalive />
    <UiHomeAbout keepalive />
    <UiHomeSlogan keepalive />
    <UiAuthSupport keepalive />
    <UiModalTrailRegister keepalive />
    <UiBackToTop keepalive />
  </div>
</template>

<style scoped></style>
