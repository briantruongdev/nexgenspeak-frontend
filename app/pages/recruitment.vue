<script setup lang="ts">
const { t } = useI18n()

useSeo({
  title: () => t('seo.pages.recruitment.title'),
  description: () => t('seo.pages.recruitment.description'),
  breadcrumbs: () => [
    { name: t('seo.breadcrumbs.home'), url: '/' },
    { name: t('seo.breadcrumbs.recruitment'), url: '/recruitment' }
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
