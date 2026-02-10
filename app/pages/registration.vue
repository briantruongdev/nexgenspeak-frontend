<script setup lang="ts">
import { shallowRef } from 'vue'
import { CalendarDate, today, getLocalTimeZone } from '@internationalized/date'
import { useTeacher } from '@/composables/useTeacher'
import type { ITeacher } from '~/types/teacher.type'
// import { useWindowSize } from '@vueuse/core'
import dayjs from 'dayjs'

definePageMeta({
  middleware: 'auth'
})

// const { width } = useWindowSize()
const config = useRuntimeConfig()
const { showError } = useNotification()
const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const now = new Date()
const date = shallowRef(new CalendarDate(now.getFullYear(), now.getMonth() + 1, now.getDate()))
const minDate = today(getLocalTimeZone())
const { data, pending, slots, isGettingSlots, getSlotByDate } = useTeacher()
const { apply, filters } = useRegistration()
const { isBooking, booking } = useSchedule()

const page = ref(1)
// const pageSize = computed(() => (width.value > 640 ? 4 : 4))
const pageSize = ref(4)
const selectedTeacherId = ref<ITeacher['teacherId']>(0)
const selectedSlotIds = ref<number[]>([])
const maxSlots = config.public.maxSlots

const dataSearch = computed(() => {
  const search = filters.value.search?.toLowerCase()

  return data.value?.teachers.filter(t => !search || t.fullName.toLowerCase().includes(search))
})
const pagedTeachers = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return dataSearch.value?.slice(start, start + pageSize.value)
})

const src = '/images/teacher-default.png'

const dateFormat = computed(() => {
  if (!date.value) return ''
  return dayjs(`${date.value.year}-${date.value.month}-${date.value.day}`).format('YYYY-MM-DD')
})

const updateUrl = () => {
  const query: any = {}

  if (selectedTeacherId.value) {
    query.teacherId = selectedTeacherId.value
  }

  if (dateFormat.value) {
    query.date = dateFormat.value
  }

  router.push({ query })
}

const restoreFromUrl = () => {
  if (route.query.date) {
    const urlDate = dayjs(route.query.date as string)
    if (urlDate.isValid()) {
      date.value = new CalendarDate(urlDate.year(), urlDate.month() + 1, urlDate.date())
    }
  }

  if (route.query.teacherId) {
    selectedTeacherId.value = route.query.teacherId as unknown as number
    getSlots()
  }
}

const handleSelectedTeacher = async (teacherId: number) => {
  if (selectedTeacherId.value === teacherId) {
    selectedTeacherId.value = 0
    selectedSlotIds.value = []
    updateUrl()
    return
  }

  selectedTeacherId.value = teacherId
  selectedSlotIds.value = []
  updateUrl()
  getSlots()
}

const getSlots = async () => {
  if (selectedTeacherId.value) {
    await getSlotByDate(selectedTeacherId.value, dateFormat.value)
  }
}

const handleDateChange = () => {
  updateUrl()
  if (selectedTeacherId.value) {
    getSlots()
  }
}

onMounted(() => {
  restoreFromUrl()
})

const handleSelectSlot = (slotId: number) => {
  const index = selectedSlotIds.value.indexOf(slotId)

  if (index > -1) {
    selectedSlotIds.value.splice(index, 1)
  } else {
    if (selectedSlotIds.value.length < maxSlots) {
      selectedSlotIds.value.push(slotId)
    } else {
      showError($t('booking.maxSlotsError', { max: maxSlots }))
    }
  }
}

const isSlotSelected = (slotId: number) => {
  return selectedSlotIds.value.includes(slotId)
}
const handleBooking = async () => {
  const formDate = {
    teacherId: selectedTeacherId.value,
    slotIds: selectedSlotIds.value,
    date: dateFormat.value
  }
  await booking(formDate)
  date.value = shallowRef(new CalendarDate(now.getFullYear(), now.getMonth() + 1, now.getDate())).value
  selectedTeacherId.value = 0
  selectedSlotIds.value = []
  router.push({ query: {} })
}
</script>

