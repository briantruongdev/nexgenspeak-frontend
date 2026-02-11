<script setup lang="ts">
import { CalendarDate, today, getLocalTimeZone } from '@internationalized/date'
import dayjs from 'dayjs'

const route = useRoute()
const { t } = useI18n()
const srcImg = '/images/teacher-default.png'
const now = new Date()
const date = shallowRef(new CalendarDate(now.getFullYear(), now.getMonth() + 1, now.getDate()))
const minDate = today(getLocalTimeZone())
const maxDate = minDate.add({ months: 1 })
const teacherId = route.params.id as string
const { _teacherDetail, isFetchingTeacherDetail } = useTeacherDetail(teacherId as string)

const { isSlotModalVisible, selectedSlotIds, isSlotSelected, handleSelectSlot, booking } = useRegistration()
const { slots, isGettingSlots, getSlotByDate } = useTeacher()
const { isBooking } = useRegistration()
const config = useRuntimeConfig()
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
  await getSlotByDate(teacherId as string, dateFormat.value)
}
onMounted(() => {
  getSlots()
})

const teacherDetail = {
  teacherId: '1',
  fullName: 'Nguyễn Văn An',
  position: 'Senior English Teacher',
  award1: 'TESOL Certified',
  award2: 'Cambridge CELTA',
  award3: 'IELTS 8.5',
  avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
  rating: 4.9,
  totalReviews: 134,
  students: 320,
  lessons: 2400,
  pricePerHour: 15,
  languages: ['English', 'Vietnamese'],

  aboutMe:
    'I am a passionate English teacher with over 8 years of experience teaching students from different backgrounds. I have helped learners improve their communication skills for work, study, and daily life. My lessons focus on real-life conversations and practical English usage. I believe learning should be engaging and enjoyable. I always create a friendly environment so students feel confident speaking. I customize each lesson to match your level and goals. Together, we will build your confidence and fluency step by step.',

  strengths:
    'I design structured and engaging lessons for all levels. I focus on communication and confidence building in every session. I am patient and supportive with each student. My lessons are customized based on your goals. I provide clear feedback to help you improve quickly.',

  teachingStyle:
    'My teaching style is interactive and student-centered. I focus on real conversations and practical usage. Each lesson includes speaking practice, feedback, and useful vocabulary. I encourage students to speak as much as possible. I adapt my teaching methods based on your progress and learning style.',

  resume: [
    {
      time: '2015-2018',
      value: 'English Lecturer at Ho Chi Minh Language University'
    },
    {
      time: '2018-2020',
      value: 'Senior IELTS Instructor at British Language Center'
    },
    {
      time: '2020-2022',
      value: 'Online English Teacher for global learners'
    },
    { time: '2022-Now', value: 'Senior Teacher at NexGen English Center' }
  ],

  specialties: [
    {
      title: 'Conversational English',
      description: 'Practice real-life conversations to improve fluency and confidence naturally.'
    },
    {
      title: 'IELTS Speaking',
      description: 'Improve your speaking band with structured practice and detailed feedback.'
    },
    {
      title: 'Business English',
      description: 'Learn professional communication skills for meetings and presentations.'
    },
    {
      title: 'Pronunciation',
      description: 'Enhance clarity and accent through targeted pronunciation exercises.'
    },
    {
      title: 'Interview Preparation',
      description: 'Practice job interview questions and improve professional answers.'
    },
    {
      title: 'Public Speaking',
      description: 'Build confidence speaking English in front of others.'
    }
  ]
}

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
    <!-- <div v-if="isFetchingTeacherDetail" class="flex flex-col space-y-4 items-center my-8 animate-pulse">
      <UIcon name="i-lucide-loader" class="animate-spin size-10 text-primary" />
      <span class="text-gray-500 animate-pulse">{{ t('loadingTeacherDetail') }}</span>
    </div>
    v-else -->
    <div class="container py-10">
      <div class="grid grid-cols-[2fr_1fr] gap-10">
        <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transition-all duration-300 hover:shadow-xl">
          <div class="flex justify-start gap-10">
            <img :src="srcImg" :alt="teacherDetail?.fullName" class="w-30 h-30 object-cover rounded-full" />
            <div class="space-y-1">
              <p class="title">{{ teacherDetail?.fullName }}</p>
              <p>{{ teacherDetail?.position }}</p>
            </div>
          </div>
          <div class="mt-6 space-y-4">
            <p class="text-2xl font-medium">Profile summary</p>
            <div>
              <div class="flex justify-start items-center gap-2">
                <UIcon name="i-heroicons-hand-thumb-up" class="size-8 text-primary" />
                <p class="text-lg font-medium">Strengths</p>
              </div>
              <p>{{ teacherDetail.strengths }}</p>
            </div>
            <div>
              <div class="flex justify-start items-center gap-2">
                <UIcon name="i-heroicons-academic-cap" class="size-8 text-primary" />
                <p class="text-lg font-medium">Teaching style</p>
              </div>
              <p>{{ teacherDetail.teachingStyle }}</p>
            </div>
          </div>
          <div class="mt-6 space-y-2">
            <p class="text-2xl font-medium">About me</p>
            <p>{{ teacherDetail.aboutMe }}</p>
          </div>
          <div class="mt-6 space-y-2">
            <p class="text-2xl font-medium">Work experience</p>
            <div v-for="(item, index) in teacherDetail.resume" :key="index" class="flex justify-start items-start gap-6">
              <p>{{ item.time }}</p>
              <p>{{ item.value }}</p>
            </div>
          </div>
          <div class="mt-6 space-y-2">
            <p class="text-2xl font-medium">My specialties</p>
            <div v-for="(item, index) in teacherDetail.specialties" :key="index">
              <UCollapsible :unmount-on-hide="false" class="flex flex-col gap-2">
                <div class="group flex justify-between items-center hover:cursor-pointer border-b border-border-primary py-2">
                  <p class="font-medium">{{ item.title }}</p>
                  <UIcon
                    name="i-lucide-chevron-right"
                    class="size-5 group-data-[state=open]:rotate-90 transition-transform duration-200"
                  />
                </div>
                <template #content>
                  <p>{{ item.description }}</p>
                </template>
              </UCollapsible>
            </div>
          </div>
        </div>
        <div>
          <Transition name="fade-scale" appear>
            <div class="sticky self-start flex justify-center items-center max-sm:p-0 max-[900px]:mt-8">
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
                <div class="grid grid-cols-4 gap-3 max-lg:grid-cols-6 max-md:grid-cols-4 max-[450px]:grid-cols-3!">
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
