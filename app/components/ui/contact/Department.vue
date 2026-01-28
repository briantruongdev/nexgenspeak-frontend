<script setup lang="ts"></script>

<template>
  <div class="relative">
    <div class="bg-primary h-240 w-150 justify-self-end mt-24 max-lg:mt-20 max-lg:w-100 max-md:w-1/3 max-sm:mt-12"></div>

    <div class="container absolute top-0 left-0 right-0">
      <div class="w-1/2 max-xl:px-6">
        <p class="title">{{ $t('contact.department.title') }}</p>
        <p class="text-xl mt-5 max-lg:text-base">
          {{ $t('contact.department.description') }}
        </p>
      </div>
      <div class="grid grid-cols-[1fr_3fr] gap-8 mt-24 max-md:grid-cols-[1fr_2fr]">
        <div class="flex-col gap-6 flex">
          <div class="bg-bg-primary h-16"></div>
          <img src="/images/contact-banner.png" alt="" class="h-[469px] object-cover" loading="lazy" />
        </div>
        <div class="flex-col gap-6 flex">
          <img src="/images/people2.png" alt="" class="h-[469px] object-cover" loading="lazy" />
          <div class="bg-bg-primary h-16 w-104 max-lg:w-72 max-md:w-48 max-sm:w-36 max-[500px]:hidden!"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
