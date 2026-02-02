<script setup lang="ts"></script>

<template>
  <div
    class="container section-responsive-pt max-lg:pt-20! max-sm:pt-12! grid grid-cols-[2fr_1fr] gap-16 max-xl:px-6 max-sm:grid-cols-1 max-sm:gap-8"
  >
    <div class="flex flex-col justify-between max-sm:gap-8">
      <div>
        <p class="title">{{ $t('recruitment.development.title') }}</p>
        <p class="mt-8 max-sm:mt-4 text-lg max-lg:text-base">
          {{ $t('recruitment.development.description') }}
        </p>
      </div>
      <div class="mt-4">
        <BaseButton :text="$t('recruitment.development.openPositions')" class-name="rounded" icon="i-lucide-move-right" />
      </div>
    </div>
    <img src="/images/people2.png" alt="" loading="lazy" class="h-60 w-full object-cover max-sm:hidden" />
  </div>
</template>

<style scoped></style>
