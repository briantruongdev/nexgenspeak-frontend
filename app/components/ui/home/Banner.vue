<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'

const { t } = useI18n()
const { openTrialRegisterModal } = useTrialRegister()

const { width } = useWindowSize()

type BannerMedia =
  | {
      type: 'image'
      src: string
      alt: string
    }
  | {
      type: 'video'
      poster: string
      sources: Array<{
        src: string
        type: string
      }>
    }

interface BannerItem {
  key: number
  media: BannerMedia
  headlineKeys?: string[]
  headline?: string[]
  buttonTextKey?: string
}
const isVisible = ref(false)
const isMounted = ref(false)

const isMobile = computed(() => width.value < 640)
const videoKey = computed(() => (isMobile.value ? 'mobile' : 'desktop'))

const items = computed<BannerItem[]>(() => [
  {
    key: 3,
    media: {
      type: 'video',
      poster: isMobile.value
        ? 'https://assets.engoo.com/assets/general/new-top-page/banner-bg-mob-edacb44479b7ab04adbcff8fe24d39fd37adc1db37311c492388bd1d2e2b1eb8.jpg'
        : 'https://assets.engoo.com/assets/general/new-top-page/banner-bg-286f1a6972902f3b09fc32e7fcafb8d2efd904086e72e2300f4cd241bcb51f3f.jpg',
      sources: [
        {
          src: isMobile.value
            ? 'https://assets.engoo.com/assets/general/new-top-page/banner-mo-c4a47a945b3233a61fa952c9659c6d95a6a6ac367ed9798db9005c24887370e1.webm'
            : 'https://assets.engoo.com/assets/general/new-top-page/banner-pc-69ee6b60747b98ccbdea6fe9280ee58980880a7f89077d29056ccf0e152e008a.webm',
          type: 'video/webm'
        },
        {
          src: isMobile.value
            ? 'https://assets.engoo.com/assets/general/new-top-page/banner-mo-3b924d950c3b06b78037df4e7da9c8089b34974fc9582fda335026eed849954f.mp4'
            : 'https://assets.engoo.com/assets/general/new-top-page/banner-pc-57753f08b6d09b00323db945bfef48a1a0eae2ef005f5a65d29aabfeb328c557.mp4',
          type: 'video/mp4'
        }
      ]
    }
  },
  {
    key: 1,
    media: {
      type: 'image',
      src: '/images/banner.png',
      alt: t('banner.altBanner')
    },
    headlineKeys: ['banner.title', 'banner.subtitle'],
    buttonTextKey: 'banner.learnMore'
  },
  {
    key: 2,
    media: {
      type: 'image',
      src: '/images/banner2.png',
      alt: t('banner.altBanner')
    },
    headlineKeys: ['banner2.title', 'banner2.subtitle'],
    buttonTextKey: 'banner2.learnMore'
  }
])

