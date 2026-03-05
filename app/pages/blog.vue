<script setup lang="ts">
const { t } = useI18n()

useSeo({
  title: () => t('seo.pages.blog.title'),
  description: () => t('seo.pages.blog.description'),
  titleKey: 'seo.pages.blog.title',
  descriptionKey: 'seo.pages.blog.description',
  breadcrumbs: () => [
    { name: t('seo.breadcrumbs.home'), url: '/' },
    { name: t('seo.breadcrumbs.blog'), url: '/blog' }
  ],
  breadcrumbKeys: [
    { nameKey: 'seo.breadcrumbs.home', url: '/' },
    { nameKey: 'seo.breadcrumbs.blog', url: '/blog' }
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
