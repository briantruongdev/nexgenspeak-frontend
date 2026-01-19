<script lang="ts" setup>
const appConfig = useAppConfig()
useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [{ rel: 'icon', href: '/images/icon.png' }],
  htmlAttrs: {
    lang: 'en'
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
