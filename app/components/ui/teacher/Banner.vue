<script setup lang="ts">
const { t } = useI18n()
const { openTrialRegisterModal } = useTrialRegister()

const data = computed(() => [
  {
    icon: 'line',
    title: t('teacher.banner.highlights.item1.title'),
    description: t('teacher.banner.highlights.item1.description')
  },
  {
    icon: 'heart',
    title: t('teacher.banner.highlights.item2.title'),
    description: t('teacher.banner.highlights.item2.description')
  },
  {
    icon: 'award',
    title: t('teacher.banner.highlights.item3.title'),
    description: t('teacher.banner.highlights.item3.description')
  }
])
const src = '/images/teacher-banner.png'
</script>

<template>
  <div class="container max-xl:px-6 grid grid-cols-2 gap-10 py-10 max-[900px]:grid-cols-1">
    <div>
      <p class="title mb-5 max-md:text-3xl max-sm:text-2xl">{{ t('teacher.banner.title') }}</p>
      <p class="">
        {{ t('teacher.banner.description') }}
      </p>

      <div class="flex justify-between w-full pr-10">
        <div class="mt-8 max-lg:mt-6">
          <div class="relative">
            <BaseButton :text="t('teacher.banner.bookNow')" @click="openTrialRegisterModal" />
            <BaseIcon name="arrow" class="absolute -right-20 max-lg:hidden!" :size="100" />
          </div>
        </div>
        <img :src="src" alt="Banner" class="w-50 h-50 max-[900px]:hidden" />
      </div>
    </div>

    <div>
      <div class="grid grid-cols-1 bg-white p-6 rounded-4xl box-shadow">
        <div v-for="(item, index) in data" :key="index" class="flex justify-start items-start gap-4 mb-4">
          <BaseIcon :name="item.icon" :size="32" />
          <div>
            <p class="text-xl font-medium max-md:text-lg mb-2">{{ item.title }}</p>
            <p class="text-justify max-md:text-sm">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.box-shadow {
  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}
</style>
