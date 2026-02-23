<script setup lang="ts">
import { SEO_DEFAULTS } from '~/config/seo-defaults'

useSeo({
  title: SEO_DEFAULTS.teachers.title,
  description: SEO_DEFAULTS.teachers.description,
  image: '/images/banner.png',
  breadcrumbs: [
    { name: 'Trang chủ', url: '/' },
    { name: 'Đội ngũ giáo viên', url: '/teachers' }
  ]
})
</script>

<template>
  <div>
    <UiTeacherBanner keepalive />
    <UiTeacherStaff keepalive />
    <UiTeacherExpertAdvisors keepalive />
    <UiTeacherEducationPhilosophy keepalive />
    <UiMap keepalive />
    <UiModalTrailRegister keepalive />
    <UiBackToTop keepalive />
  </div>
</template>

<style scoped></style>
