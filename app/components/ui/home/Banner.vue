<script setup lang="ts"></script>
<template>
  <div class="relative">
    <img src="/images/banner.png" alt="Banner" loading="lazy" />
    <div class="absolute top-1/6 left-1/7">
      <p class="text-6xl font-bold text-white mb-10">
        Chinh phục Tiếng Anh <br />
        Với NexGen Speak
      </p>
      <UButton
        class="rounded-xl bg-white hover:bg-white text-primary cursor-pointer transform transition-transform duration-300 ease-out hover:scale-105 flex items-center leading-none"
        size="lg"
      >
        <template #leading>
          <BaseIcon name="arrow-right" class="shrink-0" />
        </template>
        <span class="leading-none">Tìm hiểu thêm</span>
      </UButton>
    </div>
    <div class="absolute bottom-1/16 left-1/7">
      <USeparator orientation="horizontal" class="h-1" />

      <p class="gap-4 flex mt-4">
        <UButton
          class="rounded-xl bg-white hover:bg-white text-text-primary cursor-pointer transform transition-transform duration-300 ease-out hover:scale-105"
          size="lg"
          >Đăng kí học thử miễn
        </UButton>
        <UButton
          class="rounded-xl bg-white hover:bg-white text-text-primary cursor-pointer transform transition-transform duration-300 ease-out hover:scale-105"
          size="lg"
          >Mua khóa luyện thi</UButton
        >
        <UButton
          class="rounded-xl bg-white hover:bg-white text-text-primary cursor-pointer transform transition-transform duration-300 ease-out hover:scale-105"
          size="lg"
          >Hỗ trợ</UButton
        >
      </p>
    </div>
  </div>
</template>

<style scoped></style>
