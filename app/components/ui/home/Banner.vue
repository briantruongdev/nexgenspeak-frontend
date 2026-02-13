<script setup lang="ts">
const { openTrialRegisterModal } = useTrialRegister()

interface BannerItem {
  key: number
  image: string
  titleKey: string
  subtitleKey: string
  buttonTextKey?: string
}

const items: BannerItem[] = [
  {
    key: 1,
    image: '/images/banner.png',
    titleKey: 'banner.title',
    subtitleKey: 'banner.subtitle',
    buttonTextKey: 'banner.learnMore'
  },
  {
    key: 2,
    image: '/images/banner2.png',
    titleKey: 'banner2.title',
    subtitleKey: 'banner2.subtitle',
    buttonTextKey: 'banner2.learnMore'
  }
]

const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<template>
  <div class="relative w-full">
    <UCarousel v-slot="{ item }" :items="items" loop :autoplay="{ delay: 5000 }">
      <div class="relative" :class="{ bg: item.key === 2 }">
        <img :src="item.image" alt="Banner" loading="lazy" class="w-full h-130 max-lg:h-100 object-cover" />

        <div class="absolute inset-0 top-1/6 max-xl:px-6 max-lg:top-1/12 z-50">
          <div class="container">
            <p
              class="text-6xl font-bold text-white mb-10 max-sm:mb-6 max-lg:text-4xl max-sm:text-3xl animate-1 max-[400px]:text-2xl! line-clamp-3 py-3"
              :class="{ active: isVisible }"
            >
              {{ $t(item.titleKey) }} <br />
              {{ $t(item.subtitleKey) }}
            </p>

            <BaseButton
              v-if="item.buttonTextKey"
              variant="outline"
              class-name="bg-white border-none "
              class-text="max-[400px]:text-xs"
              :text="$t(item.buttonTextKey)"
              icon="i-lucide-move-right"
              @click="openTrialRegisterModal"
            />
          </div>
        </div>
        <div class="absolute bottom-16 inset-x-0 max-xl:px-6 max-lg:bottom-8 z-50">
          <div class="container">
            <div class="flex justify-start items-center gap-2 mb-4">
              <div v-for="(_, index) in 3" :key="index">
                <p class="w-2 h-2 rounded-full bg-white"></p>
              </div>
            </div>
            <USeparator orientation="horizontal" size="lg" class="w-2/6" />

            <p class="gap-4 flex mt-4 max max-md:grid max-md:grid-cols-2 max-md:w-fit">
              <BaseButton
                variant="outline"
                class-text="text-text-primary max-[500px]:text-xs"
                class-name="bg-white/60 border-none"
                :text="$t('banner.registerTrial')"
                @click="openTrialRegisterModal"
              />
              <BaseButton
                variant="outline"
                class-text="text-text-primary max-[500px]:text-xs"
                class-name="bg-white/60 border-none"
                :text="$t('banner.buyCourse')"
                @click="openTrialRegisterModal"
              />
              <BaseButton
                variant="outline"
                class-text="text-text-primary max-[500px]:text-xs"
                class-name="bg-white/60 border-none"
                :text="$t('banner.support')"
                @click="openTrialRegisterModal"
              />
            </p>
          </div>
        </div>
      </div>
    </UCarousel>
  </div>
</template>

<style scoped>
.bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    #e87722 0%,
    rgba(232, 119, 34, 0.95) 18%,
    rgba(232, 119, 34, 0.85) 32%,
    rgba(232, 119, 34, 0.65) 45%,
    rgba(232, 119, 34, 0.45) 55%,
    rgba(232, 119, 34, 0.25) 62%,
    rgba(232, 119, 34, 0.12) 68%,
    rgba(232, 119, 34, 0.05) 73%,
    rgba(232, 119, 34, 0) 80%
  );

  opacity: 0.9;
  z-index: 1;
}
</style>
