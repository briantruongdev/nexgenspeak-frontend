<script setup lang="ts">
const items = [
  {
    name: 'Nguyễn Đặng Như Quỳnh',
    image: '/images/teacher1.jpg'
  },
  {
    name: 'Trần Phan Quỳnh Trang',
    image: '/images/teacher2.jpg'
  },
  {
    name: 'Đinh Hoàng Tiến Linh',
    image: '/images/teacher2.jpg'
  },
  {
    name: 'Nguyễn Đặng Như Quỳnh',
    image: '/images/teacher1.jpg'
  },
  {
    name: 'Trần Phan Quỳnh Trang',
    image: '/images/teacher2.jpg'
  },
  {
    name: 'Đinh Hoàng Tiến Linh',
    image: '/images/teacher2.jpg'
  }
]
</script>

<template>
  <section class="bg-[#EEF0F1] pt-10">
    <div class="container max-xl:px-6">
      <UiTeacherTitle title="Triết lý giáo dục của NexGen" />
      <div class="grid grid-cols-3 gap-x-6 gap-y-12">
        <div v-for="(item, index) in items" :key="index">
          <div class="relative">
            <img :src="item.image" :alt="item.name" loading="lazy" />
            <UiButtonPlay />
          </div>
          <p class="text-xl font-bold mt-2">{{ item.name }}</p>
        </div>
      </div>
      <div class="py-10"><BaseButton text="Xem thêm video" variant="outline" class="mx-auto w-40" /></div>
    </div>
  </section>
</template>

<style scoped></style>
