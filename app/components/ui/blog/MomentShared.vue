<script setup lang="ts">
const items = ['/images/people4.png', '/images/people5.png', '/images/people3.png', '/images/people4.png', '/images/people5.png']
</script>

<template>
  <div class="container pt-24 max-xl:px-6">
    <p class="title mb-10">{{ $t('blog.momentShared.title') }}</p>
    <UCarousel
      v-slot="{ item }"
      :items="items"
      loop
      arrows
      wheel-gestures
      prev-icon="i-lucide-chevron-left"
      next-icon="i-lucide-chevron-right"
      :ui="{
        item: 'basis-full basis-1/3',
        prev: 'hover:cursor-pointer bg-primary text-white shadow-none ring-0 focus:ring-0 hover:bg-primary/60',
        next: 'hover:cursor-pointer bg-primary text-white shadow-none ring-0 focus:ring-0 hover:bg-primary/60'
      }"
      class="w-full"
    >
      <img :src="item" class="object-cover h-100 w-100" />
    </UCarousel>
  </div>
</template>

<style scoped></style>
