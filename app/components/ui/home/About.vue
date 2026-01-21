<script setup lang="ts">
const summaries = [
  {
    title: 'Năm đào tạo Tiếng Anh trực tuyến',
    value: '6+'
  },
  {
    title: 'Giáo viên nước ngoài',
    value: '100+'
  },
  {
    title: 'Học viên yêu thích và hài lòng',
    value: '5000+'
  }
]
</script>

<template>
  <div class="container">
    <div class="mt-44 grid grid-cols-[1fr_1fr] gap-16 max-md:mt-24 max-lg:grid-cols-1">
      <div class="max-xl:px-6">
        <p class="title">Về chúng tôi, NexGen Speak Online English School</p>

        <div class="flex items-center mt-10">
          <div class="h-1 w-56 bg-primary"></div>
          <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
        <div class="flex justify-end mt-18 mb-10">
          <p class="w-2/3 text-lg text-justify">
            Chúng tôi tạo ra môi trường để mỗi học viên có thể thực hành nhiều hơn. trò chuyện với giáo viên bản xứ một cách tự
            nhiên nhất. Và cuối cùng là sử dụng tiếng Anh nhuần nhuyễn
          </p>
        </div>
        <UButton
          class="rounded-xl text-primary cursor-pointer hover-scale-105 flex items-center leading-none border-2"
          size="lg"
          variant="outline"
        >
          <template #leading>
            <BaseIcon name="arrow-right" class="shrink-0" />
          </template>
          <span class="leading-none">Xem chi tiết tại đây</span>
        </UButton>
      </div>
      <div class="relative">
        <img src="/images/home-about.png" alt="" loading="lazy" class="max-[420px]:h-75" />
        <div class="absolute inset-0 bg-primary/50 w-2/5 gap-y-4 flex flex-col justify-center">
          <div v-for="item in summaries" :key="item.title" class="text-white mx-10 max-lg:mx-6">
            <p class="text-7xl max-md:text-5xl max-sm:text-3xl font-bold">{{ item.value }}</p>
            <p class="text-lg max-sm:text-sm">{{ item.title }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
