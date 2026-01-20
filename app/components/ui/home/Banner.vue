<script setup lang="ts"></script>

<template>
  <div class="relative w-full">
    <img src="/images/banner.png" alt="Banner" loading="lazy" />
    <div class="absolute inset-0 top-1/6">
      <div class="container">
        <p class="text-6xl font-bold text-white mb-10">
          Chinh phục Tiếng Anh <br />
          Với NexGen Speak
        </p>

        <UButton
          class="rounded-xl bg-white hover:bg-white text-primary cursor-pointer hover-scale-105 flex items-center leading-none"
          size="lg"
        >
          <template #leading>
            <BaseIcon name="arrow-right" class="shrink-0" />
          </template>
          <span class="leading-none">Tìm hiểu thêm</span>
        </UButton>
      </div>
    </div>
    <div class="absolute bottom-16 inset-x-0">
      <div class="container">
        <div class="flex justify-start items-center gap-2 mb-4">
          <div v-for="(item, index) in 3" :key="index">
            <p class="w-2 h-2 rounded-full bg-white"></p>
          </div>
        </div>
        <USeparator orientation="horizontal" size="lg" class="w-2/6" />

        <p class="gap-4 flex mt-4">
          <UButton class="rounded-xl bg-white hover:bg-white text-text-primary cursor-pointer hover-scale-105" size="lg"
            >Đăng kí học thử miễn
          </UButton>
          <UButton class="rounded-xl bg-white hover:bg-white text-text-primary cursor-pointer hover-scale-105" size="lg"
            >Mua khóa luyện thi</UButton
          >
          <UButton class="rounded-xl bg-white hover:bg-white text-text-primary cursor-pointer hover-scale-105" size="lg"
            >Hỗ trợ</UButton
          >
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
