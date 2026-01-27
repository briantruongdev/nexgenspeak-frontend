<script setup lang="ts">
const items = [
  {
    image: '/images/people2.png',
    des: 'Chúng tôi tạo ra môi trường để mỗi học viên có thể thực hành nhiều hơn. trò chuyện với giáo viên bản xứ một cách tự nhiên nhất. Và cuối cùng là sử dụng tiếng Anh nhuần nhuyễn'
  },
  {
    image: '/images/people3.png',
    des: 'Chúng tôi tạo ra môi trường để mỗi học viên có thể thực hành nhiều hơn. trò chuyện với giáo viên bản xứ một cách tự nhiên nhất. Và cuối cùng là sử dụng tiếng Anh nhuần nhuyễn'
  },
  {
    image: '/images/people4.png',
    des: 'Chúng tôi tạo ra môi trường để mỗi học viên có thể thực hành nhiều hơn. trò chuyện với giáo viên bản xứ một cách tự nhiên nhất. Và cuối cùng là sử dụng tiếng Anh nhuần nhuyễn'
  },
  {
    image: '/images/people5.png',
    des: 'Chúng tôi tạo ra môi trường để mỗi học viên có thể thực hành nhiều hơn. trò chuyện với giáo viên bản xứ một cách tự nhiên nhất. Và cuối cùng là sử dụng tiếng Anh nhuần nhuyễn'
  },
  {
    image: '/images/people2.png',
    des: 'Chúng tôi tạo ra môi trường để mỗi học viên có thể thực hành nhiều hơn. trò chuyện với giáo viên bản xứ một cách tự nhiên nhất. Và cuối cùng là sử dụng tiếng Anh nhuần nhuyễn'
  },
  {
    image: '/images/people3.png',
    des: 'Chúng tôi tạo ra môi trường để mỗi học viên có thể thực hành nhiều hơn. trò chuyện với giáo viên bản xứ một cách tự nhiên nhất. Và cuối cùng là sử dụng tiếng Anh nhuần nhuyễn'
  },
  {
    image: '/images/people4.png',
    des: 'Chúng tôi tạo ra môi trường để mỗi học viên có thể thực hành nhiều hơn. trò chuyện với giáo viên bản xứ một cách tự nhiên nhất. Và cuối cùng là sử dụng tiếng Anh nhuần nhuyễn'
  },
  {
    image: '/images/people5.png',
    des: 'Chúng tôi tạo ra môi trường để mỗi học viên có thể thực hành nhiều hơn. trò chuyện với giáo viên bản xứ một cách tự nhiên nhất. Và cuối cùng là sử dụng tiếng Anh nhuần nhuyễn'
  }
]
</script>

<template>
  <div class="container pt-24">
    <p class="title mb-10">Các bài viết được chia sẻ</p>
    <UCarousel
      v-slot="{ item }"
      :items="items"
      loop
      arrows
      wheel-gestures
      prev-icon="i-lucide-chevron-left"
      next-icon="i-lucide-chevron-right"
      :ui="{
        item: 'basis-full basis-1/3 ps-8',
        prev: 'hover:cursor-pointer bg-primary text-white shadow-none ring-0 focus:ring-0 hover:bg-primary/60',
        next: 'hover:cursor-pointer bg-primary text-white shadow-none ring-0 focus:ring-0 hover:bg-primary/60'
      }"
      class="w-full"
    >
      <img :src="item.image" class="object-cover h-100" />
      <p class="mt-8 text-lg">{{ item.des }}</p>
    </UCarousel>
    <div class="flex justify-center my-20">
      <BaseButton text="Xem thêm" icon="i-lucide-plus" variant="outline" class="w-40" />
    </div>
  </div>
</template>

<style scoped></style>
