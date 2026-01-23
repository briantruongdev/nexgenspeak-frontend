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
  <section class="bg-[#EEF0F1] pt-10">
    <div class="container max-xl:px-6">
      <UiTeacherTitle :title="$t('teacher.expertAdvisors.title')" />
      <UCarousel
        v-slot="{ item }"
        loop
        arrows
        wheel-gestures
        prev-icon="i-lucide-chevron-left"
        next-icon="i-lucide-chevron-right"
        :items="items"
        :ui="{
          item: 'basis-full sm:basis-1/2 lg:basis-1/4 px-2 sm:px-3 mt-14',
          prev: 'hover:cursor-pointer text-white bg-primary hover:bg-primary/60 shadow-none ring-0 focus:ring-0',
          next: 'hover:cursor-pointer text-white bg-primary hover:bg-primary/60 shadow-none ring-0 focus:ring-0'
        }"
      >
        <div class="bg-white rounded-[10px] shadow-md p-6 pb-8 relative mt-8">
          <div class="flex justify-center -mt-24 mb-4">
            <div class="relative">
              <div class="bg-white w-38 h-38 rounded-full flex justify-center items-center">
                <img :src="item.image" :alt="item.name" loading="lazy" class="w-36 h-36 rounded-full object-cover" />
              </div>
            </div>
          </div>

          <h3 class="text-xl font-bold text-primary text-center mb-4">
            {{ item.name }}
          </h3>

          <ul class="space-y-2">
            <li v-for="(experience, idx) in item.exp" :key="idx" class="flex items-start gap-2 text-sm">
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
