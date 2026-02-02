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
</script>

<template>
  <div class="container relative max-xl:px-6">
    <div class="flex h-[76vh] max-lg:flex-col max-lg:gap-8 max-[560px]:h-[600px] max-[400px]:h-[88vh]">
      <div class="mt-12 relative">
        <p class="title mb-5 max-md:text-3xl max-sm:text-2xl">{{ $t('teacher.banner.title') }}</p>
        <p class="text-xl max-md:text-lg max-sm:text-base max-[400px]:text-sm!">
          {{ $t('teacher.banner.description') }}
        </p>
        <div class="absolute top-2/5 max-lg:relative max-lg:top-0 max-lg:mt-6">
          <div class="relative">
            <BaseButton :text="$t('teacher.banner.bookNow')" @click="openTrialRegisterModal" />
            <BaseIcon name="arrow" class="absolute -right-20 max-lg:hidden!" :size="100" />
          </div>
        </div>
      </div>
      <div class="w-200 relative max-lg:hidden">
        <img src="/images/teacher-banner.png" alt="Banner" class="w-100 h-100" />
        <BaseIcon name="star2" class="absolute top-6" :size="80" />
        <BaseIcon name="star" class="absolute top-1/2 right-16" :size="120" />
      </div>

      <div class="max-lg:flex max-lg:justify-center hidden max-lg:visible">
        <img src="/images/teacher-banner.png" alt="Banner" class="h-72 w-72" />
      </div>
    </div>
    <div
      class="grid grid-cols-3 gap-14 bg-white p-8 rounded-4xl box-shadow absolute -bottom-1/4 max-lg:grid-cols-1 max-lg:gap-6 max-lg:p-6 max-lg:relative max-lg:bottom-0 max-lg:mb-6 max-xl:mr-6 max-lg:mr-0"
    >
      <div v-for="(item, index) in data" :key="index">
        <BaseIcon :name="item.icon" :size="40" class="max-sm:w-8 max-sm:h-8" />
        <p class="text-xl font-medium my-4 max-md:text-lg max-md:my-3">{{ item.title }}</p>
        <p class="text-justify max-md:text-sm">
          {{ item.description }}
        </p>
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
