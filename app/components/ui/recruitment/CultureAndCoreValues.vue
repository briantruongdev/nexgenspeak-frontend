<script setup lang="ts"></script>

<template>
  <div class="mt-20 max-sm:mt-0">
    <div class="container max-xl:px-6 max-sm:pt-12">
      <p class="title">{{ $t('recruitment.culture.title') }}</p>
      <p class="mt-6 w-2/3 text-lg max-lg:w-full max-sm:mt-4 max-lg:text-base">
        {{ $t('recruitment.culture.description') }}
      </p>
    </div>
    <div class="mt-8 grid grid-cols-[2fr_1fr] gap-8 max-md:grid-cols-1 max-sm:gap-4">
      <div class="w-full">
        <div class="grid grid-cols-[1fr_1fr] grid-rows-1 gap-8 mb-8 max-sm:mb-4 max-sm:gap-4">
          <div class="relative">
            <img src="/images/people2.png" alt="" loading="lazy" class="h-80 w-full object-cover" />
            <div class="flex justify-center">
              <div class="absolute p-4 rounded-2xl bg-white bottom-4 mx-8 max-lg:mx-4">
                <p class="text-2xl font-bold max-md:mb-2 max-lg:text-lg">
                  {{ $t('recruitment.culture.values.commitment.title') }}
                </p>
                <p class="max-lg:text-sm max-[360px]:text-xs!">{{ $t('recruitment.culture.values.commitment.item1') }}</p>
                <p class="max-lg:text-sm max-[360px]:text-xs!">{{ $t('recruitment.culture.values.commitment.item2') }}</p>
                <p class="max-lg:text-sm max-[360px]:text-xs!">{{ $t('recruitment.culture.values.commitment.item3') }}</p>
              </div>
            </div>
          </div>
          <div class="relative">
            <img src="/images/people2.png" alt="" loading="lazy" class="h-80 w-full object-cover" />
            <div class="flex justify-center">
              <div class="absolute p-4 rounded-2xl bg-white bottom-4 mx-8 max-lg:mx-4">
                <p class="text-2xl font-bold max-md:mb-2 max-lg:text-lg">
                  {{ $t('recruitment.culture.values.improvement.title') }}
                </p>
                <p class="max-lg:text-sm max-[360px]:text-xs!">{{ $t('recruitment.culture.values.improvement.item1') }}</p>
                <p class="max-lg:text-sm max-[360px]:text-xs!">{{ $t('recruitment.culture.values.improvement.item2') }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="relative">
          <img src="/images/people4.png" alt="" loading="lazy" class="h-80 max-md:h-60 w-full object-cover" />
          <div class="flex justify-center">
            <div class="absolute p-4 rounded-2xl bg-white bottom-4 mx-8 max-lg:mx-4">
              <p class="text-2xl font-bold max-md:mb-2 max-lg:text-lg">{{ $t('recruitment.culture.values.proactive.title') }}</p>
              <p class="max-lg:text-sm max-[360px]:text-xs!">{{ $t('recruitment.culture.values.proactive.item1') }}</p>
              <p class="max-lg:text-sm max-[360px]:text-xs!">{{ $t('recruitment.culture.values.proactive.item2') }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="relative">
        <img src="/images/people3.png" alt="" loading="lazy" class="h-full max-md:h-60 w-full object-cover" />
        <div class="flex justify-center">
          <div class="absolute p-4 rounded-2xl bg-white bottom-4 mx-8 max-lg:mx-4">
            <p class="text-2xl font-bold max-md:mb-2 max-lg:text-lg">{{ $t('recruitment.culture.values.openness.title') }}</p>
            <p class="max-lg:text-sm max-[360px]:text-xs!">{{ $t('recruitment.culture.values.openness.item1') }}</p>
            <p class="max-lg:text-sm max-[360px]:text-xs!">{{ $t('recruitment.culture.values.openness.item2') }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
