<script setup lang="ts">
import { UiDocumentFamilyAndFriend } from '#components'

const { t } = useI18n()

useSeo({
  title: () => t('seo.pages.document.title'),
  description: () => t('seo.pages.document.description'),
  breadcrumbs: () => [
    { name: t('seo.breadcrumbs.home'), url: '/' },
    { name: t('seo.breadcrumbs.document'), url: '/document' }
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
