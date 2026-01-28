<script setup lang="ts"></script>

<template>
  <div class="container pt-24 grid grid-cols-[2fr_1fr] gap-16 max-xl:px-6 max-sm:pt-12 max-sm:grid-cols-1 max-sm:gap-8">
    <div class="flex flex-col justify-between max-sm:gap-8">
      <div>
        <p class="title">{{ $t('recruitment.development.title') }}</p>
        <p class="mt-10">
          {{ $t('recruitment.development.description') }}
        </p>
      </div>
      <div>
        <BaseButton :text="$t('recruitment.development.openPositions')" class-name="rounded" icon="i-lucide-move-right" />
      </div>
    </div>
    <img src="/images/people2.png" alt="" loading="lazy" class="h-80 w-full object-cover" />
  </div>
</template>

<style scoped></style>
