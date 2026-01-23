<script setup lang="ts">
interface IProp {
  title?: string
}

const prop = withDefaults(defineProps<IProp>(), {
  title: ''
})
</script>

<template>
  <div class="text-center mb-16 max-md:mb-8">
    <p class="text-4xl font-extrabold max-md:text-3xl max-sm:text-2xl">{{ title }}</p>
    <div class="mt-3 flex items-center justify-center gap-4">
      <span class="h-[2px] w-8 bg-primary rounded-full" />
      <span class="h-[2px] w-8 bg-primary rounded-full" />
      <span class="h-[2px] w-8 bg-primary rounded-full" />
    </div>
  </div>
</template>

<style scoped></style>
