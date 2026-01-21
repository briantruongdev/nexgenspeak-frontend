<script setup lang="ts">
const items = [
  {
    image: '/images/img-teacher.png',
    name: 'Nguyễn Thị Ánh',
    title: 'Giảng viên Tiếng Anh',
    description: 'Chuyên gia về giao tiếp và phát âm với hơn 10 năm kinh nghiệm giảng dạy.'
  },
  {
    image: '/images/img-teacher.png',
    name: 'Trần Văn Bảo',
    title: 'Giảng viên IELTS',
    description: 'Chuyên gia luyện thi IELTS với tỷ lệ học viên đạt band 7.0+ cao nhất.'
  },
  {
    image: '/images/img-teacher.png',
    name: 'Lê Thị Chi',
    title: 'Giảng viên Ngữ pháp',
    description: 'Chuyên gia ngữ pháp với phương pháp giảng dạy dễ hiểu và hiệu quả.'
  },
  {
    image: '/images/img-teacher.png',
    name: 'Phạm Minh Dũng',
    title: 'Giảng viên Kinh doanh',
    description: 'Chuyên gia tiếng Anh thương mại với kinh nghiệm làm việc tại các tập đoàn đa quốc gia.'
  },
  {
    image: '/images/img-teacher.png',
    name: 'Hoàng Thị Em',
    title: 'Giảng viên Thiếu nhi',
    description: 'Chuyên gia giảng dạy tiếng Anh cho trẻ em với phương pháp sáng tạo và vui nhộn.'
  }
]
</script>

<template>
  <div class="container">
    <div class="mb-12 mt-32">
      <p class="title">Đội ngũ giáo viên</p>
      <p class="text-lg mt-2">Kinh nghiệm giảng dạy và Chuyên môn</p>
    </div>
    <UCarousel
      v-slot="{ item }"
      loop
      arrows
      wheel-gestures
      prev-icon="i-lucide-chevron-left"
      next-icon="i-lucide-chevron-right"
      :items="items"
      :ui="{
        item: 'basis-full sm:basis-1/2 lg:basis-1/3 px-2 sm:px-4',
        prev: 'translate-x-14 hover:cursor-pointer max-sm:translate-x-0',
        next: '-translate-x-18 hover:cursor-pointer max-sm:-translate-x-0'
      }"
    >
      <div class="bg-primary rounded-tl-4xl rounded-br-4xl rounded-tr-4xl flex flex-col sm:flex-row gap-4 p-4 h-full">
        <img :src="item.image" :alt="item.name" loading="lazy" class="w-full sm:w-40 md:w-48 object-cover rounded-xl" />

        <div class="text-white flex flex-col justify-between">
          <div>
            <p class="mb-2 text-base sm:text-lg lg:text-xl">Giáo viên: {{ item.name }}</p>
            <p class="text-sm sm:text-base lg:text-lg line-clamp-3">
              {{ item.description }}
            </p>
          </div>

          <UButton class="rounded-xl bg-white hover:bg-white text-primary cursor-pointer hover-scale-105 w-fit mt-4" size="lg">
            Đặt lịch học
          </UButton>
        </div>
      </div>
    </UCarousel>
  </div>
</template>

<style scoped></style>
