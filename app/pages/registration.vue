<script setup lang="ts">
import { shallowRef, watch, nextTick } from 'vue'
import { CalendarDate, today, getLocalTimeZone } from '@internationalized/date'
import { useTeacher } from '@/composables/useTeacher'
import { useInfiniteScroll, refDebounced } from '@vueuse/core'
import dayjs from 'dayjs'

definePageMeta({
  middleware: 'auth'
})
const src = '/images/teacher-default.png'

// const { width } = useWindowSize()
const { t } = useI18n()
const now = new Date()
const date = shallowRef(new CalendarDate(now.getFullYear(), now.getMonth() + 1, now.getDate()))
const minDate = today(getLocalTimeZone())
const maxDate = minDate.add({ months: 1 })
const { data, pending, isProcessing, getSlotByDate, toggleFavoriteTeacher } = useTeacher()
const { isSlotModalVisible, selectedTeacherId, selectedSlotIds } = useRegistration()
const { booking } = useRegistration()
const initialLoadCount = 9
const loadMoreCount = 3
const displayCount = ref(initialLoadCount)
const teacherIdFavorit = ref(0)
const showCards = ref(false)
const scrollArea = ref<HTMLElement | null>(null)
const search = ref('')
const searchDebounced = refDebounced(search, 300)

const dataSearch = computed(() => {
  const _search = searchDebounced.value?.toLowerCase()

  return data.value?.teachers.filter(t => !_search || t.fullName.toLowerCase().includes(_search))
})

const displayedTeachers = computed(() => {
  return dataSearch.value?.slice(0, displayCount.value)
})
const hasMore = computed(() => {
  return (dataSearch.value?.length || 0) > displayCount.value
})

const dateFormat = computed(() => {
  if (!date.value) return ''
  return dayjs(`${date.value.year}-${date.value.month}-${date.value.day}`).format('YYYY-MM-DD')
})

const handleSelectedTeacher = async (teacherId: number) => {
  // if (selectedTeacherId.value === teacherId) {
  //   selectedTeacherId.value = 0
  //   selectedSlotIds.value = []
  //   updateUrl()
  //   return
  // }

  selectedTeacherId.value = teacherId
  selectedSlotIds.value = []
  isSlotModalVisible.value = true
  await getSlots()
}

const getSlots = async () => {
  if (selectedTeacherId.value) {
    await getSlotByDate(selectedTeacherId.value, dateFormat.value)
  }
}

const handleDateChange = () => {
  if (selectedTeacherId.value) {
    getSlots()
  }
}

onMounted(() => {
  setTimeout(() => {
    showCards.value = true
  }, 50)
})

useInfiniteScroll(
  scrollArea,
  () => {
    if (hasMore.value) {
      loadMore()
    }
  },
  { distance: 100 }
)

watch(
  () => search.value,
  () => {
    displayCount.value = initialLoadCount
    showCards.value = false
    nextTick(() => {
      showCards.value = true
    })
  }
)

const loadMore = () => {
  displayCount.value += loadMoreCount
}

const handleBooking = async () => {
  try {
    const formDate = {
      teacherId: selectedTeacherId.value,
      slotIds: selectedSlotIds.value,
      date: dateFormat.value
    }
    await booking(formDate)
    date.value = shallowRef(new CalendarDate(now.getFullYear(), now.getMonth() + 1, now.getDate())).value
    selectedTeacherId.value = 0
    selectedSlotIds.value = []
    isSlotModalVisible.value = false
  } catch (error) {
    // selectedTeacherId.value = 0
    console.log(error)
  }
}

const handleToggleFavorite = async (event: Event, teacherId: number, currentAction: 'add' | 'remove') => {
  event.stopPropagation()
  teacherIdFavorit.value = teacherId
  await toggleFavoriteTeacher(teacherId, currentAction)
}
</script>

