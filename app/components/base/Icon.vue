<script setup lang="ts">
interface Props {
  name?: string
  size?: number | string
}

const props = withDefaults(defineProps<Props>(), {
  size: 24,
  name: 'loading'
})

const emit = defineEmits<{ click: [] }>()

const iconStyles = computed(() => {
  return {
    fontSize: `${props.size}px`,
    width: `${props.size}px`,
    height: `${props.size}px`
  }
})

const iconComponent = computed(() => {
  return defineAsyncComponent(() => import(`~/assets/icons/${props.name}.svg`))
})
</script>

<template>
  <component :is="iconComponent" class="base-icon" :style="iconStyles" @click="emit('click')" />
</template>

<style scoped></style>
