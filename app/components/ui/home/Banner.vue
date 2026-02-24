<script setup lang="ts">
const { t } = useI18n()
const { openTrialRegisterModal } = useTrialRegister()

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

const items: BannerItem[] = [
  {
    key: 3,
    media: {
      type: 'video',
      poster:
        'https://assets.engoo.com/assets/general/new-top-page/banner-bg-286f1a6972902f3b09fc32e7fcafb8d2efd904086e72e2300f4cd241bcb51f3f.jpg',
      sources: [
        {
          src: 'https://assets.engoo.com/assets/general/new-top-page/banner-pc-69ee6b60747b98ccbdea6fe9280ee58980880a7f89077d29056ccf0e152e008a.webm',
          type: 'video/webm'
        },
        {
          src: 'https://assets.engoo.com/assets/general/new-top-page/banner-pc-57753f08b6d09b00323db945bfef48a1a0eae2ef005f5a65d29aabfeb328c557.mp4',
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
      alt: 'Banner học tiếng Anh 1 kèm 1 - NexGen Speak'
    },
    headlineKeys: ['banner.title', 'banner.subtitle'],
    buttonTextKey: 'banner.learnMore'
  },
  {
    key: 2,
    media: {
      type: 'image',
      src: '/images/banner2.png',
      alt: 'Banner học tiếng Anh 1 kèm 1 - NexGen Speak'
    },
    headlineKeys: ['banner2.title', 'banner2.subtitle'],
    buttonTextKey: 'banner2.learnMore'
  }
]

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
        <img
          v-if="item.media.type === 'image'"
          :src="item.media.src"
          :alt="item.media.alt"
          :loading="item.key === 1 ? 'eager' : 'lazy'"
          :fetchpriority="item.key === 1 ? 'high' : undefined"
          width="1280"
          height="520"
          class="w-full h-130 max-lg:h-100 object-cover"
        />
        <video
          v-else
          autoplay
          loop
          muted
          playsinline
          :poster="item.media.poster"
          preload="metadata"
          class="w-full h-130 max-lg:h-100 object-cover"
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
        <div v-else class="absolute top-1/5 left-[36%]">
          <p class="text-6xl font-bold text-center text-primary">IMPROVE</p>
          <p class="text-6xl font-bold text-center text-primary">YOUR ENGLISH</p>
          <p class="text-5xl text-center mt-3">Anytime, Anywhere</p>
          <button
            class="w-full bg-primary hover:bg-orange-600 hover:scale-102 rounded-tr-4xl rounded-bl-4xl transition-transform duration-200 hover:cursor-pointer text-white font-bold text-lg px-8 mt-8 py-4 flex items-center justify-center gap-3"
          >
            START WITH UP TO 50% OFF
          </button>
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
