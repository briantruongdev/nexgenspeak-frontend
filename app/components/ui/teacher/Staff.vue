<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import type { ITeacher } from '~/types/teacher.type'

const { openTrialRegisterModal } = useTrialRegister()

const { t } = useI18n()

const { width } = useWindowSize()
interface Teacher {
  id: number
  name: string
  title: string
  image: string
  highlights: { icon: string; text: string }[]
}
const srcImg = '/images/teacher-default.png'
const { data, pending, isProcessing } = useTeacher()

const page = ref(1)
const pageSize = computed(() => (width.value > 640 ? 6 : 4))
const selectedTeacherId = ref<ITeacher['teacherId']>(data.value?.teachers[0]?.teacherId ?? '')
const selectedTeacher = computed(
  () => data.value?.teachers.find(t => t.teacherId === selectedTeacherId.value) ?? data.value?.teachers[0]
)

const pagedTeachers = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return data.value?.teachers.slice(start, start + pageSize.value)
})

watch(
  () => page.value,
  () => {
    const first = pagedTeachers.value?.[0]
    if (first) selectedTeacherId.value = first.teacherId
  }
)
</script>

<template>
  <section class="bg-[#EEF0F1] pt-36 max-lg:pt-0">
    <div class="container py-16 max-lg:py-12 max-md:py-10 max-xl:px-6">
      <UiTeacherTitle :title="$t('teacher.staff.title')" />

      <div
        class="grid grid-cols-[420px_1fr] gap-10 max-xl:grid-cols-[360px_1fr] max-xl:gap-8 max-lg:grid-cols-[320px_1fr] max-lg:gap-6 max-md:grid-cols-1"
      >
        <div class="bg-white rounded-2xl p-6 max-sm:p-4 shadow-sm border border-black/5">
          <div class="flex flex-col gap-5 max-sm:gap-4">
            <img
              :src="srcImg"
              :alt="selectedTeacher?.fullName"
              loading="lazy"
              class="w-full h-60 max-lg:h-52 max-sm:h-44 object-contain rounded-xl"
            />

            <div>
              <p class="text-2xl font-extrabold max-lg:text-xl max-sm:text-lg">{{ selectedTeacher?.fullName }}</p>
              <p class="text-sm text-[#6B7280] mt-1 max-sm:text-xs">{{ selectedTeacher?.position }}</p>
            </div>

            <div class="space-y-3 max-sm:space-y-2">
              <div class="flex items-start gap-3 max-sm:gap-2">
                <BaseIcon name="award-2" class="mt-0.5 shrink-0 max-sm:w-4 max-sm:h-4" />
                <p class="text-sm leading-6 max-sm:text-xs max-sm:leading-5">
                  {{ selectedTeacher?.award1 }} {{ selectedTeacher?.teacherId }}
                </p>
              </div>
              <div class="flex items-start gap-3 max-sm:gap-2">
                <BaseIcon name="line-2" class="mt-0.5 shrink-0 max-sm:w-4 max-sm:h-4" />
                <p class="text-sm leading-6 max-sm:text-xs max-sm:leading-5">{{ selectedTeacher?.award2 }}</p>
              </div>
              <div class="flex items-start gap-3 max-sm:gap-2">
                <BaseIcon name="graduation" class="mt-0.5 shrink-0 max-sm:w-4 max-sm:h-4" />
                <p class="text-sm leading-6 max-sm:text-xs max-sm:leading-5">{{ selectedTeacher?.award3 }}</p>
              </div>
            </div>

            <BaseButton
              :text="$t('teacher.staff.viewInfo')"
              variant="outline"
              class="w-full"
              class-name="h-11 max-sm:h-10 rounded-xl"
              class-text="font-semibold max-sm:text-sm"
              @click="openTrialRegisterModal"
            />
          </div>
        </div>

        <div>
          <div v-if="pending" class="flex flex-col space-y-4 items-center my-8 animate-pulse">
            <UIcon name="i-lucide-loader" class="animate-spin size-10 text-primary" />
            <span class="text-gray-500 animate-pulse">{{ t('booking.loadingTeachers') }}</span>
          </div>
          <template v-else-if="pagedTeachers?.length">
            <div class="grid grid-cols-3 gap-4 max-xl:gap-3 max-lg:grid-cols-2 max-md:grid-cols-3 max-sm:grid-cols-2">
              <div
                v-for="teacher in pagedTeachers"
                :key="teacher.teacherId"
                type="button"
                class="bg-white rounded-[10px] hover:cursor-pointer border border-black/5 shadow-sm p-4 max-sm:p-3 text-left transition-all duration-200 hover:border-primary"
                :class="+selectedTeacherId === +teacher.teacherId ? 'ring-1 ring-primary ' : ''"
                @click="selectedTeacherId = teacher.teacherId"
              >
                <div class="w-2/3 h-16 max-sm:h-14 rounded-lg bg-[#F6E5D5] overflow-hidden shrink-0 mx-auto flex justify-center">
                  <img :src="srcImg" :alt="teacher.fullName" loading="lazy" class="object-cover h-[75px] max-sm:h-[65px]" />
                </div>
                <p class="font-bold text-sm max-sm:text-xs mt-2 truncate text-center">{{ teacher.fullName }}</p>
              </div>
            </div>

            <div class="mt-8 max-md:mt-6 flex justify-center">
              <UPagination
                v-model:page="page"
                :total="data?.teachers.length"
                :items-per-page="pageSize"
                color="primary"
                active-color="primary"
                :ui="{
                  root: 'select-none',
                  list: 'gap-2 max-sm:gap-1',
                  next: 'hover:cursor-pointer',
                  prev: 'hover:cursor-pointer',
                  last: 'hover:cursor-pointer',
                  first: 'hover:cursor-pointer',
                  item: 'hover:cursor-pointer'
                }"
              />
            </div>
          </template>
          <UiEmpty v-else />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