onMounted(() => {
  nextTick(() => {
    isMounted.value = true
  })
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<template>
  <div class="relative w-full">
    <UCarousel v-slot="{ item }" :items="items" loop :autoplay="{ delay: 5000 }">
      <div class="relative" :class="{ bg: item.key === 2 }">
        <img
          v-if="item.media.type === 'image'"
          :src="item.media.src"
          :alt="item.media.alt"
          :loading="item.key === 1 ? 'eager' : 'lazy'"
          :fetchpriority="item.key === 1 ? 'high' : undefined"
          width="1280"
          height="520"
          class="w-full max-lg:h-100 lg:h-[clamp(30rem,34vw,46rem)] object-cover"
        />
        <div
          v-else-if="item.media.type === 'video' && !isMounted"
          class="w-full max-lg:h-100 lg:h-[clamp(30rem,34vw,46rem)] bg-gray-200"
        >
          <img :src="item.media.poster" alt="Video poster" class="w-full h-full object-cover" />
        </div>
        <video
          v-else-if="item.media.type === 'video' && isMounted"
          :key="`video-${item.key}-${videoKey}`"
          autoplay
          loop
          muted
          playsinline
          :poster="item.media.poster"
          preload="metadata"
          class="w-full max-lg:h-100 lg:h-[clamp(30rem,34vw,46rem)] object-cover"
        >
          <source v-for="source in item.media.sources" :key="source.src" :src="source.src" :type="source.type" />
          Your browser does not support the video tag.
        </video>

        <template v-if="item.media.type === 'image'">
          <div class="absolute inset-0 top-1/6 max-xl:px-6 max-lg:top-1/12 z-50">
            <div class="container">
              <p
                class="text-6xl font-bold text-white mb-10 max-sm:mb-6 max-lg:text-4xl max-sm:text-3xl animate-1 max-[400px]:text-2xl! line-clamp-3 py-3"
                :class="{ active: isVisible }"
              >
                <template v-if="item.headlineKeys?.length">
                  <template v-for="(lineKey, idx) in item.headlineKeys" :key="lineKey">
                    {{ t(lineKey) }}<br v-if="idx < item.headlineKeys.length - 1" />
                  </template>
                </template>
                <template v-else-if="item.headline?.length">
                  <template v-for="(line, idx) in item.headline" :key="`${item.key}-${idx}`">
                    {{ line }}<br v-if="idx < item.headline.length - 1" />
                  </template>
                </template>
              </p>

              <BaseButton
                v-if="item.buttonTextKey"
                variant="outline"
                class-name="bg-white border-none "
                class-text="max-[400px]:text-xs"
                :text="t(item.buttonTextKey)"
                icon="i-lucide-move-right"
                @click="openTrialRegisterModal"
              />
            </div>
          </div>
          <div class="absolute bottom-16 inset-x-0 max-xl:px-6 max-lg:bottom-8 z-50">
            <div class="container">
              <div class="flex justify-start items-center gap-2 mb-4">
                <div v-for="(_, index) in items.length" :key="index">
                  <p class="w-2 h-2 rounded-full bg-white"></p>
                </div>
              </div>
              <USeparator orientation="horizontal" size="lg" class="w-2/6" />

              <p class="gap-4 flex mt-4 max max-md:grid max-md:grid-cols-2 max-md:w-fit">
                <BaseButton
                  variant="outline"
                  class-text="text-text-primary max-[500px]:text-xs"
                  class-name="bg-white/60 border-none"
                  :text="t('banner.registerTrial')"
                  @click="openTrialRegisterModal"
                />
                <BaseButton
                  variant="outline"
                  class-text="text-text-primary max-[500px]:text-xs"
                  class-name="bg-white/60 border-none"
                  :text="t('banner.buyCourse')"
                  @click="openTrialRegisterModal"
                />
                <BaseButton
                  variant="outline"
                  class-text="text-text-primary max-[500px]:text-xs"
                  class-name="bg-white/60 border-none"
                  :text="t('banner.support')"
                  @click="openTrialRegisterModal"
                />
              </p>
            </div>
          </div>
        </template>
        <div v-else-if="item.media.type === 'video'" class="absolute inset-0 flex flex-col items-center justify-center px-6">
          <p class="text-6xl font-bold text-center text-primary max-lg:text-5xl max-[900px]:text-4xl! max-[600px]:text-2xl!">
            {{ t('banner3.improve') }}
          </p>
          <p class="text-6xl font-bold text-center mt-3 text-primary max-lg:text-5xl max-[900px]:text-4xl! max-[600px]:text-2xl!">
            {{ t('banner3.yourEnglish') }}
          </p>
          <p class="text-5xl text-center mt-3 max-lg:text-4xl max-[900px]:text-3xl! max-[600px]:text-lg!">
            {{ t('banner3.anytimeAnywhere') }}
          </p>
          <div class="flex justify-center">
            <button
              class="w-fit bg-primary hover:bg-orange-600 hover:scale-102 rounded-tr-4xl rounded-bl-4xl transition-transform duration-200 hover:cursor-pointer text-white font-bold text-lg max-sm:text-base! px-8 mt-8 py-4 flex items-center justify-center gap-3"
              @click="openTrialRegisterModal"
            >
              {{ t('banner3.startWithDiscount') }}
            </button>
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
