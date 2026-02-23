<script setup lang="ts">
import { SEO_DEFAULTS } from '~/config/seo-defaults'

useSeo({
  title: SEO_DEFAULTS.recruitment.title,
  description: SEO_DEFAULTS.recruitment.description,
  breadcrumbs: [
    { name: 'Trang chủ', url: '/' },
    { name: 'Tuyển dụng', url: '/recruitment' }
  ]
})
</script>

<template>
  <div>
    <UiRecruitmentBanner keepalive />
    <UiRecruitmentDifference keepalive />
    <UiRecruitmentCultureAndCoreValues keepalive />
    <UiRecruitmentShare keepalive />
    <UiRecruitmentDevelopment class="mb-12!" keepalive />
    <UiModalTrailRegister keepalive />
    <UiBackToTop keepalive />

    <!-- <UiRecruitmentEvent /> -->
  </div>
</template>

<style scoped></style>
