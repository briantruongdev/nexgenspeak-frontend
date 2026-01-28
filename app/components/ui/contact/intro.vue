<script setup lang="ts">
const bannerImageSrc = '/images/banner-auth.png'
</script>

<template>
  <div class="container grid grid-cols-[1fr_1.5fr] pt-24 max-lg:pt-20">
    <div class="aspect-3/4">
      <img :src="bannerImageSrc" class="w-full h-full object-cover" />
    </div>
    <div class="bg-bg-primary h-[80%] self-center p-10 pr-20 flex flex-col justify-between">
      <div>
        <p class="text-4xl font-bold">{{ $t('contact.intro.title') }}</p>
        <p class="text-xl mt-10">
          {{ $t('contact.intro.description1') }}
        </p>
        <p class="text-xl mt-7">
          {{ $t('contact.intro.description2') }}
        </p>
      </div>
      <div>
        <BaseButton :text="$t('contact.intro.brandStory')" class-name="rounded">
          <BaseIcon name="arrow-right-white" class="shrink-0 text-white" />
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
