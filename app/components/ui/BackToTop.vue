<script setup lang="ts">
const isVisible = ref(false)

const handleScroll = () => {
  isVisible.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-4"
  >
    <button
      v-show="isVisible"
      aria-label="Back to top"
      class="fixed bottom-6 right-6 z-50 hover:cursor-pointer flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white shadow-lg transition-transform duration-300 hover:bg-primary/90 hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary/50 will-change-transform"
      @click="scrollToTop"
    >
      <UIcon name="i-lucide-chevron-up" class="size-8" />
    </button>
  </Transition>
</template>
