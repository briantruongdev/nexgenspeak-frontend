<script setup lang="ts">
const { t } = useI18n()

const reviews = computed(() => [
  {
    avatar: '/images/avatar-women-1.jpg',
    name: t('reviews.items.review1.name'),
    content: t('reviews.items.review1.content')
  },
  {
    avatar: '/images/avatar-men-1.jpg',
    name: t('reviews.items.review2.name'),
    content: t('reviews.items.review2.content')
  },
  {
    avatar: '/images/avatar-women-2.jpg',
    name: t('reviews.items.review3.name'),
    content: t('reviews.items.review3.content')
  },
  {
    avatar: '/images/avatar-men-2.jpg',
    name: t('reviews.items.review4.name'),
    content: t('reviews.items.review4.content')
  },
  {
    avatar: '/images/avatar-men-3.jpg',
    name: t('reviews.items.review5.name'),
    content: t('reviews.items.review5.content')
  },
  {
    avatar: '/images/avatar-women-3.jpg',
    name: t('reviews.items.review6.name'),
    content: t('reviews.items.review6.content')
  },
  {
    avatar: '/images/avatar-men-4.jpg',
    name: t('reviews.items.review7.name'),
    content: t('reviews.items.review7.content')
  },
  {
    avatar: '/images/avatar-women-4.jpg',
    name: t('reviews.items.review8.name'),
    content: t('reviews.items.review8.content')
  },
  {
    avatar: '/images/avatar-men-5.jpg',
    name: t('reviews.items.review9.name'),
    content: t('reviews.items.review9.content')
  }
])
</script>

<template>
  <div class="container max-xl:px-6 pb-12">
    <div class="section-responsive">
      <p class="title">{{ $t('reviews.title') }}</p>
      <p class="text-lg mt-2 max-sm:text-sm">{{ t('reviews.subtitle') }}</p>
    </div>
    <UCarousel
      v-slot="{ item }"
      loop
      arrows
      autoplay
      wheel-gestures
      prev-icon="i-lucide-chevron-left"
      next-icon="i-lucide-chevron-right"
      :items="reviews"
      :ui="{
        item: 'basis-full md:basis-1/2 lg:basis-1/3 px-2 sm:px-4 flex',
        prev: 'max-xl:translate-x-16 max-sm:-translate-x-0 hover:cursor-pointer text-white bg-primary/60 hover:bg-primary active:bg-primary shadow-none ring-0 focus:ring-0',
        next: 'max-xl:-translate-x-20 max-md:-translate-x-20 max-sm:-translate-x-2 hover:cursor-pointer text-white bg-primary/60 hover:bg-primary active:bg-primary shadow-none ring-0 focus:ring-0'
      }"
    >
      <div
        class="bg-white rounded-2xl relative p-6 max-sm:p-4 shadow-sm border border-black/5 detail-card m-1 mt-20 h-full flex flex-col min-h-86"
      >
        <!-- <div class="w-27 h-14 bg-primary absolute -top-14 rounded-t-full left-[35%]"></div> -->
        <img
          :src="item.avatar"
          alt=""
          loading="lazy"
          class="w-25 h-25 object-cover absolute bg-white -top-[19%] left-[36%] rounded-full"
        />
        <div class="absolute -top-2 left-14">
          <svg width="26" height="16" viewBox="0 0 26 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M14.1632 4.02C13.3032 6.44 13.8632 9.19 15.7532 11.72C18.6632 15.62 23.1532 15.8 23.9732 15.8H24.1032C24.5232 15.8 24.8532 15.47 24.9032 15.06C24.9532 14.65 24.6932 14.27 24.2932 14.16C22.6132 13.7 22.2032 11.6 22.1132 10.62C23.9232 9.65 25.0732 7.76 25.0732 5.64C25.0732 2.53 22.5632 0 19.4932 0C17.0332 0 14.8932 1.61 14.1732 4.01L14.1632 4.02Z"
              fill="#e87722"
            ></path>
            <path
              d="M1.97317 11.7298C4.88317 15.6298 9.37317 15.8098 10.1932 15.8098H10.3232C10.7432 15.8098 11.0732 15.4798 11.1232 15.0698C11.1732 14.6598 10.9132 14.2798 10.5132 14.1698C8.83317 13.7098 8.42317 11.6098 8.33317 10.6298C10.1432 9.65977 11.2932 7.76977 11.2932 5.64977C11.2932 2.53977 8.78317 0.00976562 5.71317 0.00976562C3.25317 0.00976562 1.11317 1.61977 0.39317 4.01977C-0.46683 6.43977 0.0931696 9.18977 1.98317 11.7198L1.97317 11.7298Z"
              fill="#e87722"
            ></path>
          </svg>
        </div>
        <div class="mt-12 flex-1">
          <p class="text-center font-medium text-xl text-primary">{{ item.name }}</p>
          <div class="flex justify-center items-center gap-2 my-4">
            <p v-for="(_, index) in 5" :key="index">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 1L12.5 7.5L19 7.5L14 12L16 19L10 15L4 19L6 12L1 7.5L7.5 7.5L10 1Z" fill="#FFCB2B"></path>
              </svg>
            </p>
          </div>
          <p class="font-medium">{{ item.content }}</p>
        </div>
      </div>
    </UCarousel>
  </div>
</template>

<style scoped>
:deep(.swiper-slide) {
  height: auto !important;
  display: flex !important;
}

:deep(.swiper-wrapper) {
  align-items: stretch !important;
}
</style>
