<script setup lang="ts">
const { t } = useI18n()

const items = computed(() => [
  {
    image: '/images/study-plan-5.png',
    title: t('studyPlan.learningMethod.items.item1.title'),
    des: t('studyPlan.learningMethod.items.item1.description')
  },
  {
    image: '/images/benefit2.png',
    title: t('studyPlan.learningMethod.items.item2.title'),
    des: t('studyPlan.learningMethod.items.item2.description')
  },
  {
    image: '/images/study-plan-6.png',
    title: t('studyPlan.learningMethod.items.item3.title'),
    des: t('studyPlan.learningMethod.items.item3.description')
  }
])
</script>

<template>
  <section class="bg-[#EEF0F1] pt-16 py-24">
    <div class="container max-xl:px-6">
      <p class="title">{{ $t('studyPlan.learningMethod.title') }}</p>
      <p class="text-lg my-4">
        {{ $t('studyPlan.learningMethod.description') }}
      </p>
      <div class="grid grid-cols-[1fr_2fr] gap-8 max-md:grid-cols-1">
        <img src="/images/benefit3.png" alt="" loading="lazy" class="h-full object-cover max-md:hidden" />
        <div class="space-y-6">
          <div v-for="(item, index) in items" :key="index" class="grid grid-cols-[1fr_1.5fr] gap-6">
            <img :src="item.image" alt="" loading="lazy" class="h-44 w-full object-cover hover-scale-105" />
            <div>
              <p class="text-primary text-2xl font-bold">{{ item.title }}</p>
              <p class="mt-1 line-clamp-4">{{ item.des }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center mt-24 max-sm:mt-12">
        <p class="w-2/3 justify-center text-lg font-medium text-center">
          {{ $t('studyPlan.learningMethod.footer') }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
