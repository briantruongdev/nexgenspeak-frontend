<script setup lang="ts"></script>

<template>
  <div class="container pt-24 max-xl:px-6 max-sm:pt-12">
    <p class="title">{{ $t('recruitment.difference.title') }}</p>
    <div class="grid grid-cols-[1fr_2fr] gap-11 mt-12 max-md:grid-cols-[1fr_1fr] max-[600px]:grid-cols-1!">
      <div class="flex flex-col justify-between max-[600px]:gap-4">
        <p class="bg-bg-primary p-6 rounded-2xl">
          {{ $t('recruitment.difference.description') }}
        </p>
        <div>
          <BaseButton
            :text="$t('recruitment.difference.brandStory')"
            class-name="rounded flex items-center"
            icon="i-lucide-move-right"
          />
        </div>
      </div>
      <img src="/images/people2.png" alt="" class="h-[343px] w-full object-cover rounded-2xl" />
    </div>
  </div>
</template>

<style scoped></style>
