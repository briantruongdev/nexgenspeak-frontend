<script setup lang="ts">
import { shallowRef } from 'vue'
import { CalendarDate } from '@internationalized/date'
import { useTeacher } from '@/composables/useTeacher'
import type { ITeacher } from '~/types/teacher.type'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()

const now = new Date()

const value = shallowRef(new CalendarDate(now.getFullYear(), now.getMonth() + 1, now.getDate()))
const { data } = useTeacher()

const page = ref(1)
const pageSize = computed(() => (width.value > 640 ? 8 : 4))
const selectedTeacherId = ref<ITeacher['teacherId']>(0)
const pagedTeachers = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return data.value?.teachers.slice(start, start + pageSize.value)
})
const src = '/images/teacher-default.png'
</script>

<template>
  <div class="container">
    <div class="flex justify-center items-center p-8">
      <div class="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <UCalendar
          v-model="value"
          size="xl"
          class="[&_.uc-header]:pb-6 [&_.uc-header]:border-b [&_.uc-header]:border-gray-200 [&_.uc-header_h2]:text-2xl [&_.uc-header_h2]:font-bold [&_.uc-header_h2]:text-gray-800 [&_.uc-weekday]:text-orange-500 [&_.uc-weekday]:font-semibold [&_.uc-day]:text-gray-700 [&_.uc-day]:rounded-lg [&_.uc-day]:transition-colors [&_.uc-day:hover]:bg-gray-100 [&_.uc-day.selected]:bg-orange-500 [&_.uc-day.selected]:text-white [&_.uc-day.selected]:font-bold [&_.uc-day.selected]:rounded-full [&_.uc-day.today]:border-2 [&_.uc-day.today]:border-orange-500"
          :ui="{
            cell: 'hover:cursor-pointer'
          }"
        />
      </div>
    </div>
    <p class="title mb-8">Danh sách giáo viên</p>
    <div class="grid grid-cols-4 gap-4 max-xl:gap-3 max-lg:grid-cols-2 max-md:grid-cols-3 max-sm:grid-cols-2">
      <div
        v-for="teacher in pagedTeachers"
        :key="teacher.teacherId"
        type="button"
        class="bg-white rounded-[10px] hover:cursor-pointer border border-black/5 shadow-sm p-4 max-sm:p-3 text-left transition-all duration-200 hover:border-primary"
        :class="selectedTeacherId === teacher.teacherId ? 'ring-2 ring-primary ' : ''"
        @click="selectedTeacherId = teacher.teacherId"
      >
        <div class="rounded-lg overflow-hidden shrink-0 mx-auto justify-start">
          <div class="flex flex-col gap-5 max-sm:gap-4">
            <img
              :src="src"
              :alt="teacher.fullName"
              loading="lazy"
              class="w-full h-40 max-lg:h-52 max-sm:h-44 object-contain rounded-xl"
            />

            <div class="text-center">
              <p class="text-xl font-medium max-lg:text-lg">{{ teacher.fullName }}</p>
              <p class="text-sm text-[#6B7280] mt-1 max-sm:text-xs">{{ teacher.position }}</p>
            </div>

            <div class="space-y-3 max-sm:space-y-2">
              <div class="flex items-start gap-3 max-sm:gap-2">
                <BaseIcon name="award-2" class="mt-[2px] shrink-0 max-sm:w-4 max-sm:h-4" />
                <p class="text-sm leading-6 max-sm:text-xs max-sm:leading-5">{{ teacher.award1 }}</p>
              </div>
              <div class="flex items-start gap-3 max-sm:gap-2">
                <BaseIcon name="line-2" class="mt-[2px] shrink-0 max-sm:w-4 max-sm:h-4" />
                <p class="text-sm leading-6 max-sm:text-xs max-sm:leading-5">{{ teacher.award1 }}</p>
              </div>
              <div class="flex items-start gap-3 max-sm:gap-2">
                <BaseIcon name="graduation" class="mt-[2px] shrink-0 max-sm:w-4 max-sm:h-4" />
                <p class="text-sm leading-6 max-sm:text-xs max-sm:leading-5">{{ teacher.award1 }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="my-8 max-md:mt-6 flex justify-center">
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
  </div>
</template>
