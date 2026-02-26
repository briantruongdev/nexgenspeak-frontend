<script setup lang="ts">
const { t } = useI18n()

useSeo({
  title: () => t('seo.pages.contact.title'),
  description: () => t('seo.pages.contact.description'),
  breadcrumbs: () => [
    { name: t('seo.breadcrumbs.home'), url: '/' },
    { name: t('seo.breadcrumbs.contact'), url: '/contact' }
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
