<script setup lang="ts">
const { t } = useI18n()
const { openTrialRegisterModal } = useTrialRegister()

const items = computed(() => [
  {
    image: '/images/people2.png',
    des: t('blog.blog1')
  },
  {
    image: '/images/people3.png',
    des: t('blog.blog2')
  },
  {
    image: '/images/people4.png',
    des: t('blog.blog3')
  },
  {
    image: '/images/people2.png',
    des: t('blog.blog1')
  },
  {
    image: '/images/people3.png',
    des: t('blog.blog2')
  },
  {
    image: '/images/people4.png',
    des: t('blog.blog3')
  }
])
</script>

<template>
  <div class="container section-responsive-pt max-xl:px-6">
    <p class="title mb-10 max-sm:mb-6">{{ $t('blog.shared.title') }}</p>
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
        next: 'max-xl:-translate-x-14 max-lg:-translate-x-16 max-md:-translate-x-16  max-sm:translate-x-2 hover:cursor-pointer bg-primary/60 hover:bg-primary active:bg-primary text-white shadow-none ring-0 focus:ring-0'
      }"
      class="w-full"
    >
      <img :src="item.image" class="object-cover h-72 w-100 max-sm:h-40 max-lg:h-60 max-lg:w-70 max-md:h-40 max-[500px]:h-30!" />
      <p class="mt-8 text-lg max-sm:text-sm max-md:text-base">{{ item.des }}</p>
    </UCarousel>
    <div class="flex justify-center my-12 max-sm:my-6">
      <BaseButton
        :text="$t('blog.shared.viewMore')"
        icon="i-lucide-plus"
        variant="outline"
        class="w-40"
        @click="openTrialRegisterModal"
      />
    </div>
  </div>
</template>

<style scoped></style>
