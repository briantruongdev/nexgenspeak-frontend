<script setup lang="ts">
import { UiDocumentFamilyAndFriend } from '#components'
import { SEO_DEFAULTS } from '~/config/seo-defaults'

useSeo({
  title: SEO_DEFAULTS.document.title,
  description: SEO_DEFAULTS.document.description,
  breadcrumbs: [
    { name: 'Trang chủ', url: '/' },
    { name: 'Tài liệu', url: '/document' }
  ]
})
</script>

<template>
  <div>
    <!-- <UiDocumentBanner /> -->
    <UiDocumentArchive keepalive />
    <UiDocumentFamilyAndFriend keepalive />
    <UiDocumentExamPreparation keepalive />
    <UiModalTrailRegister keepalive />
    <UiBackToTop keepalive />
  </div>
</template>

<style scoped></style>
