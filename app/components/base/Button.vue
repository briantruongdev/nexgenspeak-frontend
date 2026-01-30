<script setup lang="ts">
interface ButtonProps {
  variant?: 'solid' | 'outline' | 'soft' | 'subtle' | 'ghost' | 'link'
  icon?: string
  trailingIcon?: string
  text?: string
  className?: string
  classText?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  disabled?: boolean
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'solid',
  icon: '',
  trailingIcon: '',
  text: '',
  className: '',
  classText: '',
  size: 'lg',
  disabled: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const variantClasses = computed<string>(() => {
  const variants: Record<ButtonProps['variant'] & string, string> = {
    solid: '',
    outline: 'bg-transparent hover:bg-white text-primary border-primary border-1',
    soft: 'bg-primary/10 hover:bg-primary/20 text-primary',
    subtle: 'bg-gray-100 hover:bg-gray-200 text-gray-900',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
    link: 'bg-transparent hover:underline text-primary p-0'
  }

  return variants[props.variant] || variants.solid
})

const uiConfig = computed(() => {
  const configs: Record<string, any> = {
    outline: {
      base: 'active:bg-white focus:bg-white focus-visible:bg-white transition-all duration-200'
    },
    soft: {
      base: 'transition-all duration-200'
    },
    ghost: {
      base: 'transition-all duration-200'
    }
  }

  return configs[props.variant] || {}
})

const buttonClasses = computed<string>(() => {
  const baseClasses = 'rounded cursor-pointer hover:scale-102 flex items-center justify-center transition-transform duration-200'
  const disabledClasses = props.disabled ? 'opacity-50 cursor-not-allowed' : ''

  return [baseClasses, variantClasses.value, disabledClasses, props.className].filter(Boolean).join(' ')
})

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<template>
  <UButton
    :class="buttonClasses"
    class="test"
    :size="size"
    :ui="uiConfig"
    :disabled="disabled"
    :icon
    :trailing-icon="trailingIcon"
    @click="handleClick"
  >
    <template v-if="$slots.default" #leading>
      <slot />
    </template>

    <span v-if="text" :class="`${classText} max-[400px]:text-xs`">
      {{ text }}
    </span>

    <template v-if="$slots.trailing" #trailing>
      <slot name="trailing" />
    </template>
  </UButton>
</template>

<style scoped></style>
