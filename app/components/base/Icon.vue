<script setup lang="ts">
interface Props {
  name?: string
  size?: number | string
}

const { size = 24, name } = defineProps<Props>()

const emit = defineEmits<{ click: [] }>()

const iconStyles = computed(() => {
  return {
    fontSize: `${size}px`,
    width: `${size}px`,
    height: `${size}px`
  }
})

const icons = import.meta.glob<string>('~/assets/icons/*.svg', {
  eager: true,
  query: '?url',
  import: 'default'
})

const iconUrl = computed<string>(() => {
  const key = `/assets/icons/${name}.svg`
  return icons[key] || ''
})
</script>

<template>
  <img v-if="iconUrl" :src="iconUrl" class="base-icon" :style="iconStyles" @click="emit('click')" />
</template>

<style scoped></style>
