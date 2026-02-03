<script setup lang="ts">
const src = '/images/document-banner.png'
</script>

<template>
  <div class="relative">
    <img :src alt="Banner" loading="lazy" class="h-[60vh] w-screen object-cover max-lg:h-[60vh]" />
    <div class="absolute top-40 bg-primary text-white left-80">
      <p class="title text-center text-white!">{{ $t('document.archive.title') }}</p>
      <p class="text-lg font-medium mt-10 text-center max-sm:text-sm max-md:mt-6">
        {{ $t('document.archive.description1') }}
      </p>
    </div>
  </div>
</template>

<style scoped></style>
