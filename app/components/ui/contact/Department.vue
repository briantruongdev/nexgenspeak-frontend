<script setup lang="ts"></script>

<template>
  <div class="container max-xl:px-6 grid grid-cols-2 gap-6 pt-16 max-md:grid-cols-1 max-[500px]:pt-12!">
    <div>
      <p class="title">{{ $t('contact.department.title') }}</p>
      <p class="text-xl mt-5 max-lg:text-base">
        {{ $t('contact.department.description') }}
      </p>
    </div>
    <img src="/images/contact-banner.png" alt="" class="h-65 w-full object-cover" loading="lazy" />
  </div>
</template>

<style scoped></style>
