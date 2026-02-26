<script setup lang="ts">
import { SEO_DEFAULTS } from '~/config/seo-defaults'

useSeo({
  title: SEO_DEFAULTS.home.title,
  description: SEO_DEFAULTS.home.description,
  breadcrumbs: [{ name: 'Trang chủ', url: '/' }]
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
