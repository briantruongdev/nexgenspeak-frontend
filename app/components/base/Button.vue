<script setup lang="ts">
interface IProps {
  variant?: 'solid' | 'outline' | 'soft' | 'subtle' | 'ghost' | 'link'
  text?: string
  className?: string
  classText?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const props = withDefaults(defineProps<IProps>(), {
  variant: 'solid',
  text: '',
  className: '',
  size: 'lg'
})

const classNames = computed(() => {
  switch (props.variant) {
    case 'outline':
      return 'bg-white hover:bg-white text-primary'

    default:
      return ''
  }
})

const ui = computed(() => {
  switch (props.variant) {
    case 'outline':
      return {
        base: 'active:bg-white focus:bg-white focus-visible:bg-white'
      }

    default:
      return {}
  }
})
</script>

<template>
  <UButton
    :class="`rounded-xl cursor-pointer hover-scale-105 flex items-center  ${classNames} ${props.className}`"
    :size="size"
    :ui="ui"
  >
    <template #leading>
      <slot />
    </template>

    <span class="classText">{{ text }}</span>
  </UButton>
</template>

<style scoped></style>
