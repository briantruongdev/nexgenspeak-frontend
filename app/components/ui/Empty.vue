<script setup lang="ts">
const { t } = useI18n()

const { show = true, emptyText = 'no-data' } = defineProps<{
  show?: boolean
  emptyText?: string
}>()
</script>

<template>
  <div v-if="show" class="flex h-50 items-center justify-center">
    <UIcon name="i-lucide-text-search" class="size-20 text-gray-400" />
    <p class="mt-3 text-sm text-gray-400">{{ t(`${emptyText}`) }}</p>
  </div>
</template>

<style scoped></style>
