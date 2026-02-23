<script setup lang="ts">
import { SEO_DEFAULTS } from '~/config/seo-defaults'

const { t } = useI18n()

useSeo({
  title: () => t('pageTitle') || SEO_DEFAULTS.home.title,
  description: () => t('pageDescription') || SEO_DEFAULTS.home.description,
  image: '/images/banner.png',
  breadcrumbs: [{ name: 'Trang chủ', url: '/' }]
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
