<script setup lang="ts">
const cards = [
  {
    number: '01',
    title: 'Đăng ký',
    description: 'Đăng ký bằng cách điền thông tin chi tiết của bạn về tào ID và một khẩu đăng nhập an toàn',
    image: '/images/user-laptop.png'
  },
  {
    number: '02',
    title: 'Dự trị lập học',
    description: 'Dự trị lập học của bạn bằng cách điền đảo vào thích và thời gian học bài',
    image: '/images/schedule-laptop.png'
  },
  {
    number: '03',
    title: 'Kiểm tra lịch',
    description: 'Kiểm tra lịch sử đặt chỗ của bạn để xác nhận đặt chỗ của bạn và nhập mã của giáo viên của bạn',
    image: '/images/check-laptop.png'
  }
]
</script>

<template>
  <div class="relative">
    <div class="bg-[#FAE4D3] h-110 w-1/3 rounded-br-[82px] max-sm:w-2/3 max-sm:h-60"></div>
    <div class="absolute top-1/6 w-full max-sm:static max-xl:px-6">
      <div class="container grid grid-cols-[1fr_3fr] mx-auto max-sm:grid-cols-1">
        <div class="max-sm:absolute max-sm:top-10">
          <p class="mb-6 title">Các bước đăng kí học online</p>
          <UButton
            class="rounded-xl text-primary cursor-pointer hover-scale-105 flex items-center leading-none border-2"
            size="lg"
            variant="outline"
          >
            <template #leading>
              <BaseIcon name="arrow-right" class="shrink-0" />
            </template>
            <span class="leading-none">Tìm hiểu thêm</span>
          </UButton>
        </div>

        <div class="grid grid-cols-3 gap-8 max-sm:grid-cols-1 tems-center max-sm:mt-8">
          <div
            v-for="(card, index) in cards"
            :key="index"
            class="relative bg-white rounded-tr-2xl rounded-br-2xl rounded-bl-2xl max-sm:rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 hover-scale-105"
          >
            <div class="absolute top-2 left-3 text-2xl font-bold text-orange-500">
              {{ card.number }}
            </div>

            <img :src="card.image" alt="Card Image" class="mx-auto w-48" loading="lazy" />

            <p class="text-sm leading-relaxed">{{ card.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
