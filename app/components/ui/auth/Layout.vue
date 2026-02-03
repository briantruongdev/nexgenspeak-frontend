<script setup lang="ts">
interface IProp {
  subTitle?: string
  heightImg?: string
}

const prop = withDefaults(defineProps<IProp>(), {
  subTitle: '',
  heightImg: 'h-full'
})

const bannerImageSrc = '/images/banner-auth.png'
</script>

<template>
  <div>
    <div class="grid grid-cols-[2fr_1fr] max-md:grid-cols-1">
      <div class="mx-[135px] my-10 max-lg:mx-20 max-sm:mx-10 max-md:my-6">
        <img
          src="/images/logo.png"
          alt="Logo"
          loading="lazy"
          class="hover:cursor-pointer transition-all duration-300 hover:scale-110 w-24"
          @click="navigateTo('/')"
        />
        <p class="text-xl font-bold mb-6 max-md:mb-4">{{ subTitle }}</p>

        <slot />
      </div>
      <img
        :src="bannerImageSrc"
        alt="Banner"
        loading="lazy"
        class="object-cover h-full w-full max-md:hidden"
        :class="heightImg"
      />
    </div>
    <UiAuthSupport />
  </div>
</template>

<style scoped></style>
