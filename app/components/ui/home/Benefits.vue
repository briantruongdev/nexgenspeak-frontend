<script setup lang="ts">
const benefits = [
  {
    image: '/images/benefit1.png',
    title: 'Kèm 1:1 với hơn 100 Giáo viên giỏi'
  },
  {
    image: '/images/benefit2.png',
    title: 'Giáo trình và phương pháp tối ưu'
  },
  {
    image: '/images/benefit3.png',
    title: 'Đào tạo kỹ năng bài bản'
  }
]
</script>
<template>
  <div class="container">
    <p class="text-4xl font-bold my-12">Quyền lợi khi học tại NexGen Speak Online</p>
    <div class="grid grid-cols-[1fr_1fr_1fr] gap-8">
      <div v-for="(item, index) in benefits" :key="index" class="relative hover-scale-105">
        <img :src="item.image" :alt="item.title" loading="lazy" class="mx-auto h-80 w-full rounded-lg" />
        <p class="text-center mt-4 text-lg font-semibold p-8 box-shadow w-1/2 rounded-xl absolute -bottom-10 right-8 bg-white">
          {{ item.title }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.box-shadow {
  box-shadow:
    rgba(0, 0, 0, 0.07) 0px 1px 1px,
    rgba(0, 0, 0, 0.07) 0px 2px 2px,
    rgba(0, 0, 0, 0.07) 0px 4px 4px,
    rgba(0, 0, 0, 0.07) 0px 8px 8px,
    rgba(0, 0, 0, 0.07) 0px 16px 16px;
}
</style>
