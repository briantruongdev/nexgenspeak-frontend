<script lang="ts" setup>
// Prevent layout shift on page load
onMounted(() => {
  document.documentElement.style.scrollBehavior = 'auto'
})
</script>

<template>
  <UApp :toaster="{ position: 'top-right' }">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
