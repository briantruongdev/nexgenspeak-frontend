<script setup lang="ts">
const src = '/images/contact-banner2.png'
</script>

<template>
  <div class="relative pt-24 max-lg:pt-20 container">
    <img :src alt="Banner" loading="lazy" class="h-screen w-screen object-cover" />
    <div
      class="absolute w-2/5 bg-primary rounded-tr-[50px] rounded-br-[50px] text-white top-40 px-10 py-16 max-[900px]:top-36 max-md:top-20 max-md:w-1/2 max-sm:w-2/3"
    >
      <p class="text-3xl font-bold max-lg:text-xl">{{ $t('contact.mission.title') }}</p>
      <p class="mt-2 max-lg:text-sm">
        {{ $t('contact.mission.description') }}
      </p>
      <p class="text-3xl font-bold my-4 max-lg:text-xl">{{ $t('contact.mission.trainingMotto') }}</p>
      <div class="space-x-3">
        <div>
          <p class="text-xl font-bold max-lg:text-base">{{ $t('contact.mission.mottos.compact.title') }}</p>
          <p class="mt-2 max-lg:text-sm">{{ $t('contact.mission.mottos.compact.description') }}</p>
        </div>
        <div>
          <p class="text-xl font-bold max-lg:text-base">{{ $t('contact.mission.mottos.economical.title') }}</p>
          <p class="mt-2 max-lg:text-sm">{{ $t('contact.mission.mottos.economical.description') }}</p>
        </div>
        <div>
          <p class="text-xl font-bold max-lg:text-base">{{ $t('contact.mission.mottos.quality.title') }}</p>
          <p class="mt-2 max-lg:text-sm">{{ $t('contact.mission.mottos.quality.description') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
