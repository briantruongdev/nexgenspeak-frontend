<script setup lang="ts">
const { t } = useI18n()

useSeo({
  title: () => t('seo.pages.blog.title'),
  description: () => t('seo.pages.blog.description'),
  breadcrumbs: () => [
    { name: t('seo.breadcrumbs.home'), url: '/' },
    { name: t('seo.breadcrumbs.blog'), url: '/blog' }
  ]
})
</script>

<template>
  <div>
    <!-- <UiBlogBanner /> -->
    <UiBlogToday keepalive />
    <UiBlogMomentShared keepalive />
    <UiBlogShared keepalive />
    <UiModalTrailRegister keepalive />
    <UiBackToTop keepalive />
  </div>
</template>

<style scoped></style>
