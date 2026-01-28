<script setup lang="ts">
const items = ['/images/people4.png', '/images/people5.png', '/images/people3.png', '/images/people4.png', '/images/people5.png']
</script>

<template>
  <div class="container pt-10 max-xl:px-6">
    <p class="title">{{ $t('blog.today.title') }}</p>
    <p class="mt-8 w-2/3">
      {{ $t('blog.today.description') }}
    </p>
    <div class="grid grid-cols-2 mt-20 gap-24 max-lg:gap-12 max-sm:grid-cols-1 max-sm:mt-10">
      <div>
        <div class="space-y-10">
          <p class="text-2xl font-bold">{{ $t('blog.today.shareYourMoment') }}</p>
          <div class="flex justify-start gap-9 items-center">
            <div class="bg-[#EDEFF0] w-25 h-25 rounded-full"></div>
            <p class="text-xl font-bold opacity-50">{{ $t('blog.today.writeYourFeelings') }}</p>
          </div>
          <div class="flex justify-between gap-8">
            <p
              class="bg-[#EDEFF0] w-full rounded-2xl text-center py-2 font-bold hover:cursor-pointer hover-scale-105 hover:text-primary"
            >
              {{ $t('blog.today.photo') }}
            </p>
            <p
              class="bg-[#EDEFF0] w-full rounded-2xl text-center py-2 font-bold hover:cursor-pointer hover-scale-105 hover:text-primary"
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
            prev: 'max-xl:translate-x-14 max-sm:-translate-x-2 hover:cursor-pointer bg-primary text-white shadow-none ring-0 focus:ring-0 hover:bg-primary/60',
            next: 'max-xl:-translate-x-14 hover:cursor-pointer max-sm:translate-x-2 bg-primary text-white shadow-none ring-0 focus:ring-0 hover:bg-primary/60'
          }"
          class="w-full mt-32 max-sm:mt-10"
        >
          <img :src="item" class="object-cover max-sm:h-60 max-sm:w-60" />
        </UCarousel>
      </div>
      <img src="/images/people2.png" alt="" class="h-175 max-sm:h-100 object-cover" />
    </div>
  </div>
</template>

<style scoped></style>
