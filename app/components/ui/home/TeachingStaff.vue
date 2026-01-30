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
    <div class="mb-8 section-responsive max-[400px]:mb-6!">
      <p class="title">{{ $t('teachingStaff.title') }}</p>
      <p class="text-lg mt-2 max-sm:text-sm">{{ $t('teachingStaff.subtitle') }}</p>
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
        prev: 'translate-x-14 hover:cursor-pointer max-sm:-translate-x-2 text-primary bg-white/60 shadow-none ring-0 focus:ring-0',
        next: '-translate-x-18 hover:cursor-pointer max-sm:-translate-x-0 text-primary bg-white/50 shadow-none ring-0 focus:ring-0'
      }"
    >
      <div
        class="bg-primary rounded-tl-4xl rounded-br-4xl rounded-tr-4xl grid grid-cols-[1fr_2fr] xl:h-60! max-md:h-fit items-stretch"
      >
        <div class="flex items-end h-full">
          <img :src="item.image" :alt="item.name" loading="lazy" class="object-cover h-[80%]" />
        </div>

        <div class="text-white flex flex-col justify-between h-full">
          <div class="py-4 pr-4">
            <p class="mb-2 text-base lg:text-lg max-[400px]:text-sm">{{ $t('teachingStaff.teacher') }}: {{ item.name }}</p>
            <p class="text-sm lg:text-base line-clamp-3 max-[400px]:text-xs">
              {{ item.description }}
            </p>
          </div>

          <div class="flex justify-end mr-4 mb-4">
            <BaseButton variant="outline" class-name="bg-white border-none rounded-xl" :text="$t('teachingStaff.bookLesson')" />
          </div>
        </div>
      </div>
    </UCarousel>
  </div>
</template>

<style scoped></style>
