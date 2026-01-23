<script setup lang="ts">
const { t } = useI18n()

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
  <div class="container relative">
    <div class="flex justify-between h-[80vh]">
      <div class="mt-12 relative">
        <p class="title mb-5">{{ $t('teacher.banner.title') }}</p>
        <p class="text-xl">
          {{ $t('teacher.banner.description') }}
        </p>
        <div class="absolute top-2/5">
          <div class="relative">
            <BaseButton :text="$t('teacher.banner.bookNow')" />
            <BaseIcon name="arrow" class="absolute -right-20" size="100" />
          </div>
        </div>
      </div>
      <img src="/images/teacher-banner.png" alt="Banner" class="w-100 h-100" />
    </div>
    <div class="grid grid-cols-3 gap-14 bg-white p-10 rounded-4xl box-shadow absolute -bottom-1/4">
      <div v-for="(item, index) in data" :key="index">
        <BaseIcon :name="item.icon" size="40" />
        <p class="text-xl font-medium my-4">{{ item.title }}</p>
        <p class="text-justify">
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
