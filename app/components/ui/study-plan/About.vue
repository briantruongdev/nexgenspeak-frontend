<script setup lang="ts"></script>

<template>
  <section class="bg-primary h-[90vh] flex items-center">
    <div class="container grid grid-cols-[1fr_1.5fr] gap-24 items-center">
      <img src="/images/about-study.png" alt="" loading="lazy" class="w-[380px] h-[380px] rounded-full object-cover" />
      <div class="text-white">
        <p class="font-bold text-5xl my-6">{{ $t('studyPlan.about.title') }}</p>
        <p class="text-lg mb-4">
          {{ $t('studyPlan.about.description') }}
        </p>
        <p class="text-lg">
          {{ $t('studyPlan.about.description') }}
        </p>
      </div>
    </div>
  </section>
  <section class="container grid grid-cols-2 gap-8 items-end">
    <div>
      <p class="text-4xl font-bold mt-20">{{ $t('studyPlan.about.title') }}</p>
      <p class="mb-20 mt-4">{{ $t('common.practice') }}</p>
      <img src="/images/study-7.png" alt="" loading="lazy" class="mb-8" />
      <img src="/images/study-8.png" alt="" loading="lazy" />
    </div>
    <img src="/images/people1.png" loading="lazy" alt="" class="h-[110%] object-cover -mt-20" />
  </section>
</template>

<style scoped></style>
