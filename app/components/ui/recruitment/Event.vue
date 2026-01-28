<script setup lang="ts">
const src = '/images/contact-banner2.png'
</script>

<template>
  <div class="mt-24 max-sm:mt-12">
    <p class="container text-center title">{{ $t('recruitment.event.title') }}</p>
    <img :src alt="Banner" loading="lazy" class="h-screen w-screen object-cover mt-16 max-sm:mt-8 max-sm:h-[60vh]" />
  </div>
</template>

<style scoped></style>
