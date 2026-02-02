<script setup lang="ts">
const { t } = useI18n()
const { openTrialRegisterModal } = useTrialRegister()

const summaries = computed(() => [
  {
    title: t('about.stats.yearsExperience'),
    value: 6
  },
  {
    title: t('about.stats.foreignTeachers'),
    value: 100
  },
  {
    title: t('about.stats.satisfiedStudents'),
    value: 5000
  }
])
</script>

<template>
  <div class="container">
    <div class="mt-32 grid grid-cols-[1fr_1.5fr] gap-16 max-lg:mt-24 max-lg:grid-cols-1">
      <div class="max-xl:px-6">
        <p class="title">{{ $t('about.title') }}</p>

        <div class="flex items-center mt-10">
          <div class="h-1 w-56 bg-primary"></div>
          <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
        <div class="flex justify-end mt-18 mb-10">
          <p class="w-2/3 text-lg text-justify max-[400px]:text-base">
            {{ $t('about.description') }}
          </p>
        </div>

        <BaseButton
          variant="outline"
          class-name="border-2"
          :text="$t('about.viewDetails')"
          icon="i-lucide-move-right"
          @click="openTrialRegisterModal"
        />
      </div>
      <div class="relative h-130 max-[420px]:h-75 max-lg:h-100 max-sm:h-80">
        <img src="/images/home-about.png" alt="" loading="lazy" class="w-full h-full object-cover" />

        <div class="absolute inset-0 bg-primary/50 w-2/5 gap-y-4 flex flex-col justify-center max-[400px]:w-3/5">
          <div v-for="item in summaries" :key="item.title" class="text-white mx-10 max-lg:mx-6">
            <p class="text-5xl max-md:text-5xl max-sm:text-3xl font-bold">
              <BaseCounterUp :end="item.value" />
            </p>
            <p class="text-lg max-sm:text-sm">{{ item.title }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
