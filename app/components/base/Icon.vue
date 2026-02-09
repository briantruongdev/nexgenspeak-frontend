<script setup lang="ts">
interface Props {
  name?: string
  size?: number | string
  color?: string
  hoverColor?: string
}

const { size = 24, name, color, hoverColor } = defineProps<Props>()

const emit = defineEmits<{ click: [] }>()

const iconStyles = computed(() => {
  return {
    fontSize: `${size}px`,
    width: `${size}px`,
    height: `${size}px`,
    color: color || 'currentColor'
  }
})

const icons = import.meta.glob<string>('~/assets/icons/*.svg', {
  eager: true,
  query: '?raw',
  import: 'default'
})

const iconContent = computed<string>(() => {
  const key = `/assets/icons/${name}.svg`
  return icons[key] || ''
})
</script>

<template>
  <span
    v-if="iconContent"
    class="base-icon"
    :class="{ 'has-hover': hoverColor }"
    :style="iconStyles"
    @click="emit('click')"
    v-html="iconContent"
  />
</template>

<style scoped>
.base-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;
}

.base-icon.has-hover {
  cursor: pointer;
}

.base-icon.has-hover:hover {
  color: v-bind(hoverColor);
}

.base-icon :deep(svg) {
  width: 100%;
  height: 100%;
  fill: currentColor;
  transition: fill 0.3s ease;
}
</style>
