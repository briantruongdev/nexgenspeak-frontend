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

        <BaseButton variant="outline" :text="$t('banner.learnMore')">
          <BaseIcon name="arrow-right" class="shrink-0" />
        </BaseButton>
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

        <p class="gap-4 flex mt-4 max max-md:grid max-md:grid-cols-2 max-md:w-fit">
          <BaseButton
            variant="outline"
            class-text="text-text-primary"
            class-name="bg-white/60"
            :text="$t('banner.registerTrial')"
          />
          <BaseButton variant="outline" class-text="text-text-primary" class-name="bg-white/60" :text="$t('banner.buyCourse')" />
          <BaseButton variant="outline" class-text="text-text-primary" class-name="bg-white/60" :text="$t('banner.support')" />
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
