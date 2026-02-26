<script setup lang="ts">
const { t } = useI18n()

useSeo({
  title: () => t('seo.pages.home.title'),
  description: () => t('seo.pages.home.description'),
  breadcrumbs: () => [{ name: t('seo.breadcrumbs.home'), url: '/' }]
})
</script>

<template>
  <div>
    <UiHomeBanner keepalive />
    <UiHomeRegister keepalive />
    <UiHomeRoadmap keepalive />
    <UiHomeTeachingStaff keepalive />
    <UiHomeBenefits keepalive />
    <UiHomeAbout keepalive />
    <UiHomeSlogan keepalive />
    <UiHomeReview keepalive />
    <UiAuthSupport keepalive />
    <UiModalTrailRegister keepalive />
    <UiBackToTop keepalive />
  </div>
</template>

<style scoped></style>
