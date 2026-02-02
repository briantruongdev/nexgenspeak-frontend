<script setup lang="ts"></script>

<template>
  <section
    class="bg-primary h-[80vh] flex items-center max-xl:px-6 max-lg:h-[56vh] max-md:h-[68vh] max-xl:h-[70vh] max-[500px]:[60vh]!"
  >
    <div class="container grid grid-cols-[1fr_1.5fr] gap-24 items-center max-lg:gap-10 max-md:grid-cols-1 max-md:gap-6">
      <img
        src="/images/about-study.png"
        alt=""
        loading="lazy"
        class="w-95 h-95 max-md:w-52 max-md:h-52 rounded-full object-cover max-lg:w-72 max-lg:h-72 justify-self-end max-md:justify-self-center"
      />
      <div class="text-white">
        <p
          class="font-bold text-5xl my-6 max-md:text-4xl max-md:text-center max-[400px]:text-3xl! max-[400px]:mb-4! max-[400px]:my-0"
        >
          {{ $t('studyPlan.about.title') }}
        </p>
        <p class="text-lg mb-4 max-md:text-base max-md:text-center max-sm:text-sm">
          {{ $t('studyPlan.about.description') }}
        </p>
        <!-- <p class="text-lg max-md:text-base">
          {{ $t('studyPlan.about.description') }}
        </p> -->
      </div>
    </div>
  </section>
  <section class="container grid grid-cols-2 gap-8 items-end max-xl:px-6 max-md:grid-cols-1 max-md:hidden">
    <div>
      <p class="text-4xl font-bold section-responsive">{{ $t('studyPlan.about.title') }}</p>
      <p class="mb-20 max-lg:mb-10 text-lg mt-4">{{ $t('common.practice') }}</p>
      <img
        src="/images/study-7.png"
        alt=""
        loading="lazy"
        class="mb-8 max-md:mb-0 h-64 w-full object-cover max-xl:h-48 max-lg:h-40"
      />
      <img
        src="/images/study-8.png"
        alt=""
        loading="lazy"
        class="h-64 w-full max-xl:h-48 max-lg:h-40 object-cover max-md:hidden"
      />
    </div>
    <img src="/images/people1.png" loading="lazy" alt="" class="h-[110%] object-cover -mt-20 max-md:hidden" />
  </section>
</template>

<style scoped></style>
