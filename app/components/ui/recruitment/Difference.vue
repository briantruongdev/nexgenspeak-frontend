<script setup lang="ts">
const { openTrialRegisterModal } = useTrialRegister()
</script>

<template>
  <div class="container section-responsive-pt max-xl:px-6">
    <p class="title">{{ $t('recruitment.difference.title') }}</p>
    <div
      class="grid grid-cols-[1fr_2fr] gap-10 max-sm:gap-4 mt-8 max-sm:mt-4 max-md:grid-cols-[1fr_1fr] max-[600px]:grid-cols-1!"
    >
      <div class="flex flex-col justify-between max-[600px]:gap-4">
        <p class="bg-bg-primary p-6 rounded-2xl text-lg max-lg:text-base">
          {{ $t('recruitment.difference.description') }}
        </p>
        <div>
          <BaseButton
            :text="$t('recruitment.difference.brandStory')"
            class-name="rounded flex items-center"
            icon="i-lucide-move-right"
            @click="openTrialRegisterModal"
          />
        </div>
      </div>
      <img src="/images/people2.png" alt="" class="h-[300px] max-sm:h-40 w-full object-cover rounded-2xl" />
    </div>
  </div>
</template>

<style scoped></style>
