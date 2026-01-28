<script setup lang="ts">
const bannerImageSrc = '/images/banner-auth.png'
</script>

<template>
  <div class="container grid grid-cols-[1fr_1.5fr] pt-24 max-lg:pt-20 max-sm:grid-cols-1">
    <div class="aspect-3/4 max-lg:aspect-auto">
      <img :src="bannerImageSrc" class="w-full h-full object-cover" />
    </div>
    <div class="bg-bg-primary h-[80%] max-lg:h-full self-center p-10 pr-20 flex flex-col justify-between">
      <div>
        <p class="text-4xl font-bold">{{ $t('contact.intro.title') }}</p>
        <p class="text-xl mt-10 max-lg:text-base max-lg:mt-6">
          {{ $t('contact.intro.description1') }}
        </p>
        <p class="text-xl mt-7 max-lg:text-base max-lg:mt-4">
          {{ $t('contact.intro.description2') }}
        </p>
      </div>
      <div class="max-lg:mt-6">
        <BaseButton :text="$t('contact.intro.brandStory')" class-name="rounded">
          <BaseIcon name="arrow-right-white" class="shrink-0 text-white" />
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
