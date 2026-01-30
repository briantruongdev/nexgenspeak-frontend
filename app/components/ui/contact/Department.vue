<script setup lang="ts"></script>

<template>
  <div class="relative">
    <div
      class="bg-primary h-170 w-100 max-sm:h-160 justify-self-end section-responsive max-lg:w-100 max-md:w-1/3 max-[350px]:hidden"
    ></div>

    <div class="container absolute top-0 left-0 right-0 max-[350px]:relative">
      <div class="w-1/2 max-xl:px-6 max-md:w-2/3 max-[350px]:w-full! max-[350px]:mt-12!">
        <p class="title">{{ $t('contact.department.title') }}</p>
        <p class="text-xl mt-5 max-lg:text-base">
          {{ $t('contact.department.description') }}
        </p>
      </div>
      <div class="grid grid-cols-[1fr_3fr] gap-8 mt-12 max-md:grid-cols-[1fr_2fr]">
        <div class="flex-col gap-6 flex">
          <div class="bg-bg-primary h-16"></div>
          <img
            src="/images/contact-banner.png"
            alt=""
            class="h-[360px] max-md:h-[300px] max-[500px]:h-[250px]! object-cover"
            loading="lazy"
          />
        </div>
        <div class="flex-col gap-6 flex">
          <img
            src="/images/people2.png"
            alt=""
            class="h-[360px] max-md:h-[300px] max-[500px]:h-[250px]! object-cover"
            loading="lazy"
          />
          <!-- <div class="bg-bg-primary h-16 w-104 max-lg:w-72 max-md:w-48 max-sm:w-36 max-[500px]:hidden!"></div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
