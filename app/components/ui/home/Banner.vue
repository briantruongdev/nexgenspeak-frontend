<script setup lang="ts"></script>

<template>
  <div class="relative w-full">
    <img src="/images/banner.png" alt="Banner" loading="lazy" class="w-full h-130 sm:h-160 lg:h-190 object-cover object-center" />
    <div class="absolute inset-0 top-1/6 max-xl:px-6 max-lg:top-1/12">
      <div class="container">
        <p class="text-6xl font-bold text-white mb-10 max-lg:text-4xl">
          {{ $t('banner.title') }} <br />
          {{ $t('banner.subtitle') }}
        </p>

        <UButton
          class="rounded-xl bg-white hover:bg-white text-primary cursor-pointer hover-scale-105 flex items-center leading-none"
          size="lg"
        >
          <template #leading>
            <BaseIcon name="arrow-right" class="shrink-0" />
          </template>
          <span class="leading-none">{{ $t('banner.learnMore') }}</span>
        </UButton>
      </div>
    </div>
    <div class="absolute bottom-16 inset-x-0 max-xl:px-6 max-lg:bottom-8">
      <div class="container">
        <div class="flex justify-start items-center gap-2 mb-4">
          <div v-for="(item, index) in 3" :key="index">
            <p class="w-2 h-2 rounded-full bg-white"></p>
          </div>
        </div>
        <USeparator orientation="horizontal" size="lg" class="w-2/6" />

        <p class="gap-4 flex mt-4 max-md:grid max-md:grid-cols-2 max-md:w-fit">
          <UButton
            class="rounded-xl bg-white hover:bg-white text-text-primary cursor-pointer hover-scale-105 max-lg:text-sm w-fit"
            size="lg"
            >{{ $t('banner.registerTrial') }}
          </UButton>
          <UButton
            class="rounded-xl bg-white hover:bg-white text-text-primary cursor-pointer hover-scale-105 max-lg:text-sm w-fit"
            size="lg"
            >{{ $t('banner.buyCourse') }}</UButton
          >
          <UButton
            class="rounded-xl bg-white hover:bg-white text-text-primary cursor-pointer hover-scale-105 max-lg:text-sm w-fit"
            size="lg"
            >{{ $t('banner.support') }}</UButton
          >
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
