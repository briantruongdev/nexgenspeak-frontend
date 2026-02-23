<script setup lang="ts">
import { SEO_DEFAULTS } from '~/config/seo-defaults'

useSeo({
  title: SEO_DEFAULTS.blog.title,
  description: SEO_DEFAULTS.blog.description,
  image: '/images/banner.png',
  breadcrumbs: [
    { name: 'Trang chủ', url: '/' },
    { name: 'Blog', url: '/blog' }
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
