<script setup lang="ts">
import { id } from 'zod/locales'

const { t } = useI18n()

const items = computed(() => [
  {
    idx: 1,
    title: t('studyPlan.learningMethod.reasons.item1.title'),
    des: t('studyPlan.learningMethod.reasons.item1.description')
  },
  {
    idx: 2,
    title: t('studyPlan.learningMethod.reasons.item2.title'),
    des: t('studyPlan.learningMethod.reasons.item2.description')
  },
  {
    idx: 3,
    title: t('studyPlan.learningMethod.reasons.item3.title'),
    des: t('studyPlan.learningMethod.reasons.item3.description')
  },
  {
    idx: 4,
    title: t('studyPlan.learningMethod.reasons.item4.title'),
    des: t('studyPlan.learningMethod.reasons.item4.description')
  }
])

const aboutClass = computed(() => [
  {
    id: 1,
    image: '/images/plan1.png',
    title: t('studyPlan.learningMethod.aboutClass.class1.title'),
    data: [
      t('studyPlan.learningMethod.aboutClass.class1.item1'),
      t('studyPlan.learningMethod.aboutClass.class1.item2'),
      t('studyPlan.learningMethod.aboutClass.class1.item3')
    ]
  },
  {
    id: 2,
    image: '/images/plan2.png',
    title: t('studyPlan.learningMethod.aboutClass.class2.title'),
    data: [
      t('studyPlan.learningMethod.aboutClass.class2.item1'),
      t('studyPlan.learningMethod.aboutClass.class2.item2'),
      t('studyPlan.learningMethod.aboutClass.class2.item3')
    ]
  },
  {
    id: 3,
    image: '/images/plan3.png',
    title: t('studyPlan.learningMethod.aboutClass.class3.title'),
    data: [
      t('studyPlan.learningMethod.aboutClass.class3.item1'),
      t('studyPlan.learningMethod.aboutClass.class3.item2'),
      t('studyPlan.learningMethod.aboutClass.class3.item3')
    ]
  },
  {
    id: 4,
    image: '/images/plan4.png',
    title: t('studyPlan.learningMethod.aboutClass.class4.title'),
    data: [
      t('studyPlan.learningMethod.aboutClass.class4.item1'),
      t('studyPlan.learningMethod.aboutClass.class4.item2'),
      t('studyPlan.learningMethod.aboutClass.class4.item3')
    ]
  }
])
</script>

<template>
  <section class="bg-[#EEF0F1] py-16 max-lg:py-12 max-md:py-8">
    <div class="container max-xl:px-6">
      <p class="title">{{ t('studyPlan.learningMethod.title') }}</p>
      <p class="text-lg my-4 max-sm:text-base">
        {{ t('studyPlan.learningMethod.description') }}
      </p>
      <div class="space-y-6 max-[400px]:mb-6">
        <div v-for="(item, index) in items" :key="index" class="flex items-start gap-6 max-[450px]:gap-4">
          <div
            class="shrink-0 w-16 h-16 max-[600px]:w-10 max-[600px]:h-10 max-[600px]:text-xl flex items-center justify-center text-3xl font-bold border border-primary rounded-full text-primary"
          >
            {{ index + 1 }}
          </div>

          <div class="flex-1">
            <p class="text-xl font-medium max-sm:text-lg max-[400px]:text-base">
              {{ item.title }}
            </p>

            <p class="mt-2 text-gray-600 max-[400px]:text-sm">
              {{ item.des }}
            </p>
          </div>
        </div>
      </div>
      <!-- <div class="flex justify-center mt-12 max-lg:mt-8">
        <p class="w-2/3 justify-center text-lg font-medium text-center max-md:w-full max-sm:text-base max-[400px]:text-sm!">
          {{ t('studyPlan.learningMethod.footer') }}
        </p>
      </div> -->
      <div class="w-full flex justify-center py-10 max-[400px]:hidden">
        <div class="relative w-[900px] max-w-full h-[140px] max-[550px]:h-30! flex">
          <div class="w-3/5 rounded-l-full bg-white flex items-center pl-16 max-sm:pl-10 max-[450px]:pl-6!">
            <ul class="space-y-4 text-primary text-xl max-sm:text-base font-semibold max-sm:space-y-2 max-[550px]:text-xs!">
              <li class="flex items-center gap-4 max-[450px]:gap-2">
                <span>✓</span>
                <span>{{ t('studyPlan.learningMethod.highlights.practical') }}</span>
              </li>
              <li class="flex items-center gap-4 max-[450px]:gap-2">
                <span>✓</span>
                <span>{{ t('studyPlan.learningMethod.highlights.smart') }}</span>
              </li>
              <li class="flex items-center gap-4 max-[450px]:gap-2">
                <span>✓</span>
                <span>{{ t('studyPlan.learningMethod.highlights.quality') }}</span>
              </li>
            </ul>
          </div>

          <div class="w-2/5 bg-primary rounded-r-full flex items-center justify-center text-white relative">
            <div class="text-center text-2xl max-md:text-xl max-sm:text-base max-[500px]:text-xs!">
              <p class="font-bold">{{ t('studyPlan.learningMethod.highlights.result') }}</p>
              <p class="font-bold mt-2">{{ t('studyPlan.learningMethod.highlights.duration') }}</p>
            </div>
          </div>

          <div
            class="absolute left-3/5 top-0 -translate-x-1/2 h-full w-[80px] max-[500px]:w-14! bg-primary"
            style="clip-path: polygon(40% 0%, 100% 0%, 60% 50%, 100% 100%, 40% 100%, 0% 50%)"
          ></div>
        </div>
      </div>

      <div v-for="item in aboutClass" :key="item.id">
        <div class="grid grid-cols-2 gap-8 my-8 max-sm:hidden">
          <img v-if="item.id % 2 === 0" :src="item.image" loading="lazy" class="h-70 max-md:h-60 w-full object-cover" />
          <div>
            <p class="text-primary text-xl font-medium max-md:text-lg max-sm:text-base">{{ item.id }}. {{ item.title }}</p>
            <ul class="list-disc pl-4 mt-2">
              <li v-for="(_item, index) in item.data" :key="index" class="text-lg max-md:text-base max-sm:text-sm">
                {{ _item }}
              </li>
            </ul>
          </div>
          <img v-if="item.id % 2 !== 0" :src="item.image" loading="lazy" class="h-70 max-md:h-60 w-full object-cover" />
        </div>
        <div class="hidden max-sm:block mb-6 max-[450px]:mb-4!">
          <p class="text-primary text-xl font-medium max-[500px]:text-base!">{{ item.id }}. {{ item.title }}</p>
          <img :src="item.image" loading="lazy" class="h-40 w-full object-cover my-4" />
          <ul class="list-disc pl-4 mt-2">
            <li v-for="(_item, index) in item.data" :key="index" class="max-[500px]:text-sm!">
              {{ _item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
