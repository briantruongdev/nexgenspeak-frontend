<script setup lang="ts">
import { CalendarDate, today, getLocalTimeZone } from '@internationalized/date'
import dayjs from 'dayjs'

const route = useRoute()
const { t } = useI18n()
const config = useRuntimeConfig()
const minDate = today(getLocalTimeZone())

const srcImg = '/images/teacher-default.png'
const now = new Date()
const date = shallowRef(new CalendarDate(now.getFullYear(), now.getMonth() + 1, now.getDate()))
const maxDate = minDate.add({ months: 1 })
const teacherId = route.params.id as string
const { teacherDetail, isFetchingTeacherDetail } = useTeacherDetail(teacherId as string)
const { selectedSlotIds, isBooking, isSlotSelected, handleSelectSlot, booking } = useRegistration()
const { slots, isGettingSlots, getSlotByDate } = useTeacher()
const maxSlots = config.public.maxSlots

const dateFormat = computed(() => {
  if (!date.value) return ''
  return dayjs(`${date.value.year}-${date.value.month}-${date.value.day}`).format('YYYY-MM-DD')
})

const handleDateChange = () => {
  if (teacherId) {
    getSlots()
  }
}
const getSlots = async () => {
  await getSlotByDate(teacherId, dateFormat.value)
}
onMounted(() => {
  getSlots()
})

