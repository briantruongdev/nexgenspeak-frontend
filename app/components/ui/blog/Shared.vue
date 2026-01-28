<script setup lang="ts">
const { t } = useI18n()

const items = computed(() => [
  {
    image: '/images/people2.png',
    des: t('about.description')
  },
  {
    image: '/images/people3.png',
    des: t('about.description')
  },
  {
    image: '/images/people4.png',
    des: t('about.description')
  },
  {
    image: '/images/people5.png',
    des: t('about.description')
  },
  {
    image: '/images/people2.png',
    des: t('about.description')
  },
  {
    image: '/images/people3.png',
    des: t('about.description')
  },
  {
    image: '/images/people4.png',
    des: t('about.description')
  },
  {
    image: '/images/people5.png',
    des: t('about.description')
  }
])
</script>

<template>
  <div class="container pt-24 max-xl:px-6 max-sm:pt-12">
    <p class="title mb-10">{{ $t('blog.shared.title') }}</p>
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
        prev: 'max-xl:translate-x-18 max-sm:translate-x-2 hover:cursor-pointer bg-primary text-white shadow-none ring-0 focus:ring-0 hover:bg-primary/60',
        next: 'max-xl:-translate-x-14 max-sm:translate-x-2 hover:cursor-pointer bg-primary text-white shadow-none ring-0 focus:ring-0 hover:bg-primary/60'
      }"
      class="w-full"
    >
      <img :src="item.image" class="object-cover h-100 w-100 max-sm:h-60 max-sm:w-60" />
      <p class="mt-8 text-lg max-sm:text-sm">{{ item.des }}</p>
    </UCarousel>
    <div class="flex justify-center my-20 max-sm:my-10">
      <BaseButton :text="$t('blog.shared.viewMore')" icon="i-lucide-plus" variant="outline" class="w-40" />
    </div>
  </div>
</template>

<style scoped></style>
