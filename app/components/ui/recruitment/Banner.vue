<script setup lang="ts">
const img = '/images/contact-banner.png'
const isVisible = ref(false)
const { t } = useI18n()

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<template>
  <div class="relative">
    <img :src="img" alt="Banner" loading="lazy" class="w-full h-100 object-cover max-lg:h-80" />
    <div class="container max-xl:px-6">
      <p
        class="absolute bg-primary px-12 py-5 rounded-2xl bottom-10 text-4xl font-bold text-white w-2/3 max-sm:w-fit max-sm:mr-6 max-sm:text-xl animate-1 max-lg:text-xl"
        :class="{ active: isVisible }"
      >
        {{ t('recruitment.banner.title') }}
      </p>
    </div>
  </div>
</template>

<style scoped></style>
