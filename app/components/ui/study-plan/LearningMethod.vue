<script setup lang="ts">
const items = [
  {
    image: '/images/study-plan-5.png',
    title: 'Tập chung vào giao tiếp phản xạ',
    des: 'Chúng tôi tạo ra môi trường để mỗi học viên có thể thực hành nhiều hơn - giao tiếp, trò chuyện'
  },
  {
    image: '/images/benefit2.png',
    title: 'Hiệu quả trong thời gian nhanh nhất',
    des: 'Chúng tôi tạo ra môi trường để mỗi học viên có thể thực hành nhiều hơn - giao tiếp, trò chuyện'
  },
  {
    image: '/images/study-plan-6.png',
    title: 'Lộ trình học tập rõ ràng theo khung Châu Âu',
    des: 'Chúng tôi tạo ra môi trường để mỗi học viên có thể thực hành nhiều hơn - giao tiếp, trò chuyện'
  }
]
</script>

<template>
  <section class="bg-[#EEF0F1] pt-16 py-24">
    <div class="container">
      <p class="title">Phương pháp học và giao tiếp</p>
      <p class="text-lg my-4">
        Chúng tôi tạo ra môi trường để mỗi học viên có thể thực hành nhiều hơn - giao tiếp, trò chuyện. Chúng tôi tạo ra môi
        trường.
      </p>
      <div class="grid grid-cols-[1fr_2fr] gap-8">
        <img src="/images/benefit3.png" alt="" loading="lazy" class="h-full object-cover" />
        <div class="space-y-6">
          <div v-for="(item, index) in items" :key="index" class="grid grid-cols-[1fr_1.5fr] gap-6">
            <img :src="item.image" alt="" loading="lazy" class="h-44 w-full object-cover" />
            <div>
              <p class="text-primary text-2xl font-bold">{{ item.title }}</p>
              <p class="mt-1 line-clamp-4">{{ item.des }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center mt-24">
        <p class="w-2/3 justify-center text-lg font-medium text-center">
          Chúng tôi tạo ra môi trường để mỗi học viên có thể thực hành nhiều hơn - giao tiếp, trò chuyện. Chúng tôi tạo ra môi
          trường để mỗi học viên có thể thực hành nhiều hơn - giao tiếp, trò chuyện
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
