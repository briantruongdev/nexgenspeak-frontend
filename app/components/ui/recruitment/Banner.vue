<script setup lang="ts">
const img = '/images/contact-banner.png'
</script>

<template>
  <div class="relative">
    <img :src="img" alt="Banner" loading="lazy" class="h-screen w-screen object-cover max-sm:h-[60vh]" />
    <div class="container max-xl:px-6">
      <p
        class="absolute bg-primary px-12 py-5 rounded-2xl bottom-10 text-4xl font-bold text-white w-1/2 max-sm:w-fit max-sm:mr-6 max-sm:text-xl"
      >
        {{ $t('recruitment.banner.title') }}
      </p>
    </div>
  </div>
</template>

<style scoped></style>
