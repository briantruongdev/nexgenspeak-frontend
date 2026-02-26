<script setup lang="ts">
const { t } = useI18n()

useSeo({
  title: () => t('seo.pages.studyPlan.title'),
  description: () => t('seo.pages.studyPlan.description'),
  breadcrumbs: () => [
    { name: t('seo.breadcrumbs.home'), url: '/' },
    { name: t('seo.breadcrumbs.studyPlan'), url: '/study-plan' }
  ],
  course: () => ({
    name: t('seo.pages.studyPlan.course.name'),
    description: t('seo.pages.studyPlan.course.description'),
    provider: 'NexGen Speak',
    url: '/study-plan'
  })
})
</script>

<template>
  <div>
    <UiHomeBanner keepalive />
    <!-- <UiStudyPlanTrialRegistration keepalive /> -->
    <UiStudyPlanLearningMethod keepalive />
    <UiStudyPlanAbout keepalive />
    <UiAuthSupport keepalive />
    <UiModalTrailRegister keepalive />
    <UiBackToTop keepalive />
  </div>
</template>

<style scoped></style>
