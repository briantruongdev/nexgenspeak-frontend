<script setup lang="ts">
const { t } = useI18n()

const cards = computed(() => [
  {
    number: t('register.steps.step1.number'),
    title: t('register.steps.step1.title'),
    description: t('register.steps.step1.description'),
    image: '/images/user-laptop.png'
  },
  {
    number: t('register.steps.step2.number'),
    title: t('register.steps.step2.title'),
    description: t('register.steps.step2.description'),
    image: '/images/schedule-laptop.png'
  },
  {
    number: t('register.steps.step3.number'),
    title: t('register.steps.step3.title'),
    description: t('register.steps.step3.description'),
    image: '/images/check-laptop.png'
  }
])
</script>

<template>
  <div class="relative">
    <div class="bg-[#FAE4D3] h-110 w-1/3 rounded-br-[82px] max-sm:w-2/3 max-sm:h-60"></div>
    <div class="absolute top-1/6 w-full max-sm:static max-xl:px-6">
      <div class="container grid grid-cols-[1fr_3fr] mx-auto max-sm:grid-cols-1">
        <div class="max-sm:absolute max-sm:top-10">
          <p class="mb-6 title">{{ $t('register.title') }}</p>

          <BaseButton variant="outline" class-name="border-2" :text="$t('register.learnMore')">
            <BaseIcon name="arrow-right" class="shrink-0" />
          </BaseButton>
        </div>

        <div class="grid grid-cols-3 gap-8 max-sm:grid-cols-1 tems-center max-sm:mt-8">
          <div
            v-for="(card, index) in cards"
            :key="index"
            class="relative bg-white rounded-tr-2xl rounded-br-2xl rounded-bl-2xl max-sm:rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 hover-scale-105"
          >
            <div class="absolute top-2 left-3 text-2xl font-bold text-orange-500">
              {{ card.number }}
            </div>

            <img :src="card.image" alt="Card Image" class="mx-auto w-48" loading="lazy" />

            <p class="text-sm leading-relaxed">{{ card.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
