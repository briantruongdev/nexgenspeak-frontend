<script setup lang="ts">
const items = ['/images/people4.png', '/images/people5.png', '/images/people3.png', '/images/people4.png', '/images/people5.png']
</script>

<template>
  <div class="container pt-10 max-xl:px-6">
    <p class="title">{{ $t('blog.today.title') }}</p>
    <p class="mt-8 w-2/3 max-sm:mt-4 text-lg max-lg:text-base max-lg:w-full">
      {{ $t('blog.today.description') }}
    </p>
    <div class="grid grid-cols-2 mt-12 gap-24 max-lg:gap-12 max-sm:grid-cols-1 max-sm:mt-6 max-md:gap-8">
      <div>
        <div class="space-y-6 max-lg:space-y-6">
          <p class="text-2xl font-bold">{{ $t('blog.today.shareYourMoment') }}</p>
          <div class="flex justify-start gap-6 items-center">
            <div class="bg-[#EDEFF0] w-25 h-25 rounded-full max-md:w-20 max-md:h-20"></div>
            <p class="text-xl font-bold opacity-50 max-md:text-lg">{{ $t('blog.today.writeYourFeelings') }}</p>
          </div>
          <div class="flex justify-between gap-6 max-lg:gap-6">
            <p
              class="bg-[#EDEFF0] w-full rounded text-center max-[400px]:text-xs py-2 font-bold hover:cursor-pointer hover-scale-105 hover:text-primary"
            >
              {{ $t('blog.today.photo') }}
            </p>
            <p
              class="bg-[#EDEFF0] w-full rounded text-center py-2 max-[400px]:text-xs font-bold hover:cursor-pointer hover-scale-105 hover:text-primary"
            >
              {{ $t('blog.today.video') }}
            </p>
          </div>
          <BaseButton :text="$t('auth.confirm')" class="w-full" />
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
            prev: 'max-xl:translate-x-14 max-sm:-translate-x-2 hover:cursor-pointer bg-primary/60 hover:bg-primary active:bg-primary text-white shadow-none ring-0 focus:ring-0',
            next: 'max-xl:-translate-x-14 hover:cursor-pointer max-sm:translate-x-2 bg-primary/60 hover:bg-primary active:bg-primary text-white shadow-none ring-0 focus:ring-0'
          }"
          class="w-full mt-12 max-sm:hidden"
        >
          <img :src="item" class="object-cover max-sm:h-40 max-sm:w-70" />
        </UCarousel>
      </div>
      <img src="/images/people2.png" alt="" class="h-140 max-sm:h-100 object-cover max-lg:h-130 max-md:h-120 max-sm:hidden" />
    </div>
  </div>
</template>

<style scoped></style>
