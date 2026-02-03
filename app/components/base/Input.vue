<script setup lang="ts">
interface Props {
  modelValue?: string | number
  label?: string
  placeholder?: string
  type?: string
  required?: boolean
  disabled?: boolean
  icon?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'outline' | 'soft' | 'subtle' | 'ghost' | 'none'
  isShowClear?: boolean
  ui?: any
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  label: '',
  placeholder: ' ',
  type: 'text',
  required: false,
  disabled: false,
  size: 'xl',
  variant: 'outline',
  isShowClear: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  input: []
  clear: []
}>()

const inputValue = computed({
  get: () => props.modelValue,
  set: val => {
    emit('update:modelValue', val)
    emit('input')
  }
})

const clearInput = () => {
  inputValue.value = ''
  emit('clear')
}
</script>

<template>
  <UInput
    v-model="inputValue"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    :icon="icon"
    :size="size"
    :variant="variant"
    :ui="{ base: 'peer', ...ui }"
  >
    <template v-if="label" #default>
      <label
        class="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-highlighted text-xs font-medium px-1.5 transition-all peer-focus:top-0 peer-focus:text-highlighted peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-dimmed peer-placeholder-shown:top-1/2 peer-placeholder-shown:font-normal"
      >
        <span class="inline-flex bg-default px-1 items-center">
          {{ label }}
          <span v-if="required" class="text-red-500 ml-0.5">*</span>
        </span>
      </label>
    </template>
    <template v-if="isShowClear && inputValue" #trailing>
      <UButton color="neutral" variant="link" size="sm" icon="i-lucide-circle-x" aria-label="Clear input" @click="clearInput" />
    </template>

    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
  </UInput>
</template>