const handleBooking = async () => {
  try {
    const formDate = {
      teacherId,
      slotIds: selectedSlotIds.value,
      date: dateFormat.value
    }
    await booking(formDate)
    date.value = shallowRef(new CalendarDate(now.getFullYear(), now.getMonth() + 1, now.getDate())).value
    selectedSlotIds.value = []
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div>
    <div v-if="isFetchingTeacherDetail" class="flex flex-col space-y-4 items-center my-8 animate-pulse">
      <UIcon name="i-lucide-loader" class="animate-spin size-10 text-primary" />
      <span class="text-gray-500 animate-pulse">{{ t('loadingTeacherDetail') }}</span>
    </div>

    <div v-else class="container py-10 max-xl:px-6">
      <div class="grid grid-cols-[2fr_1fr] gap-10 max-[900px]:grid-cols-1">
        <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transition-all duration-300 hover:shadow-xl">
          <div class="flex justify-start gap-10">
            <img
              :src="srcImg"
              :alt="teacherDetail?.fullName"
              class="w-30 h-30 max-sm:w-20 max-sm:h-20 object-cover rounded-full"
            />
            <div class="space-y-1">
              <p class="title">{{ teacherDetail?.fullName }}</p>
              <p>{{ teacherDetail?.position }}</p>
            </div>
          </div>
          <div class="mt-6 space-y-4">
            <p class="text-2xl font-medium">{{ t('teacherDetail.profileSummary') }}</p>
            <div>
              <div class="flex justify-start items-center gap-2">
                <UIcon name="i-heroicons-hand-thumb-up" class="size-8 text-primary" />
                <p class="text-lg font-medium">{{ t('teacherDetail.strengths') }}</p>
              </div>
              <p class="max-sm:text-sm">{{ teacherDetail?.strengths }}</p>
            </div>
            <div>
              <div class="flex justify-start items-center gap-2">
                <UIcon name="i-heroicons-academic-cap" class="size-8 text-primary" />
                <p class="text-lg font-medium">{{ t('teacherDetail.teachingStyle') }}</p>
              </div>
              <p class="max-sm:text-sm">{{ teacherDetail?.teachingStyle }}</p>
            </div>
          </div>
          <div class="mt-6 space-y-2">
            <p class="text-2xl font-medium">{{ t('teacherDetail.aboutMe') }}</p>
            <p class="max-sm:text-sm">{{ teacherDetail?.aboutMe }}</p>
          </div>
          <div class="mt-6 space-y-2">
            <p class="text-2xl font-medium">{{ t('teacherDetail.workExperience') }}</p>
            <div
              v-for="(item, index) in teacherDetail?.resume"
              :key="index"
              class="flex justify-start items-start gap-6 max-sm:text-sm max-[500px]:flex-col max-[500px]:gap-1 max-[500px]:mb-3"
            >
              <p>{{ item.time }}</p>
              <p>{{ item.value }}</p>
            </div>
          </div>
          <div class="mt-6 space-y-2">
            <p class="text-2xl font-medium">{{ t('teacherDetail.mySpecialties') }}</p>
            <div v-for="(item, index) in teacherDetail?.specialties" :key="index">
              <UCollapsible :unmount-on-hide="false" class="flex flex-col gap-2">
                <div class="group flex justify-between items-center hover:cursor-pointer border-b border-border-primary py-2">
                  <p class="font-medium">{{ item.title }}</p>
                  <UIcon
                    name="i-lucide-chevron-right"
                    class="size-5 group-data-[state=open]:rotate-90 transition-transform duration-200"
                  />
                </div>
                <template #content>
                  <p class="max-sm:text-sm">{{ item.description }}</p>
                </template>
              </UCollapsible>
            </div>
          </div>
        </div>
        <div>
          <Transition name="fade-scale" appear>
            <div class="sticky self-start flex justify-center items-center max-sm:p-0">
              <div
                class="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transition-all duration-300 hover:shadow-xl"
              >
                <UCalendar
                  v-model="date"
                  size="xl"
                  :ui="{
                    cell: 'hover:cursor-pointer'
                  }"
                  :min-value="minDate"
                  :max-value="maxDate"
                  @update:model-value="handleDateChange"
                />
              </div>
            </div>
          </Transition>
          <div class="py-6">
            <div v-if="isGettingSlots" class="flex flex-col space-y-4 items-center my-8 animate-pulse">
              <UIcon name="i-lucide-loader" class="animate-spin size-10 text-primary" />
              <span class="text-gray-500 animate-pulse">{{ t('booking.loadingSlots') }}</span>
            </div>
            <Transition name="slots-fade" mode="out-in">
              <div v-if="slots && slots.length > 0 && !isGettingSlots" lass="my-8 max-[450px]:my-4">
                <div class="mb-4 flex items-center justify-between">
                  <p class="text-xl font-medium max-sm:text-sm">
                    {{ t('booking.selectSlot') }}
                    {{ t('booking.selectedSlots', { count: selectedSlotIds.length, max: maxSlots }) }}
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
                <div class="grid grid-cols-4 gap-3 max-[1140px]:grid-cols-3">
                  <div
                    v-for="(item, index) in slots"
                    :key="item.id"
                    class="slot-item h-12 max-sm:h-10 text-center flex items-center justify-center text-base font-medium rounded-lg border transition-all duration-300 cursor-pointer select-none"
                    :class="[
                      isSlotSelected(item.id)
                        ? 'bg-primary text-white border-primary shadow-lg scale-105 hover:scale-110'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-primary hover:shadow-md hover:scale-105'
                    ]"
                    :style="{ animationDelay: `${index * 30}ms` }"
                    @click="handleSelectSlot(item.id)"
                  >
                    <span class="font-semibold text-sm">{{ item.startTime }}-{{ item.endTime }}</span>
                  </div>
                </div>
              </div>
            </Transition>
            <div v-if="(!slots || slots.length === 0) && !isGettingSlots" class="my-8 text-center text-gray-500">
              <p>{{ t('booking.noSlotsAvailable') }}</p>
            </div>

            <Transition name="button-slide" appear>
              <div v-if="selectedSlotIds.length">
                <BaseButton
                  :text="t('booking.bookLesson')"
                  class="w-full h-12 mt-8 max-sm:mt-6 max-sm:h-10"
                  :loading="isBooking"
                  :disabled="isBooking"
                  @click="handleBooking"
                />
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-scale-enter-active {
  transition: all 0.5s ease-out;
}

.fade-scale-enter-from {
  opacity: 0;
  transform: scale(0.95) translateY(-20px);
}
</style>
