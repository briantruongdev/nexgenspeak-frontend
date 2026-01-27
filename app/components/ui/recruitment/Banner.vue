<script setup lang="ts">
const img = '/images/contact-banner.png'
</script>

<template>
  <div class="relative">
    <img :src="img" alt="Banner" loading="lazy" class="h-screen w-screen object-cover" />
    <div class="container">
      <p class="absolute bg-primary px-12 py-5 rounded-2xl bottom-10 text-4xl font-bold text-white w-1/2">
        Chọn một công việc bạn yêu thích và kiến tạo tương lai theo ý bạn
      </p>
    </div>
  </div>
</template>

<style scoped></style>
