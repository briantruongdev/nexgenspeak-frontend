<script setup lang="ts">
const data = [
  {
    title: 'Học tập dựa trên phương pháp tương tác đa chiều',
    image: '/images/slogan1.png'
  },
  {
    title: 'Hỗ trợ học tập tận tâm hết mình',
    image: '/images/slogan2.png'
  },
  {
    title: 'Làm chủ ngôn ngữ, tự tin chinh phục Tiếng Anh',
    image: '/images/slogan3.png'
  },
  {
    title: 'Cải thiện rõ rệt kỹ năng giao tiếp',
    image: '/images/slogan4.png'
  }
]
</script>

<template>
  <div class="container">
    <div class="mt-32">
      <p class="title">Học Chăm Luyện Chất Cùng NexGen Speak</p>

      <p class="my-6 text-lg">
        Chúng tôi tạo ra môi trường để mỗi học viên có thể thực hành nhiều hơn. trò chuyện với giáo viên bản xứ một cách tự nhiên
        nhất.
      </p>
      <div class="grid grid-cols-[1fr_1fr]">
        <div class="grid grid-cols-2 gap-6">
          <div v-for="(item, index) in data" :key="index">
            <div class="relative">
              <img :src="item.image" :alt="item.title" class="rounded-lg aspect-3/2" loading="lazy" />
              <div class="absolute inset-0 flex justify-center items-center">
                <div
                  class="w-20 h-20 rounded-full bg-white/60 flex items-center justify-center hover:cursor-pointer hover-scale-105"
                >
                  <div
                    class="ml-1 w-0 h-0 border-t-14 border-t-transparent border-b-14 border-b-transparent border-l-22 border-l-[#E87722]"
                  ></div>
                </div>
              </div>
            </div>
            <p class="text-lg font-medium mt-5">{{ item.title }}</p>
          </div>
        </div>

        <img src="/images/laptop.png" alt="" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
