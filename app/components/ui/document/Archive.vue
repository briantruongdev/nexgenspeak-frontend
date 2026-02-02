<script setup lang="ts">
const { t } = useI18n()
const { openTrialRegisterModal } = useTrialRegister()

const input = useTemplateRef('input')
const skills = computed(() => [
  t('document.archive.skills.speaking'),
  t('document.archive.skills.reading'),
  t('document.archive.skills.writing'),
  t('document.archive.skills.listening'),
  t('document.archive.skills.vocabulary'),
  t('document.archive.skills.grammar')
])
const value = ref(t('document.archive.skills.speaking'))
</script>

<template>
  <div class="container section-responsive-pt max-xl:px-6">
    <p class="title text-center">{{ $t('document.archive.title') }}</p>
    <p class="text-lg font-medium mt-10 text-center max-sm:text-sm max-md:mt-6">
      {{ $t('document.archive.description1') }}
    </p>
    <p class="text-lg font-medium text-center max-sm:text-sm">{{ $t('document.archive.description2') }}</p>
    <div class="flex justify-center mt-8">
      <UInput
        ref="input"
        icon="i-lucide-search"
        :placeholder="$t('document.archive.searchPlaceholder')"
        class="w-2/3 max-sm:w-full"
        :ui="{
          base: 'h-16 max-sm:h-14'
        }"
      >
        <template #trailing>
          <BaseButton :text="$t('document.archive.search')" class="rounded" />
        </template>
      </UInput>
    </div>
    <div class="flex flex-wrap gap-6 my-6 justify-center max-sm:my-6 max-sm:gap-4">
      <div v-for="(item, index) in skills" :key="index">
        <p
          class="bg-white border border-solid max-sm:text-sm border-primary rounded-full py-2 px-4 whitespace-nowrap hover-scale-105 hover:cursor-pointer"
        >
          {{ item }}
        </p>
      </div>
    </div>
    <div class="flex justify-center items-center gap-6 max-sm:gap-4">
      <USelectMenu
        v-model="value"
        :items="skills"
        class="w-96 max-[600px]:w-60"
        size="xl"
        :ui="{
          base: 'hover:cursor-pointer',
          value: 'ml-2 hover:cursor-pointer',
          content: 'hover:cursor-pointer'
        }"
      />
      <BaseButton :text="$t('document.archive.refresh')" variant="outline" class="rounded" />
    </div>
  </div>
</template>

<style scoped></style>
