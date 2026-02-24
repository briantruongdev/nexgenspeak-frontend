<script setup lang="ts">
import { SEO_DEFAULTS } from '~/config/seo-defaults'

useSeo({
  title: SEO_DEFAULTS.studyPlan.title,
  description: SEO_DEFAULTS.studyPlan.description,
  image: '/images/banner.png',
  breadcrumbs: [
    { name: 'Trang chủ', url: '/' },
    { name: 'Kế hoạch học tập & Học phí', url: '/study-plan' }
  ],
  course: {
    name: 'Khóa học tiếng Anh 1 kèm 1 Online',
    description:
      'Chương trình học tiếng Anh online 1:1 với giáo viên bản xứ. Lộ trình cá nhân hóa, cam kết đầu ra. NexGen Speak.',
    provider: 'NexGen Speak',
    url: '/study-plan'
  }
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
