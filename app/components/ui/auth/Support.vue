<script setup lang="ts"></script>

<template>
  <div class="bg-[#EDEFF0]">
    <div class="container py-10 max-xl:px-6">
      <p class="text-4xl text-primary font-bold max-md:text-3xl">{{ $t('support.title') }}</p>
      <p class="mt-4 text-lg font-medium max-md:text-sm">
        {{ $t('support.description') }}
      </p>

      <div class="flex mt-16 gap-8 max-md:block max-md:space-y-6">
        <div class="flex justify-start items-start gap-4">
          <img src="/images/phone-no-bg.png" alt="" class="w-10 h-10 object-cover" loading="lazy" />
          <div>
            <p class="text-primary text-lg font-bold">{{ $t('support.phone.number') }}</p>
            <p class="font-medium max-md:text-sm">{{ $t('support.phone.hours') }}</p>
            <p class="font-medium mt-6 max-md:text-sm">
              {{ $t('support.phone.afterHours') }}
            </p>
          </div>
        </div>
        <div class="max-md:hidden">
          <USeparator
            orientation="vertical"
            size="sm"
            :ui="{
              border: 'border-bg-primary'
            }"
          />
        </div>
        <div class="flex justify-start items-start gap-4">
          <img src="/images/mail-no-bg.png" alt="" class="w-10 h-10 object-cover" loading="lazy" />

          <div>
            <p class="text-primary text-lg font-bold">{{ $t('support.email.email') }}</p>
            <p class="font-medium max-md:text-sm">
              {{ $t('support.email.description') }}
              <a href="mailto:info@czen.io" class="hover:text-primary hover:underline">info@czen.io.</a>
              {{ $t('support.email.weWillGetBackToYou') }}
            </p>
          </div>
        </div>
        <div class="max-md:hidden">
          <USeparator
            orientation="vertical"
            size="sm"
            :ui="{
              border: 'border-bg-primary'
            }"
          />
        </div>
        <div class="flex justify-start items-start gap-4">
          <img src="/images/contact-no-bg.png" alt="" class="w-10 h-10 object-cover" loading="lazy" />

          <div>
            <p class="text-primary text-lg font-bold">{{ $t('support.consultation.title') }}</p>
            <p class="font-medium max-md:text-sm">{{ $t('support.consultation.description') }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
