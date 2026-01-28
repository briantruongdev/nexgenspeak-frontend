<script setup lang="ts"></script>

<template>
  <div class="container pt-24 grid grid-cols-[2fr_1fr] gap-16">
    <div class="flex flex-col justify-between">
      <div>
        <p class="title">{{ $t('recruitment.development.title') }}</p>
        <p class="mt-10">
          {{ $t('recruitment.development.description') }}
        </p>
      </div>
      <div>
        <BaseButton :text="$t('recruitment.development.openPositions')" class-name="rounded">
          <BaseIcon name="arrow-right-white" class="shrink-0 text-white" />
        </BaseButton>
      </div>
    </div>
    <img src="/images/people2.png" alt="" loading="lazy" class="h-80 w-full object-cover" />
  </div>
</template>

<style scoped></style>
