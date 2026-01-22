<script setup lang="ts">
interface IProp {
  subTitle?: string
}

const prop = withDefaults(defineProps<IProp>(), {
  subTitle: ''
})

// Ensure image path is always resolved correctly
const bannerImageSrc = '/images/banner-auth.png'
</script>

<template>
  <div>
    <div class="grid grid-cols-[2fr_1fr] max-md:grid-cols-1">
      <div class="mx-[135px] my-20 max-lg:mx-20">
        <p class="title">NGS</p>
        <p class="text-xl font-bold my-10">{{ subTitle }}</p>

        <slot />
      </div>
      <img :src="bannerImageSrc" alt="Banner" loading="lazy" class="object-cover h-full max-md:hidden" />
    </div>
    <UiAuthSupport />
  </div>
</template>

<style scoped></style>
