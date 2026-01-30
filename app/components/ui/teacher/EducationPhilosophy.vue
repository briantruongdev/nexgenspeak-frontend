<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'

const { t } = useI18n()

const { width } = useWindowSize()

const items = computed(() => [
  {
    name: t('teacher.educationPhilosophy.teachers.teacher1'),
    image: '/images/teacher1.jpg'
  },
  {
    name: t('teacher.educationPhilosophy.teachers.teacher2'),
    image: '/images/teacher2.jpg'
  },
  {
    name: t('teacher.educationPhilosophy.teachers.teacher3'),
    image: '/images/teacher2.jpg'
  }
])
const itemCopy = computed(() => {
  if (width.value > 1024) {
    return items.value
  }
  return items.value.slice(0, 2)
})
</script>

<template>
  <section class="bg-[#EEF0F1] pt-16 max-sm:pt-8">
    <div class="container max-xl:px-6">
      <UiTeacherTitle :title="$t('teacher.educationPhilosophy.title')" />
      <div class="grid grid-cols-3 gap-x-6 gap-y-12 max-lg:grid-cols-2 max-md:gap-x-4 max-md:gap-y-8">
        <div v-for="(item, index) in itemCopy" :key="index">
          <div class="relative">
            <img
              :src="item.image"
              :alt="item.name"
              loading="lazy"
              class="max-lg:h-50 max-lg:w-full max-lg:object-cover max-md:h-36"
            />
            <UiButtonPlay />
          </div>
          <p class="text-xl font-bold mt-2 max-md:text-lg max-sm:text-base max-[400px]:text-sm!">{{ item.name }}</p>
        </div>
      </div>
      <div class="py-10 max-md:py-6">
        <BaseButton :text="$t('teacher.educationPhilosophy.viewMore')" variant="outline" class="mx-auto w-40 max-sm:w-full" />
      </div>
    </div>
  </section>
</template>

<style scoped></style>
