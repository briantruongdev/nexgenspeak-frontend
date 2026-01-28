<script setup lang="ts">
const src = '/images/contact-banner2.png'
</script>

<template>
  <div class="relative pt-24 max-lg:pt-20 container">
    <img :src alt="Banner" loading="lazy" class="h-screen w-screen object-cover" />
    <div class="absolute w-2/5 bg-primary rounded-tr-[50px] rounded-br-[50px] text-white top-50 px-10 py-16">
      <p class="text-3xl font-bold">{{ $t('contact.mission.title') }}</p>
      <p class="mt-2">
        {{ $t('contact.mission.description') }}
      </p>
      <p class="text-3xl font-bold my-4">{{ $t('contact.mission.trainingMotto') }}</p>
      <div class="space-x-3">
        <div>
          <p class="text-xl font-bold">{{ $t('contact.mission.mottos.compact.title') }}</p>
          <p class="mt-2">{{ $t('contact.mission.mottos.compact.description') }}</p>
        </div>
        <div>
          <p class="text-xl font-bold">{{ $t('contact.mission.mottos.economical.title') }}</p>
          <p class="mt-2">{{ $t('contact.mission.mottos.economical.description') }}</p>
        </div>
        <div>
          <p class="text-xl font-bold">{{ $t('contact.mission.mottos.quality.title') }}</p>
          <p class="mt-2">{{ $t('contact.mission.mottos.quality.description') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
