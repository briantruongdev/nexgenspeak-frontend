<script setup lang="ts"></script>

<template>
  <section class="bg-primary h-[90vh] flex items-center max-xl:px-6 max-lg:h-[80vh] max-md:h-[90vh]">
    <div class="container grid grid-cols-[1fr_1.5fr] gap-24 items-center max-lg:gap-10 max-md:grid-cols-1">
      <img
        src="/images/about-study.png"
        alt=""
        loading="lazy"
        class="w-95 h-95 rounded-full object-cover max-lg:w-72 max-lg:h-72 justify-self-end max-md:justify-self-center"
      />
      <div class="text-white">
        <p class="font-bold text-5xl my-6">{{ $t('studyPlan.about.title') }}</p>
        <p class="text-lg mb-4 max-md:text-base">
          {{ $t('studyPlan.about.description') }}
        </p>
        <p class="text-lg max-md:text-base">
          {{ $t('studyPlan.about.description') }}
        </p>
      </div>
    </div>
  </section>
  <section class="container grid grid-cols-2 gap-8 items-end max-xl:px-6 max-md:grid-cols-1">
    <div>
      <p class="text-4xl font-bold mt-20 max-sm:mt-12">{{ $t('studyPlan.about.title') }}</p>
      <p class="mb-20 max-sm:mb-10 mt-4">{{ $t('common.practice') }}</p>
      <img src="/images/study-7.png" alt="" loading="lazy" class="mb-8" />
      <img src="/images/study-8.png" alt="" loading="lazy" />
    </div>
    <img src="/images/people1.png" loading="lazy" alt="" class="h-[110%] object-cover -mt-20 max-md:hidden" />
  </section>
</template>

<style scoped></style>
