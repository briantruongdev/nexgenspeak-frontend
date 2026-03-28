<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="bg-[#EDEFF0] mt-12 max-xl:px-6 max-sm:mt-12">
    <div class="container py-10">
      <p class="text-4xl text-primary font-bold max-md:text-3xl">{{ t('support.title') }}</p>
      <p class="mt-4 text-lg font-medium max-md:text-sm">
        {{ t('support.description') }}
      </p>

      <div class="grid grid-cols-[3fr_1fr_3fr] mt-16 mx-auto max-md:w-full max-sm:grid-cols-1 max-sm:gap-8 max-sm:mt-10">
        <div class="flex justify-start items-start gap-4">
          <img src="/images/phone-no-bg.png" alt="" class="w-10 h-10 object-cover" loading="lazy" />
          <div class="text-lg max-lg:text-base">
            <p class="text-primary font-bold">{{ t('support.phone.number') }}</p>
            <p class="font-medium max-md:text-sm">{{ t('support.phone.hours') }}</p>
            <p class="font-medium mt-6 max-md:text-sm max-sm:mt-4">
              {{ t('support.phone.afterHours') }}
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
          <img src="/images/contact-no-bg.png" alt="" class="w-10 h-10 object-cover" loading="lazy" />
          <div>
            <p class="text-primary text-lg font-bold">{{ t('support.consultation.title') }}</p>
            <p class="text-lg font-medium max-md:text-sm">{{ t('support.consultation.description') }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