<template>
  <div>
    <div class="container max-xl:px-6">
      <div class="flex justify-center items-center p-8 max-sm:p-0 max-sm:my-8">
        <div class="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <UCalendar
            v-model="date"
            size="md"
            :ui="{
              cell: 'hover:cursor-pointer text-base',
              headCell: 'text-base',
              heading: 'text-base'
            }"
            :min-value="minDate"
            @update:model-value="handleDateChange"
          />
        </div>
      </div>
      <p class="title mb-8">{{ $t('booking.teacherList') }}</p>
      <BaseInput
        v-model="filters.search"
        :placeholder="t('search')"
        class="w-1/4 max-lg:w-1/3 max-sm:w-full mb-4"
        icon="i-lucide-search"
        :is-show-clear="true"
        @input="apply({ search: filters.search })"
      />
      <div v-if="pending" class="flex flex-col space-y-4 items-center my-8">
        <UIcon name="i-lucide-loader" class="animate-spin size-10 text-primary" />
        <span class="text-gray-500">{{ $t('booking.loadingTeachers') }}</span>
      </div>
      <template v-else-if="pagedTeachers?.length">
        <div class="grid grid-cols-4 max-lg:grid-cols-2 gap-4 max-[450px]:grid-cols-1!">
          <div
            v-for="teacher in pagedTeachers"
            :key="teacher.teacherId"
            type="button"
            class="bg-white rounded-lg hover:cursor-pointer border border-black/5 shadow-sm p-4 max-sm:p-3 text-left transition-all duration-200 hover:border-primary"
            :class="selectedTeacherId === teacher.teacherId ? 'ring-2 ring-primary ' : ''"
            @click="handleSelectedTeacher(teacher.teacherId)"
          >
            <div class="rounded-lg overflow-hidden shrink-0 mx-auto justify-start">
              <div class="flex flex-col gap-5 max-sm:gap-4">
                <img
                  :src="src"
                  :alt="teacher.fullName"
                  loading="lazy"
                  class="w-full h-40 max-sm:h-30 object-contain rounded-xl"
                />

                <div class="text-center">
                  <p class="text-xl font-medium max-lg:text-lg">{{ teacher.fullName }}</p>
                  <p class="text-sm text-[#6B7280] mt-1 max-sm:text-xs">{{ teacher.position }}</p>
                </div>

                <div class="space-y-3 max-sm:space-y-2">
                  <div class="flex items-start gap-3 max-sm:gap-2">
                    <BaseIcon name="award-2" class="mt-0.5 shrink-0 max-sm:w-4 max-sm:h-4" />
                    <p class="text-sm leading-6 max-sm:text-xs max-sm:leading-5">{{ teacher.award1 }} {{ teacher.teacherId }}</p>
                  </div>
                  <div class="flex items-start gap-3 max-sm:gap-2">
                    <BaseIcon name="line-2" class="mt-0.5 shrink-0 max-sm:w-4 max-sm:h-4" />
                    <p class="text-sm leading-6 max-sm:text-xs max-sm:leading-5">{{ teacher.award1 }}</p>
                  </div>
                  <div class="flex items-start gap-3 max-sm:gap-2">
                    <BaseIcon name="graduation" class="mt-0.5 shrink-0 max-sm:w-4 max-sm:h-4" />
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
            :total="dataSearch?.length"
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
      <div v-if="isGettingSlots" class="flex flex-col space-y-4 items-center my-8">
        <UIcon name="i-lucide-loader" class="animate-spin size-10 text-primary" />
        <span class="text-gray-500">{{ $t('booking.loadingSlots') }}</span>
      </div>
      <div v-else-if="selectedTeacherId && slots && slots.length > 0" class="my-8">
        <div class="mb-4 flex items-center justify-between">
          <p class="text-xl font-medium">
            {{ $t('booking.selectSlot') }} {{ $t('booking.selectedSlots', { count: selectedSlotIds.length, max: maxSlots }) }}
          </p>
          <UButton
            v-if="selectedSlotIds.length > 0"
            color="error"
            variant="soft"
            size="sm"
            class="hover:cursor-pointer"
            @click="selectedSlotIds = []"
          >
            {{ $t('booking.clearAll') }}
          </UButton>
        </div>
        <div class="grid grid-cols-8 gap-4 max-lg:grid-cols-6 max-md:grid-cols-4 max-[450px]:grid-cols-2!">
          <div
            v-for="item in slots"
            :key="item.id"
            class="h-12 text-center flex items-center justify-center text-base font-medium rounded-lg border transition-all duration-300 cursor-pointer select-none"
            :class="[
              isSlotSelected(item.id)
                ? 'bg-primary text-white border-primary shadow-lg scale-105 hover:scale-110'
                : 'bg-white text-gray-700 border-gray-200 hover:border-primary hover:shadow-md hover:scale-105'
            ]"
            @click="handleSelectSlot(item.id)"
          >
            <span class="font-semibold max-sm:text-sm">{{ item.startTime }}-{{ item.endTime }}</span>
          </div>
        </div>
      </div>
      <div v-else-if="selectedTeacherId && (!slots || slots.length === 0)" class="my-8 text-center text-gray-500">
        <p>{{ $t('booking.noSlotsAvailable') }}</p>
      </div>

      <BaseButton
        v-if="selectedTeacherId && date && selectedSlotIds.length"
        :text="$t('booking.bookLesson')"
        class="w-full h-12 mb-8"
        :loading="isBooking"
        :disabled="isBooking"
        @click="handleBooking"
      />
    </div>
    <UiBackToTop keepalive />
  </div>
</template>
