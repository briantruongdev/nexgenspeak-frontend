<script setup lang="ts">
const { t } = useI18n()

const data = computed(() => [
  {
    title: t('slogan.items.item1'),
    image: '/images/slogan1.png'
  },
  {
    title: t('slogan.items.item2'),
    image: '/images/slogan2.png'
  },
  {
    title: t('slogan.items.item3'),
    image: '/images/slogan3.png'
  },
  {
    title: t('slogan.items.item4'),
    image: '/images/slogan4.png'
  }
])
</script>

<template>
  <div class="container">
    <div class="mt-32 max-lg:mt-24 max-xl:px-6">
      <p class="title">{{ $t('slogan.title') }}</p>

      <p class="my-6 text-lg">
        {{ $t('slogan.description') }}
      </p>
      <div class="grid grid-cols-[1fr_1fr] max-lg:grid-cols-1 items-center">
        <div class="grid grid-cols-2 gap-6 max-sm:grid-cols-1">
          <div v-for="(item, index) in data" :key="index">
            <div class="relative">
              <img :src="item.image" :alt="item.title" class="rounded-lg aspect-3/2" loading="lazy" />
              <UiButtonPlay />
            </div>
            <p class="text-lg font-medium mt-5 max-md:text-sm">{{ item.title }}</p>
          </div>
        </div>

        <img src="/images/laptop.png" alt="" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
