<script setup lang="ts">
const { t } = useI18n()
const open = ref(false)
const isScrolled = ref(false)
const route = useRoute()

const navItemsPrimary = computed(() => [
  { name: t('header.nav.studyPlan'), href: '/study-plan' },
  { name: t('header.nav.teachers'), href: '/teachers' },
  { name: t('header.nav.materials'), href: '/' }
])

const navItemsSecondary = computed(() => [
  { name: t('header.nav.blog'), href: '/' },
  { name: t('header.nav.contact'), href: '/' },
  { name: t('header.nav.careers'), href: '/' }
])

const pathActive = computed(() => route.path !== '/' && route.path)

const handleScroll = () => {
  const currentScrollY = window.scrollY

  if (currentScrollY > 20 && !isScrolled.value) {
    isScrolled.value = true
  } else if (currentScrollY <= 20 && isScrolled.value) {
    isScrolled.value = false
  }
}

let scrollTimeout: NodeJS.Timeout | null = null
const throttledScroll = () => {
  if (scrollTimeout) return

  scrollTimeout = setTimeout(() => {
    handleScroll()
    scrollTimeout = null
  }, 10)
}

onMounted(() => {
  window.addEventListener('scroll', throttledScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', throttledScroll)
  if (scrollTimeout) clearTimeout(scrollTimeout)
})
</script>

<template>
  <div
    class="flex justify-between items-center h-24 px-10 max-xl:hidden sticky top-0 z-50 bg-white"
    :class="{
      'header-sticky': isScrolled,
      'header-normal': !isScrolled
    }"
  >
    <img
      src="/images/logo.png"
      alt="Logo"
      loading="lazy"
      class="hover:cursor-pointer transition-all duration-300 hover:scale-110 w-24"
      @click="navigateTo('/')"
    />

    <div class="flex gap-10 items-center">
      <span
        v-for="(item, index) in navItemsPrimary"
        :key="index"
        class="font-bold text-text-primary hover:cursor-pointer relative group transition-all duration-300"
        :class="{ 'text-primary!': pathActive === item.href }"
        @click="navigateTo(item.href)"
      >
        {{ item.name }}
        <span
          class="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"
          :class="{ 'w-full': pathActive === item.href }"
        />
      </span>

      <USeparator orientation="vertical" :class="isScrolled ? 'h-6' : 'h-8'" class="transition-all duration-300" />

      <span
        v-for="(item, index) in navItemsSecondary"
        :key="index"
        class="font-bold text-[#B4ADAD] hover:cursor-pointer hover:text-primary transition-all duration-300 relative group"
        :class="{ 'text-primary!': pathActive === item.href }"
        @click="navigateTo(item.href)"
      >
        {{ item.name }}
        <span
          class="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"
          :class="{ 'w-full': pathActive === item.href }"
        />
      </span>
    </div>

    <div class="flex gap-4 items-center">
      <BaseButton :text="$t('header.login')" @click="navigateTo('/login')" />
      <BaseIcon
        name="phone-call"
        class="hover:text-primary hover:cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-12"
      />
      <BaseIcon name="search" class="hover:text-primary hover:cursor-pointer transition-all duration-300 hover:scale-110" />

      <USeparator orientation="vertical" :class="isScrolled ? 'h-6' : 'h-8'" class="transition-all duration-300" />

      <BaseLanguages class="transition-all duration-300" />
    </div>
  </div>

  <div
    class="hidden max-xl:block px-6 sticky top-0 z-50 bg-white"
    :class="{
      'header-sticky-mobile': isScrolled,
      'header-normal-mobile': !isScrolled
    }"
  >
    <div class="flex justify-between items-center">
      <img
        src="/images/logo.png"
        alt="Logo"
        loading="lazy"
        class="hover:cursor-pointer transition-all duration-300 hover:scale-110 w-24"
        @click="navigateTo('/')"
      />

      <div class="flex justify-end items-center gap-4">
        <BaseLanguages class="transition-all duration-300" />

        <UDrawer
          v-model:open="open"
          direction="right"
          :handle="false"
          should-scale-background
          set-background-color-on-scale
          :ui="{
            content: 'w-full sm:w-96 h-screen flex flex-col',
            overlay: 'backdrop-blur-sm'
          }"
        >
          <UIcon
            name="i-lucide-menu"
            class="size-8 hover:cursor-pointer hover:text-primary transition-all duration-300 hover:scale-110"
          />

          <template #body>
            <div class="w-full animate-in fade-in slide-in-from-right duration-300">
              <div class="flex justify-between items-center border-b border-border-primary pb-4">
                <img
                  src="/images/logo.png"
                  alt="Logo"
                  loading="lazy"
                  class="w-16 hover:cursor-pointer transition-all duration-300 hover:scale-110"
                  @click="
                    () => {
                      ;(navigateTo('/'), (open = false))
                    }
                  "
                />

                <UIcon
                  name="i-lucide-x"
                  class="size-6 hover:cursor-pointer hover:text-primary transition-all duration-300 hover:rotate-90"
                  @click="open = false"
                />
              </div>

              <div class="space-y-3 flex flex-col my-6">
                <span
                  v-for="(item, index) in navItemsPrimary"
                  :key="index"
                  class="hover:cursor-pointer hover:text-primary transition-all duration-300 hover:translate-x-2 py-2 border-b border-gray-100 font-semibold"
                  @click="
                    () => {
                      ;(navigateTo(item.href), (open = false))
                    }
                  "
                >
                  {{ item.name }}
                </span>
              </div>

              <div class="space-y-3 flex flex-col">
                <span
                  v-for="(item, index) in navItemsSecondary"
                  :key="index"
                  class="hover:cursor-pointer hover:text-primary transition-all duration-300 hover:translate-x-2 py-2 text-[#B4ADAD]"
                  @click="
                    () => {
                      ;(navigateTo(item.href), (open = false))
                    }
                  "
                >
                  {{ item.name }}
                </span>
              </div>
            </div>
          </template>

          <template #footer>
            <BaseButton :text="$t('header.login')" class="w-full" />
          </template>
        </UDrawer>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header-normal {
  transition: all 0.3s ease;
}

.header-normal-mobile {
  transition: all 0.3s ease;
}

.header-sticky {
  background-color: white;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  margin-left: 0 !important;
  margin-right: 0 !important;
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  animation: slideDown 0.4s ease-out forwards;
}

.header-sticky-mobile {
  background-color: white;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  margin-left: 0 !important;
  margin-right: 0 !important;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  animation: slideDown 0.4s ease-out forwards;
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideInFromRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-in {
  animation: slideInFromRight 0.3s ease-out forwards;
}
</style>
