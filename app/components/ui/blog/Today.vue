<script setup lang="ts">
const items = ['/images/people4.png', '/images/people5.png', '/images/people3.png', '/images/people4.png', '/images/people5.png']
</script>

<template>
  <div class="container">
    <p class="title">Hôm nay Bạn có gì vui?</p>
    <p class="mt-8 w-2/3">
      Chúng tôi tạo ra môi trường để mỗi học viên có thể thực hành nhiều hơn. trò chuyện với giáo viên bản xứ một cách tự nhiên
      nhất. Và cuối cùng là sử dụng tiếng Anh nhuần nhuyễn
    </p>
    <div class="grid grid-cols-2 mt-20 gap-24">
      <div>
        <div class="space-y-10">
          <p class="text-2xl font-bold">Chia sẻ khoảnh khắc của bạn</p>
          <div class="flex justify-start gap-9 items-center">
            <div class="bg-[#EDEFF0] w-[100px] h-[100px] rounded-full"></div>
            <p class="text-xl font-bold opacity-50">Viết cảm nhận của bạn</p>
          </div>
          <div class="flex justify-between gap-8">
            <p
              class="bg-[#EDEFF0] w-full rounded-2xl text-center py-2 font-bold hover:cursor-pointer hover-scale-105 hover:text-primary"
            >
              Ảnh
            </p>
            <p
              class="bg-[#EDEFF0] w-full rounded-2xl text-center py-2 font-bold hover:cursor-pointer hover-scale-105 hover:text-primary"
            >
              Video
            </p>
          </div>
          <BaseButton text="Xác nhận" class="w-full" />
        </div>
        <UCarousel
          v-slot="{ item }"
          :items="items"
          loop
          arrows
          wheel-gestures
          prev-icon="i-lucide-chevron-left"
          next-icon="i-lucide-chevron-right"
          :ui="{
            item: 'basis-full basis-1/2',
            prev: 'hover:cursor-pointer bg-primary text-white shadow-none ring-0 focus:ring-0 hover:bg-primary/60',
            next: 'hover:cursor-pointer bg-primary text-white shadow-none ring-0 focus:ring-0 hover:bg-primary/60'
          }"
          class="w-full mt-32"
        >
          <img :src="item" width="320" height="320" class="object-cover" />
        </UCarousel>
      </div>
      <img src="/images/people2.png" alt="" class="h-[700px] object-cover" />
    </div>
  </div>
</template>

<style scoped></style>
