<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()

const widthScreen = computed(() => width.value)
const items = ['/images/people4.png', '/images/people5.png', '/images/people3.png', '/images/people4.png', '/images/people5.png']
</script>

<template>
  <div class="container max-xl:px-6 section-responsive-pt">
    <p class="title">
      {{ $t('recruitment.share.title') }} <span class="text-primary">{{ $t('recruitment.share.titleHighlight') }}</span>
    </p>
    <p class="mt-6 text-lg max-lg:text-base">
      {{ $t('recruitment.share.description') }}
    </p>
    <div class="mt-20 grid grid-cols-2 gap-13 max-sm:grid-cols-1! max-sm:mt-10 max-sm:gap-6 max-md:mt-12">
      <div class="grid grid-cols-[1fr_1.5fr] gap-8 max-md:grid-cols-1">
        <UCarousel
          v-if="widthScreen > 768"
          v-slot="{ item }"
          orientation="vertical"
          :items="items"
          loop
          arrows
          wheel-gestures
          prev-icon="i-lucide-chevron-left"
          next-icon="i-lucide-chevron-right"
          :ui="{
            container: 'h-[530px] max-lg:h-[420px]',
            item: 'basis-full basis-1/3 max-lg:basis-1/3',
            prev: 'hover:cursor-pointer bg-primary text-white shadow-none ring-0 focus:ring-0 hover:bg-primary/60',
            next: 'hover:cursor-pointer bg-primary text-white shadow-none ring-0 focus:ring-0 hover:bg-primary/60'
          }"
          class="w-full"
        >
          <img :src="item" class="object-cover h-40" />
        </UCarousel>
        <img src="/images/ceo.png" alt="" class="object-cover max-md:h-127 max-sm:w-full h-full" loading="lazy" />
      </div>
      <div>
        <p class="text-3xl font-bold">{{ $t('recruitment.share.ceo.name') }}</p>
        <p class="mt-1 font-medium">{{ $t('recruitment.share.ceo.position') }}</p>
        <div class="space-y-3 mt-8 max-sm:mt-4 text-lg max-lg:text-base">
          <p>
            {{ $t('recruitment.share.ceo.quote1') }}
          </p>
          <p>
            {{ $t('recruitment.share.ceo.quote2') }}
          </p>
          <p>{{ $t('recruitment.share.ceo.quote3') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
