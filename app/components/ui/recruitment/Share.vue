<script setup lang="ts">
const items = ['/images/people4.png', '/images/people5.png', '/images/people3.png', '/images/people4.png', '/images/people5.png']
</script>

<template>
  <div class="container pt-24">
    <p class="title">
      {{ $t('recruitment.share.title') }} <span class="text-primary">{{ $t('recruitment.share.titleHighlight') }}</span>
    </p>
    <p class="mt-9">
      {{ $t('recruitment.share.description') }}
    </p>
    <div class="mt-20 grid grid-cols-2 gap-13">
      <div class="grid grid-cols-[1fr_1.5fr] gap-8">
        <UCarousel
          v-slot="{ item }"
          orientation="vertical"
          :items="items"
          loop
          arrows
          wheel-gestures
          prev-icon="i-lucide-chevron-left"
          next-icon="i-lucide-chevron-right"
          :ui="{
            container: 'h-[530px]',
            item: 'basis-full basis-1/3',
            prev: 'hover:cursor-pointer bg-primary text-white shadow-none ring-0 focus:ring-0 hover:bg-primary/60',
            next: 'hover:cursor-pointer bg-primary text-white shadow-none ring-0 focus:ring-0 hover:bg-primary/60'
          }"
          class="w-full max-w-xs mx-auto"
        >
          <img :src="item" width="320" height="320" class="object-cover" />
        </UCarousel>
        <img src="/images/ceo.png" alt="" class="h-127.5 object-cover" loading="lazy" />
      </div>
      <div>
        <p class="text-3xl font-bold">{{ $t('recruitment.share.ceo.name') }}</p>
        <p class="mt-1 font-medium">{{ $t('recruitment.share.ceo.position') }}</p>
        <div class="space-y-3 mt-10">
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
