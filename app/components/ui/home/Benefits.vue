<script setup lang="ts">
const { t } = useI18n()

const benefits = computed(() => [
  {
    image: '/images/benefit1.png',
    title: t('benefits.items.benefit1')
  },
  {
    image: '/images/benefit2.png',
    title: t('benefits.items.benefit2')
  },
  {
    image: '/images/benefit3.png',
    title: t('benefits.items.benefit3')
  }
])
</script>

<template>
  <div class="container max-xl:px-6">
    <p class="title mb-12 mt-20 max-lg:mt-12 max-[400px]:mt-8! max-[400px]:mb-6!">{{ $t('benefits.title') }}</p>
    <div class="grid grid-cols-[1fr_1fr_1fr] gap-8 max-lg:grid-cols-2 max-lg:gap-y-18 max-sm:grid-cols-1">
      <div v-for="(item, index) in benefits" :key="index" class="relative hover-scale-105">
        <img
          :src="item.image"
          :alt="item.title"
          loading="lazy"
          class="mx-auto h-80 max-lg:h-60 w-full rounded-lg object-cover max-[400px]:h-40!"
        />
        <p
          class="text-center mt-4 max-md:text-sm text-lg max-lg:text-base font-semibold p-8 box-shadow w-1/2 rounded-xl absolute -bottom-10 right-8 bg-white max-[400px]:text-xs! max-sm:p-4"
        >
          {{ item.title }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
