<script setup lang="ts">
const { t } = useI18n()

const items = computed(() =>
  Array.from({ length: 9 }, () => ({
    image: '/images/avatar-teacher.png',
    name: 'Nguyễn Mỹ Anh',
    exp: [
      t('teacher.expertAdvisors.experience.item1'),
      t('teacher.expertAdvisors.experience.item2'),
      t('teacher.expertAdvisors.experience.item3'),
      t('teacher.expertAdvisors.experience.item4')
    ]
  }))
)
</script>

<template>
  <section class="bg-[#EEF0F1]">
    <div class="container max-xl:px-6">
      <UiTeacherTitle :title="t('teacher.expertAdvisors.title')" />
      <UCarousel
        v-slot="{ item }"
        loop
        arrows
        wheel-gestures
        prev-icon="i-lucide-chevron-left"
        next-icon="i-lucide-chevron-right"
        :items="items"
        :ui="{
          item: 'basis-full md:basis-1/2 lg:basis-1/3 px-2 sm:px-4 mt-14',
          prev: 'max-xl:translate-x-16 max-sm:-translate-x-0 hover:cursor-pointer text-white bg-primary/60 hover:bg-primary active:bg-primary shadow-none ring-0 focus:ring-0',
          next: 'max-xl:-translate-x-20 max-md:-translate-x-20 max-sm:-translate-x-2 hover:cursor-pointer text-white bg-primary/60 hover:bg-primary active:bg-primary shadow-none ring-0 focus:ring-0'
        }"
      >
        <div class="bg-white rounded-[10px] shadow-md p-6 pb-8 relative mt-8 max-md:p-4 max-md:pb-6">
          <div class="flex justify-center -mt-24 mb-4 max-md:-mt-20">
            <div class="relative">
              <div class="bg-white w-38 h-38 rounded-full flex justify-center items-center max-md:w-32 max-md:h-32">
                <img
                  :src="item.image"
                  :alt="item.name"
                  loading="lazy"
                  class="w-36 h-36 rounded-full object-cover max-md:w-28 max-md:h-28"
                />
              </div>
            </div>
          </div>

          <h3 class="text-xl font-bold text-primary text-center mb-4 max-md:text-lg max-md:mb-3">
            {{ item.name }}
          </h3>

          <ul class="space-y-2">
            <li v-for="(experience, idx) in item.exp" :key="idx" class="flex items-start gap-2 text-sm max-sm:text-xs">
              <span class="w-2 h-2 rounded-full bg-primary shrink-0 mt-2"></span>
              <span class="leading-relaxed">{{ experience }}</span>
            </li>
          </ul>
        </div>
      </UCarousel>
    </div>
  </section>
</template>

<style scoped></style>
