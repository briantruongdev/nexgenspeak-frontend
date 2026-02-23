<script setup lang="ts">
const items = ['/images/people4.png', '/images/people5.png', '/images/people3.png', '/images/people4.png', '/images/people5.png']
</script>

<template>
  <div class="container section-responsive-pt max-xl:px-6">
    <p class="title mb-10 max-sm:mb-6">{{ $t('blog.momentShared.title') }}</p>
    <UCarousel
      v-slot="{ item }"
      :items="items"
      loop
      arrows
      wheel-gestures
      prev-icon="i-lucide-chevron-left"
      next-icon="i-lucide-chevron-right"
      :ui="{
        item: 'basis-full basis-1/3 max-sm:basis-1/2',
        prev: 'max-xl:translate-x-14 max-sm:-translate-x-2 hover:cursor-pointer bg-primary/60 hover:bg-primary active:bg-primary text-white shadow-none ring-0 focus:ring-0',
        next: 'max-xl:-translate-x-14 max-lg:-translate-x-16 max-md:-translate-x-16 max-sm:translate-x-2 hover:cursor-pointer bg-primary/60 hover:bg-primary active:bg-primary text-white shadow-none ring-0 focus:ring-0'
      }"
      class="w-full"
    >
      <img :src="item" class="object-cover h-72 w-100 max-sm:h-40 max-lg:h-60 max-lg:w-70 max-md:h-40 max-[500px]:h-30!" />
    </UCarousel>
  </div>
</template>

<style scoped></style>
