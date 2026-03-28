<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section class="bg-[#EEF0F1]">
    <div class="container max-xl:px-6">
      <p
        class="bg-primary text-white py-6 w-full px-20 max-md:px-10 max-sm:px-6 -mt-1 rounded-br-[20px] rounded-bl-[20px] text-center font-bold text-4xl max-lg:text-2xl max-[400px]:py-4 max-sm:text-base"
      >
        {{ t('studyPlan.trialRegistration.title') }}
      </p>
      <div class="grid grid-cols-4 gap-x-8 max-sm:gap-x-4 mt-12 max-[400px]:mt-4! max-md:mt-8 max-md:grid-cols-2 max-sm:mt-6">
        <div>
          <img src="/images/study-plan-1.png" alt="Plan1" class="h-80 max-md:h-40 max-md:w-full object-cover" />
          <div class="bg-bg-primary h-10 mt-4 max-md:h-6"></div>
        </div>
        <div>
          <img src="/images/study-plan-2.png" alt="Plan2" class="h-80 max-md:h-40 max-md:w-full object-cover" />
          <div class="bg-bg-primary h-10 mt-4 max-md:h-6"></div>
        </div>
        <div class="max-md:hidden">
          <img src="/images/study-plan-3.png" alt="Plan3" class="h-80 max-md:h-40 max-md:w-full object-cover" />
          <div class="bg-bg-primary h-10 mt-4"></div>
        </div>
        <div class="max-md:hidden">
          <img src="/images/study-plan-4.png" alt="Plan4" class="h-80 max-md:h-40 max-md:w-full object-cover" />
          <div class="bg-bg-primary h-10 mt-4"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
