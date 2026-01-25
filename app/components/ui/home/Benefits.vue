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
    <p class="title mb-12 mt-32 max-lg:mt-20">{{ $t('benefits.title') }}</p>
    <div class="grid grid-cols-[1fr_1fr_1fr] gap-8 max-lg:grid-cols-2 max-lg:gap-y-18 max-sm:grid-cols-1">
      <div v-for="(item, index) in benefits" :key="index" class="relative hover-scale-105">
        <img :src="item.image" :alt="item.title" loading="lazy" class="mx-auto h-80 w-full rounded-lg object-cover" />
        <p
          class="text-center mt-4 max-md:text-sm text-lg font-semibold p-8 box-shadow w-1/2 rounded-xl absolute -bottom-10 right-8 bg-white"
        >
          {{ item.title }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.box-shadow {
  box-shadow:
    rgba(0, 0, 0, 0.07) 0px 1px 1px,
    rgba(0, 0, 0, 0.07) 0px 2px 2px,
    rgba(0, 0, 0, 0.07) 0px 4px 4px,
    rgba(0, 0, 0, 0.07) 0px 8px 8px,
    rgba(0, 0, 0, 0.07) 0px 16px 16px;
}
</style>
