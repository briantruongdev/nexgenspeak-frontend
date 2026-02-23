<script setup lang="ts">
import { SEO_DEFAULTS } from '~/config/seo-defaults'

useSeo({
  title: SEO_DEFAULTS.contact.title,
  description: SEO_DEFAULTS.contact.description,
  breadcrumbs: [
    { name: 'Trang chủ', url: '/' },
    { name: 'Liên hệ', url: '/contact' }
  ]
})
</script>

<template>
  <div>
    <!-- <UiContactBanner /> -->
    <UiContactIntro keepalive />
    <UiContactDepartment keepalive />
    <UiContact keepalive />
    <UiContactMission keepalive />
    <UiAuthSupport keepalive />
    <UiModalTrailRegister keepalive />
    <UiBackToTop keepalive />
  </div>
</template>

<style scoped></style>
