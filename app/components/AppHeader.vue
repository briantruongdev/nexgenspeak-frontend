<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'

const { t } = useI18n()
const { email, isAuthenticated } = storeToRefs(useAuthStore())
const { handleLogout } = useAuth()
const open = ref(false)
const isScrolled = ref(false)
const route = useRoute()
const { width } = useWindowSize()
const navItemsPrimary = computed(() => [
  { name: t('header.nav.classSchedule'), href: '/my-schedule', view: isAuthenticated.value && width.value <= 1280 },
  { name: t('header.nav.studyPlan'), href: '/study-plan', view: true },
  { name: t('header.nav.teachers'), href: '/teachers', view: true },
  { name: t('header.nav.document'), href: '/document', view: true },
  { name: t('header.nav.register'), href: '/registration', view: isAuthenticated.value }
])

const navItemsSecondary = computed(() => [
  { name: t('header.nav.blog'), href: '/blog', view: true },
  { name: t('header.nav.contact'), href: '/contact', view: true },
  { name: t('header.nav.recruitment'), href: '/recruitment', view: true }
])

const pathActive = computed(() => route.path !== '/' && route.path)

watch(open, isOpen => {
  if (import.meta.client) {
    if (isOpen) {
      document.documentElement.style.overflowX = 'hidden'
      document.body.style.overflowX = 'hidden'
    } else {
      document.documentElement.style.overflowX = ''
      document.body.style.overflowX = ''
    }
  }
})

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
const visibleNavItems = computed(() => navItemsPrimary.value.filter(i => i.view))

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
        v-for="(item, index) in visibleNavItems"
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
      <BaseButton v-if="!isAuthenticated" :text="t('header.login')" @click="navigateTo('/login')" />

      <UPopover v-else>
        <BaseIcon name="avatar-default" color="#ddd" size="36" class="hover:cursor-pointer" />

        <template #content>
          <div class="p-4 space-y-2">
            <p class="text-primary font-medium">
              {{ email }}
            </p>
            <p
              class="hover:underline hover:text-primary hover:cursor-pointer transition-all duration-300 hover:translate-x-2"
              :class="{ 'text-primary!': pathActive === '/my-schedule' }"
              @click="navigateTo('/my-schedule')"
            >
              {{ t('header.nav.classSchedule') }}
            </p>
            <p
              class="hover:underline hover:text-primary hover:cursor-pointer transition-all duration-300 hover:translate-x-2"
              @click="handleLogout"
            >
              {{ t('auth.logout') }}
            </p>
          </div>
        </template>
      </UPopover>

      <!-- <a href="tel:+84888887798">
        <UIcon
          name="i-lucide-phone-call"
          class="hover:cursor-pointer hover:text-primary transition-all duration-300 hover:scale-110 size-6"
      /></a>
      <UIcon
        name="i-lucide-search"
        class="size-6 hover:cursor-pointer hover:text-primary transition-all duration-300 hover:scale-110"
      /> -->
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
        class="hover:cursor-pointer transition-all duration-300 hover:scale-110 w-20"
        @click="navigateTo('/')"
      />

      <div class="flex justify-end items-center gap-4">
        <!-- <a href="tel:+84 888 887 798">
          <UIcon
            name="i-lucide-phone-call"
            class="hover:cursor-pointer hover:text-primary transition-all duration-300 hover:scale-110 size-6"
        /></a>
        <UIcon
          name="i-lucide-search"
          class="size-6 hover:cursor-pointer hover:text-primary transition-all duration-300 hover:scale-110"
        /> -->

        <UDrawer
          v-model:open="open"
          direction="right"
          :handle="false"
          should-scale-background
          set-background-color-on-scale
          :ui="{
            content: 'w-full sm:w-96 h-screen flex flex-col',
            overlay: 'backdrop-blur-sm',
            footer: 'gap-0'
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
                  class="w-14 hover:cursor-pointer transition-all duration-300 hover:scale-110"
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

              <div class="space-y-2 flex flex-col mt-4 mb-2">
                <div v-for="(item, index) in visibleNavItems" :key="index">
                  <p
                    v-if="item.view"
                    class="hover:cursor-pointer hover:text-primary transition-all duration-300 hover:translate-x-2 py-2 border-b border-gray-100 font-semibold"
                    :class="{ 'text-primary!': pathActive === item.href }"
                    @click="
                      () => {
                        ;(navigateTo(item.href), (open = false))
                      }
                    "
                  >
                    {{ item.name }}
                  </p>
                </div>
              </div>

              <div class="space-y-2 flex flex-col">
                <span
                  v-for="(item, index) in navItemsSecondary"
                  :key="index"
                  class="hover:cursor-pointer hover:text-primary transition-all duration-300 hover:translate-x-2 py-2 text-[#B4ADAD] border-b border-gray-100"
                  :class="{ 'text-primary! font-bold': pathActive === item.href }"
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
            <BaseButton v-if="!isAuthenticated" :text="t('header.login')" class="w-full" @click="navigateTo('/login')" />
            <div v-else class="space-y-4">
              <UBadge color="primary" variant="subtle" class="h-10 text-center flex justify-center text-base font-medium">{{
                email
              }}</UBadge>
              <BaseButton :text="t('auth.logout')" class="w-full h-10 gap-0" />
            </div>

            <BaseLanguages class="transition-all duration-300 w-full mt-4" />
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
