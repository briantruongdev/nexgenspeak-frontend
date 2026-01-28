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
  <div class="container pt-24 max-xl:px-6">
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
      <BaseButton :text="$t('blog.shared.viewMore')" icon="i-lucide-plus" variant="outline" class="w-40" />
    </div>
  </div>
</template>

<style scoped></style>
