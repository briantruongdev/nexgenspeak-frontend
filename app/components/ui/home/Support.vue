<script setup lang="ts"></script>

<template>
  <div class="bg-[#EDEFF0] mt-12 max-lg:mt-24 max-xl:px-6 max-sm:mt-12">
    <div class="container py-10">
      <p class="text-5xl text-primary font-bold max-md:text-3xl">{{ $t('support.title') }}</p>
      <p class="mt-4 text-lg font-medium max-md:text-sm">
        {{ $t('support.description') }}
      </p>

      <div class="grid grid-cols-[3fr_1fr_3fr] mt-16 mx-auto max-md:w-full max-sm:grid-cols-1 max-sm:gap-8">
        <div class="flex justify-start items-start gap-4">
          <BaseIcon name="phone" size="36" />
          <div>
            <p class="text-primary text-lg font-bold">{{ $t('support.phone.number') }}</p>
            <p class="text-lg font-medium max-md:text-sm">{{ $t('support.phone.hours') }}</p>
            <p class="text-lg font-medium mt-6 max-md:text-sm">
              {{ $t('support.phone.afterHours') }}
            </p>
          </div>
        </div>
        <USeparator
          orientation="vertical"
          size="sm"
          :ui="{
            border: 'border-bg-primary'
          }"
          class="max-sm:hidden"
        />
        <div class="flex justify-start items-start gap-4">
          <BaseIcon name="advise" size="44" />
          <div>
            <p class="text-primary text-lg font-bold">{{ $t('support.consultation.title') }}</p>
            <p class="text-lg font-medium max-md:text-sm">{{ $t('support.consultation.description') }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
