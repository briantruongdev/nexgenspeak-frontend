<script setup lang="ts">
const { t } = useI18n()

const items = computed(() => [
  {
    image: '/images/img-teacher.png',
    name: t('teachingStaff.teacher1.name'),
    title: t('teachingStaff.teacher1.title'),
    description: t('teachingStaff.teacher1.description')
  },
  {
    image: '/images/img-teacher.png',
    name: t('teachingStaff.teacher2.name'),
    title: t('teachingStaff.teacher2.title'),
    description: t('teachingStaff.teacher2.description')
  },
  {
    image: '/images/img-teacher.png',
    name: t('teachingStaff.teacher3.name'),
    title: t('teachingStaff.teacher3.title'),
    description: t('teachingStaff.teacher3.description')
  },
  {
    image: '/images/img-teacher.png',
    name: t('teachingStaff.teacher4.name'),
    title: t('teachingStaff.teacher4.title'),
    description: t('teachingStaff.teacher4.description')
  },
  {
    image: '/images/img-teacher.png',
    name: t('teachingStaff.teacher5.name'),
    title: t('teachingStaff.teacher5.title'),
    description: t('teachingStaff.teacher5.description')
  }
])
</script>

<template>
  <div class="container max-xl:px-6">
    <div class="mb-8 mt-32 max-lg:mt-20">
      <p class="title">{{ $t('teachingStaff.title') }}</p>
      <p class="text-lg mt-2 max-md:text-sm">{{ $t('teachingStaff.subtitle') }}</p>
    </div>
    <UCarousel
      v-slot="{ item }"
      loop
      arrows
      wheel-gestures
      prev-icon="i-lucide-chevron-left"
      next-icon="i-lucide-chevron-right"
      :items="items"
      :ui="{
        item: 'basis-full md:basis-1/2 lg:basis-1/3 px-2 sm:px-4',
        prev: 'translate-x-14 hover:cursor-pointer max-sm:-translate-x-2',
        next: '-translate-x-18 hover:cursor-pointer max-sm:-translate-x-0'
      }"
    >
      <div class="bg-primary rounded-tl-4xl rounded-br-4xl rounded-tr-4xl grid grid-cols-[1fr_2fr] h-60 max-md:h-52">
        <div class="flex items-end">
          <img :src="item.image" :alt="item.name" loading="lazy" class="flex items-end" />
        </div>

        <div class="text-white flex py-4 flex-col justify-between">
          <div class="">
            <p class="mb-2 text-base sm:text-base lg:text-lg">{{ $t('teachingStaff.teacher') }}: {{ item.name }}</p>
            <p class="text-sm sm:text-sm lg:text-base line-clamp-5">
              {{ item.description }}
            </p>
          </div>

          <div class="flex justify-end mt-4 mr-4">
            <UButton class="rounded-xl bg-white hover:bg-white text-primary cursor-pointer hover-scale-105 w-fit" size="lg">
              {{ $t('teachingStaff.bookLesson') }}
            </UButton>
          </div>
        </div>
      </div>
    </UCarousel>
  </div>
</template>

<style scoped></style>
