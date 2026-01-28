<script setup lang="ts">
interface Props {
  name?: string
  size?: number | string
}

const props = withDefaults(defineProps<Props>(), {
  size: 24,
  name: 'loading'
})
//  ngăn attributes tự động áp dụng lên root element
defineOptions({
  inheritAttrs: false
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

<!-- v-bind="$attrs" vào component SVG - truyền tất cả attributes (bao gồm class) từ parent xuống SVG -->
<template>
  <component :is="iconComponent" class="base-icon" :style="iconStyles" v-bind="$attrs" @click="emit('click')" />
</template>

<style scoped></style>
