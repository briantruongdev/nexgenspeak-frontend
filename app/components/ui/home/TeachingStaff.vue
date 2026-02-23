<script setup lang="ts">
const { t } = useI18n()
const { openTrialRegisterModal } = useTrialRegister()
const { data, pending } = useTeacher()
</script>

<template>
  <div class="container max-xl:px-6">
    <div class="mb-8 section-responsive max-[400px]:mb-6!">
      <p class="title">{{ t('teachingStaff.title') }}</p>
      <p class="text-lg mt-2 max-sm:text-sm">{{ t('teachingStaff.subtitle') }}</p>
    </div>
    <div v-if="pending" class="grid grid-cols-3 gap-10 max-md:gap-6 max-sm:grid-cols-1">
      <USkeleton class="h-50 rounded-2xl" />
      <USkeleton class="h-50 rounded-2xl max-sm:hidden" />
      <USkeleton class="h-50 rounded-2xl max-sm:hidden" />
    </div>
    <UCarousel
      v-else
      v-slot="{ item }"
      loop
      arrows
      autoplay
      wheel-gestures
      prev-icon="i-lucide-chevron-left"
      next-icon="i-lucide-chevron-right"
      :items="data?.teachers"
      :ui="{
        item: 'basis-full md:basis-1/2 lg:basis-1/3 px-2 sm:px-4',
        prev: 'max-xl:translate-x-16 max-sm:-translate-x-0 hover:cursor-pointer text-white bg-primary/60 hover:bg-primary active:bg-primary shadow-none ring-0 focus:ring-0',
        next: 'max-xl:-translate-x-20 max-md:-translate-x-20 max-sm:-translate-x-2 hover:cursor-pointer text-white bg-primary/60 hover:bg-primary active:bg-primary shadow-none ring-0 focus:ring-0'
      }"
    >
      <div class="bg-white rounded-2xl p-6 max-sm:p-4 shadow-sm border border-black/5 detail-card m-1">
        <div class="flex flex-col gap-5 max-sm:gap-4">
          <img
            :key="item?.teacherId"
            :src="`/images/${item.avatar}`"
            :alt="item?.fullName"
            loading="lazy"
            class="w-full h-32 object-contain rounded-xl"
          />

          <div :key="item?.teacherId">
            <p class="text-2xl font-extrabold max-lg:text-xl max-sm:text-lg">{{ item?.fullName }}</p>
            <p class="text-sm text-[#6B7280] mt-1 max-sm:text-xs">{{ item?.position }}</p>
          </div>

          <div :key="item?.teacherId" class="space-y-3 max-sm:space-y-2">
            <div class="flex items-start gap-3 max-sm:gap-2">
              <BaseIcon name="award-2" class="mt-0.5 shrink-0 max-sm:w-4 max-sm:h-4" />
              <p class="text-sm leading-6 max-sm:text-xs max-sm:leading-5">
                {{ item?.award1 }}
              </p>
            </div>
            <div class="flex items-start gap-3 max-sm:gap-2">
              <BaseIcon name="line-2" class="mt-0.5 shrink-0 max-sm:w-4 max-sm:h-4" />
              <p class="text-sm leading-6 max-sm:text-xs max-sm:leading-5">{{ item?.award2 }}</p>
            </div>
            <div class="flex items-start gap-3 max-sm:gap-2">
              <BaseIcon name="graduation" class="mt-0.5 shrink-0 max-sm:w-4 max-sm:h-4" />
              <p class="text-sm leading-6 max-sm:text-xs max-sm:leading-5">{{ item?.award3 }}</p>
            </div>
          </div>

          <BaseButton
            :text="t('teachingStaff.bookLesson')"
            variant="outline"
            class="w-full"
            class-name="h-11 max-sm:h-10 rounded-xl"
            class-text="font-semibold max-sm:text-sm"
            @click="openTrialRegisterModal"
          />
        </div>
      </div>
    </UCarousel>
  </div>
</template>

<style scoped></style>
