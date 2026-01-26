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

        <div class="relative max-lg:hidden">
          <div class="absolute -top-10 right-40 w-64 h-64 rounded-full bg-[#EDEFF0] z-0"></div>
          <div class="absolute bottom-4 right-40 h-80 w-80 rounded-full bg-[#EDEFF0] z-0"></div>

          <img src="/images/laptop.png" alt="" loading="lazy" class="relative z-10" />
        </div>
        <img src="/images/laptop.png" alt="" loading="lazy" class="relative z-10 hidden max-lg:block" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
