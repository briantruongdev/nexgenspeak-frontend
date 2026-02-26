<script setup lang="ts">
const { t } = useI18n()

const reason = computed(() => [
  t('studyPlan.about.reasons[0]'),
  t('studyPlan.about.reasons[1]'),
  t('studyPlan.about.reasons[2]'),
  t('studyPlan.about.reasons[3]'),
  t('studyPlan.about.reasons[4]'),
  t('studyPlan.about.reasons[5]'),
  t('studyPlan.about.reasons[6]')
])
</script>

<template>
  <section
    class="bg-primary h-[80vh] 2xl:h-[50vh] flex items-center max-xl:px-6 max-lg:h-[56vh] max-md:h-[68vh] max-xl:h-[70vh] max-[500px]:[60vh]!"
  >
    <div class="container grid grid-cols-[1fr_1.5fr] gap-24 items-center max-lg:gap-10 max-md:grid-cols-1 max-md:gap-6">
      <img
        src="/images/about-study.png"
        alt=""
        loading="lazy"
        class="w-95 h-95 max-md:w-52 max-md:h-52 rounded-full object-cover max-lg:w-72 max-lg:h-72 justify-self-end max-md:justify-self-center"
      />
      <div class="text-white">
        <p
          class="font-bold text-5xl my-6 max-md:text-4xl max-md:text-center max-[400px]:text-3xl! max-[400px]:mb-4! max-[400px]:my-0"
        >
          {{ t('studyPlan.about.title') }}
        </p>
        <p class="text-lg mb-4 max-md:text-base max-md:text-center max-sm:text-sm">
          {{ t('studyPlan.about.description') }}
        </p>
        <!-- <p class="text-lg max-md:text-base">
          {{ $t('studyPlan.about.description') }}
        </p> -->
      </div>
    </div>
  </section>
  <section class="bg-[#eccab0]">
    <div class="container py-12 max-xl:px-6">
      <p class="title text-center mb-12">{{ t('studyPlan.about.reasonsTitle') }}</p>

      <div class="grid grid-cols-2 place-items-center max-md:grid-cols-1 max-sm:place-items-start">
        <div class="max-md:justify-center w-full max-md:flex hidden">
          <img src="/images/reason.png" alt="" loading="lazy" class="h-50" />
        </div>

        <div
          class="space-y-4 max-md:grid max-md:grid-cols-2 max-md:mt-8 max-md:space-x-4 max-sm:grid-cols-1 max-sm:place-items-start"
        >
          <div v-for="(item, index) in reason" :key="index">
            <p class="bg-gradient px-5 py-3 rounded-full text-lg font-medium max-lg:text-base max-sm:text-sm">{{ item }}</p>
          </div>
        </div>
        <img src="/images/reason.png" alt="" loading="lazy" class="max-md:hidden" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.bg-gradient {
  background: linear-gradient(90deg, var(--ui-primary) -1.05%, hsla(0, 0%, 100%, 0) 96.6%);
  /* background: linear-gradient(90deg, #f90 -1.05%, hsla(0, 0%, 100%, 0) 96.6%); */
}
</style>
