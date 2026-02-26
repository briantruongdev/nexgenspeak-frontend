<script setup lang="ts">
const { t } = useI18n()

useSeo({
  title: () => t('seo.pages.teachers.title'),
  description: () => t('seo.pages.teachers.description'),
  breadcrumbs: () => [
    { name: t('seo.breadcrumbs.home'), url: '/' },
    { name: t('seo.breadcrumbs.teachers'), url: '/teachers' }
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
