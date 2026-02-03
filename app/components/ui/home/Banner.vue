<script setup lang="ts">
const { openTrialRegisterModal } = useTrialRegister()
// const items = ['/images/banner.png', '/images/banner2.jpg']
const img = '/images/banner.png'
const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<template>
  <div class="relative w-full">
    <!-- <UCarousel v-slot="{ item }" :items="items" loop :autoplay="{ delay: 5000 }">
    </UCarousel> -->
    <img :src="img" alt="Banner" loading="lazy" class="w-full h-130 max-lg:h-100 object-cover" />
    <div class="absolute inset-0 top-1/6 max-xl:px-6 max-lg:top-1/12">
      <div class="container">
        <p
          class="text-6xl font-bold text-white mb-10 max-lg:text-4xl animate-1 max-[400px]:text-3xl!"
          :class="{ active: isVisible }"
        >
          {{ $t('banner.title') }} <br />
          {{ $t('banner.subtitle') }}
        </p>

        <BaseButton
          variant="outline"
          class-name="bg-white border-none "
          class-text="max-[400px]:text-xs"
          :text="$t('banner.learnMore')"
          icon="i-lucide-move-right"
          @click="openTrialRegisterModal"
        />
      </div>
    </div>
    <div class="absolute bottom-16 inset-x-0 max-xl:px-6 max-lg:bottom-8">
      <div class="container">
        <div class="flex justify-start items-center gap-2 mb-4">
          <div v-for="(item, index) in 3" :key="index">
            <p class="w-2 h-2 rounded-full bg-white"></p>
          </div>
        </div>
        <USeparator orientation="horizontal" size="lg" class="w-2/6" />

        <p class="gap-4 flex mt-4 max max-md:grid max-md:grid-cols-2 max-md:w-fit">
          <BaseButton
            variant="outline"
            class-text="text-text-primary max-[400px]:text-xs"
            class-name="bg-white/60 border-none"
            :text="$t('banner.registerTrial')"
            @click="openTrialRegisterModal"
          />
          <BaseButton
            variant="outline"
            class-text="text-text-primary"
            class-name="bg-white/60 border-none"
            :text="$t('banner.buyCourse')"
            @click="openTrialRegisterModal"
          />
          <BaseButton
            variant="outline"
            class-text="text-text-primary"
            class-name="bg-white/60 border-none"
            :text="$t('banner.support')"
            @click="openTrialRegisterModal"
          />
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
