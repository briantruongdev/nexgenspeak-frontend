<script lang="ts" setup>
const _appConfig = useAppConfig()
const { locale } = useI18n()

useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [{ rel: 'icon', href: '/images/logo.png' }],
  htmlAttrs: {
    lang: locale
  }
})
</script>

<template>
  <NuxtLayout>
    <UApp>
      <NuxtPage />
    </UApp>
  </NuxtLayout>
</template>
