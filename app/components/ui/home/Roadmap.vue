<script setup lang="ts">
const { t } = useI18n()

const cards = computed(() => [
  {
    title: t('roadmap.items.step1'),
    image: '/images/roadmap1.png'
  },
  {
    title: t('roadmap.items.step2'),
    image: '/images/roadmap2.png'
  },
  {
    title: t('roadmap.items.step3'),
    image: '/images/roadmap3.png'
  },
  {
    title: t('roadmap.items.step4'),
    image: '/images/roadmap4.png'
  }
])
</script>

<template>
  <div class="container max-xl:px-6">
    <p class="title mb-12 section-responsive max-[400px]:mb-6!">{{ t('roadmap.title') }}</p>
    <div class="grid grid-cols-4 gap-8 max-md:grid-cols-2 max-sm:gap-6 max-[400px]:grid-cols-1!">
      <div
        v-for="(card, index) in cards"
        :key="index"
        class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 hover-scale-105"
      >
        <p class="text-white bg-primary w-10 h-10 justify-center flex items-center rounded-full text-2xl font-bold">
          {{ index + 1 }}
        </p>

        <p class="font-medium leading-relaxed my-4">{{ card.title }}</p>
        <img :src="card.image" alt="Card Image" loading="lazy" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
