<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()

const height = computed(() => (width.value > 640 ? 50 : 300))
</script>

<template>
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.9867145257163!2d105.76884337503154!3d21.033217580617215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454b7390fffff%3A0xb2a068338fb0a52b!2zVMOyYSBuaMOgIFN1Y2VkIDEwOCBOZ3V54buFbiBIb8Ogbmc!5e0!3m2!1svi!2s!4v1766543942299!5m2!1svi!2s"
    width="100%"
    :height="height"
    style="border: 0"
    allowfullscreen="true"
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
  ></iframe>
</template>

<style scoped></style>