<template>
  <div class="container max-xl:px-6">
    <div class="grid grid-cols-[1fr_2fr] gap-10 py-6 max-[900px]:grid-cols-1 max-[900px]:py-0">
      <div>
        <p class="title mb-8 text-white! max-[900px]:hidden">.</p>
        <div class="h-10 mb-4 max-[900px]:hidden"></div>
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
      </div>
      <div class="flex-1 max-[900px]:mb-8">
        <p class="title mb-8">{{ t('booking.teacherList') }}</p>
        <BaseInput
          v-model="search"
          :placeholder="t('search')"
          class="w-1/2 mb-4 max-[500px]:w-2/3"
          icon="i-lucide-search"
          :is-show-clear="true"
        />
        <div v-if="pending" class="flex flex-col space-y-4 items-center my-8 animate-pulse">
          <UIcon name="i-lucide-loader" class="animate-spin size-10 text-primary" />
          <span class="text-gray-500 animate-pulse">{{ t('booking.loadingTeachers') }}</span>
        </div>
        <template v-else-if="displayedTeachers?.length">
          <div ref="scrollArea" class="teacher-list-scroll max-h-screen overflow-y-auto p-1">
            <div class="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-[400px]:grid-cols-1!">
              <div
                v-for="(teacher, index) in displayedTeachers"
                :key="teacher.teacherId"
                type="button"
                class="teacher-card bg-white rounded-lg hover:cursor-pointer border border-black/5 shadow-sm p-4 max-sm:p-3 text-left transition-all duration-300 hover:border-primary"
                :class="[selectedTeacherId === teacher.teacherId ? 'ring-2 ring-primary' : '', showCards ? 'card-animate' : '']"
                :style="showCards ? { animationDelay: `${index * 50}ms` } : {}"
                @click="handleSelectedTeacher(teacher.teacherId)"
              >
                <div class="rounded-lg overflow-hidden shrink-0 mx-auto justify-start relative">
                  <button
                    class="absolute top-0 right-2 z-10 hover:cursor-pointer flex justify-center items-center"
                    @click="e => handleToggleFavorite(e, teacher.teacherId, teacher.isFavorite ? 'remove' : 'add')"
                  >
                    <UIcon
                      :name="
                        teacherIdFavorit === teacher.teacherId && isProcessing
                          ? 'i-lucide-loader'
                          : teacher.isFavorite
                            ? 'i-heroicons-heart-solid'
                            : 'i-heroicons-heart'
                      "
                      class="size-6"
                      :class="{
                        'text-primary': teacher.isFavorite,
                        'text-gray-400': !teacher.isFavorite,
                        'animate-spin': teacherIdFavorit === teacher.teacherId && isProcessing
                      }"
                    />
                  </button>
                  <div class="flex flex-col gap-5 max-sm:gap-4">
                    <img
                      :src="src"
                      :alt="teacher.fullName"
                      loading="lazy"
                      class="w-full h-30 max-sm:h-24 object-contain rounded-xl"
                    />

                    <div class="text-center">
                      <p class="text-xl font-medium max-lg:text-lg">{{ teacher.fullName }}</p>
                      <p class="text-sm text-[#6B7280] mt-1 max-sm:text-xs">{{ teacher.position }}</p>
                    </div>

                    <div class="space-y-3 max-sm:space-y-2">
                      <div class="flex items-start gap-3 max-sm:gap-2">
                        <BaseIcon name="award-2" class="mt-0.5 shrink-0 max-sm:w-4 max-sm:h-4" />
                        <p class="text-sm leading-6 max-sm:text-xs max-sm:leading-5">
                          {{ teacher.award1 }} {{ teacher.teacherId }}
                        </p>
                      </div>
                      <div class="flex items-start gap-3 max-sm:gap-2">
                        <BaseIcon name="line-2" class="mt-0.5 shrink-0 max-sm:w-4 max-sm:h-4" />
                        <p class="text-sm leading-6 max-sm:text-xs max-sm:leading-5">{{ teacher.award2 }}</p>
                      </div>
                      <div class="flex items-start gap-3 max-sm:gap-2">
                        <BaseIcon name="graduation" class="mt-0.5 shrink-0 max-sm:w-4 max-sm:h-4" />
                        <p class="text-sm leading-6 max-sm:text-xs max-sm:leading-5">{{ teacher.award3 }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="hasMore" class="my-6 flex justify-center">
              <UIcon name="i-lucide-loader" class="animate-spin size-8 text-primary" />
            </div>
          </div>
        </template>
        <UiEmpty v-else-if="!displayedTeachers?.length" />
      </div>
    </div>
    <UiRegistrationSlotModal @booking="handleBooking" />
    <UiBackToTop keepalive />
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.teacher-card {
  opacity: 1;
}

.teacher-card.card-animate {
  opacity: 0;
  animation: fadeInUp 0.4s ease-out forwards;
}

@keyframes slideInScale {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slot-item {
  opacity: 0;
  animation: slideInScale 0.3s ease-out forwards;
}

.slots-fade-enter-active,
.slots-fade-leave-active {
  transition: all 0.3s ease;
}

.slots-fade-enter-from,
.slots-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.button-slide-enter-active,
.button-slide-leave-active {
  transition: all 0.4s ease;
}

.button-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.button-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.teacher-list-scroll {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.teacher-list-scroll::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}
</style>
