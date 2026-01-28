<script setup lang="ts"></script>

<template>
  <div class="mt-24">
    <div class="container">
      <p class="title">{{ $t('recruitment.culture.title') }}</p>
      <p class="mt-9 w-2/3 text-lg">
        {{ $t('recruitment.culture.description') }}
      </p>
    </div>
    <div class="mt-16 grid grid-cols-[2fr_1fr] gap-8">
      <div class="w-full">
        <div class="grid grid-cols-[1fr_1fr] grid-rows-1 gap-8 mb-8">
          <div class="relative">
            <img src="/images/people2.png" alt="" loading="lazy" class="h-100 w-full object-cover" />
            <div class="flex justify-center">
              <div class="absolute p-4 rounded-2xl bg-white bottom-4">
                <p class="text-2xl font-bold mb-3">{{ $t('recruitment.culture.values.commitment.title') }}</p>
                <p>{{ $t('recruitment.culture.values.commitment.item1') }}</p>
                <p>{{ $t('recruitment.culture.values.commitment.item2') }}</p>
                <p>{{ $t('recruitment.culture.values.commitment.item3') }}</p>
              </div>
            </div>
          </div>
          <div class="relative">
            <img src="/images/people2.png" alt="" loading="lazy" class="h-100 w-full object-cover" />
            <div class="flex justify-center">
              <div class="absolute p-4 rounded-2xl bg-white bottom-4 mx-8">
                <p class="text-2xl font-bold mb-3">{{ $t('recruitment.culture.values.improvement.title') }}</p>
                <p>{{ $t('recruitment.culture.values.improvement.item1') }}</p>
                <p>{{ $t('recruitment.culture.values.improvement.item2') }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="relative">
          <img src="/images/people4.png" alt="" loading="lazy" class="h-100 w-full object-cover" />
          <div class="flex justify-center">
            <div class="absolute p-4 rounded-2xl bg-white bottom-4 mx-8">
              <p class="text-2xl font-bold mb-3">{{ $t('recruitment.culture.values.proactive.title') }}</p>
              <p>{{ $t('recruitment.culture.values.proactive.item1') }}</p>
              <p>{{ $t('recruitment.culture.values.proactive.item2') }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="relative">
        <img src="/images/people3.png" alt="" loading="lazy" class="h-full w-full object-cover" />
        <div class="flex justify-center">
          <div class="absolute p-4 rounded-2xl bg-white bottom-4 mx-8">
            <p class="text-2xl font-bold mb-3">{{ $t('recruitment.culture.values.openness.title') }}</p>
            <p>{{ $t('recruitment.culture.values.openness.item1') }}</p>
            <p>{{ $t('recruitment.culture.values.openness.item2') }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
