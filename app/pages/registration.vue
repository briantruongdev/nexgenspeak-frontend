<script setup lang="ts">
import 'simplebar-vue/dist/simplebar.min.css'
import SimpleBar from 'simplebar-vue'
import { shallowRef, watch, nextTick, computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { CalendarDate, today, getLocalTimeZone } from '@internationalized/date'
import { useTeacher } from '@/composables/useTeacher'
import { refDebounced } from '@vueuse/core'
import dayjs from 'dayjs'

definePageMeta({
  middleware: 'auth'
})

const TEACHER_DEFAULT_IMAGE = '/images/teacher-default.png'
const INITIAL_LOAD_COUNT = 9
const LOAD_MORE_COUNT = 6
const SEARCH_DEBOUNCE_MS = 300
const OBSERVER_ROOT_MARGIN = '100px'
const ANIMATION_DELAY_MS = 50
const OBSERVER_SETUP_DELAY_MS = 100

const { t } = useI18n()
const { data, pending, isProcessing, getSlotByDate, toggleFavoriteTeacher } = useTeacher()
const { isSlotModalVisible, selectedTeacherId, selectedSlotIds, booking } = useRegistration()

const getCurrentDate = () => {
  const now = new Date()
  return new CalendarDate(now.getFullYear(), now.getMonth() + 1, now.getDate())
}

const date = shallowRef(getCurrentDate())
const minDate = today(getLocalTimeZone())
const maxDate = minDate.add({ months: 1 })

const displayCount = ref(INITIAL_LOAD_COUNT)
const processingTeacherId = ref('')
const showCards = ref(false)
const scrollArea = ref<InstanceType<typeof SimpleBar> | null>(null)
const loadMoreTrigger = ref<HTMLElement | null>(null)
const search = ref('')
const searchDebounced = refDebounced(search, SEARCH_DEBOUNCE_MS)

const filteredTeachers = computed(() => {
  const searchTerm = searchDebounced.value?.trim().toLowerCase()
  if (!searchTerm) return data.value?.teachers ?? []

  return data.value?.teachers.filter(teacher => teacher.fullName.toLowerCase().includes(searchTerm)) ?? []
})

const displayedTeachers = computed(() => filteredTeachers.value.slice(0, displayCount.value))

const hasMore = computed(() => filteredTeachers.value.length > displayCount.value)

const formattedDate = computed(() => {
  if (!date.value) return ''
  const { year, month, day } = date.value
  return dayjs(`${year}-${month}-${day}`).format('YYYY-MM-DD')
})

const handleSelectedTeacher = async (teacherId: string) => {
  selectedTeacherId.value = teacherId
  selectedSlotIds.value = []
  isSlotModalVisible.value = true
  await fetchSlots()
}

const fetchSlots = async () => {
  if (!selectedTeacherId.value) return

  try {
    await getSlotByDate(selectedTeacherId.value, formattedDate.value)
  } catch (error) {
    console.error('Failed to fetch slots:', error)
  }
}

const handleDateChange = () => {
  if (selectedTeacherId.value) {
    fetchSlots()
  }
}

const handleToggleFavorite = async (event: Event, teacherId: string, currentAction: 'add' | 'remove') => {
  event.stopPropagation()
  processingTeacherId.value = teacherId

  try {
    await toggleFavoriteTeacher(teacherId, currentAction)
  } catch (error) {
    console.error('Failed to toggle favorite:', error)
  } finally {
    processingTeacherId.value = ''
  }
}

const resetAnimation = () => {
  showCards.value = false
  nextTick(() => {
    showCards.value = true
  })
}

watch(search, () => {
  displayCount.value = INITIAL_LOAD_COUNT
  resetAnimation()
})

const loadMore = () => {
  if (!hasMore.value) return
  displayCount.value += LOAD_MORE_COUNT
}

let observer: IntersectionObserver | null = null

const cleanupObserver = () => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
}

const setupObserver = () => {
  cleanupObserver()

  nextTick(() => {
    const trigger = loadMoreTrigger.value
    const simpleBar = scrollArea.value

    if (!trigger || !simpleBar) return

    const simplebarElement = simpleBar.$el as HTMLElement
    const scrollContainer = simplebarElement?.querySelector('.simplebar-content-wrapper') as HTMLElement

    if (!scrollContainer) return

    observer = new IntersectionObserver(
      entries => {
        const entry = entries[0]
        if (entry?.isIntersecting && hasMore.value) {
          loadMore()
        }
      },
      {
        root: scrollContainer,
        rootMargin: OBSERVER_ROOT_MARGIN,
        threshold: 0.1
      }
    )

    observer.observe(trigger)
  })
}

watch(
  [displayedTeachers, () => data.value, pending],
  ([newDisplayed, newData, isPending]) => {
    if (newDisplayed?.length && !isPending && newData) {
      nextTick(setupObserver)
    }
  },
  { flush: 'post' }
)

const handleBooking = async () => {
  if (!selectedTeacherId.value || !selectedSlotIds.value.length) {
    console.error('Missing required booking data')
    return
  }

  try {
    const bookingData = {
      teacherId: selectedTeacherId.value,
      slotIds: selectedSlotIds.value,
      date: formattedDate.value
    }
    await booking(bookingData)
    date.value = getCurrentDate()
    selectedTeacherId.value = ''
    selectedSlotIds.value = []
    isSlotModalVisible.value = false
  } catch (error) {
    console.error('Failed to book slots:', error)
  }
}

onMounted(() => {
  setTimeout(() => {
    showCards.value = true
  }, ANIMATION_DELAY_MS)

  setTimeout(setupObserver, OBSERVER_SETUP_DELAY_MS)
})

onBeforeUnmount(() => {
  cleanupObserver()
})
</script>

<template>
  <div class="container max-xl:px-6">
    <div class="grid grid-cols-[1fr_2fr] gap-10 max-sm:gap-6 py-6 max-[900px]:grid-cols-1 max-[900px]:py-0">
      <div>
        <p class="title mb-8 max-[900px]:hidden">{{ t('booking.teacherList') }}</p>
        <BaseInput
          v-model="search"
          :placeholder="t('search')"
          class="w-full mb-4 max-[900px]:hidden"
          icon="i-lucide-search"
          :is-show-clear="true"
        />
        <ClientOnly>
          <div class="calendar-animate">
            <div class="sticky self-start flex justify-center items-center max-sm:p-0 max-[900px]:mt-8">
              <div class="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <UCalendar
                  v-model="date"
                  size="xl"
                  :min-value="minDate"
                  :max-value="maxDate"
                  @update:model-value="handleDateChange"
                />
              </div>
            </div>
          </div>
        </ClientOnly>
      </div>
      <div class="flex-1 max-[900px]:mb-8">
        <p class="title mb-8 max-sm:mb-4 hidden max-[900px]:block">{{ t('booking.teacherList') }}</p>
        <BaseInput
          v-model="search"
          :placeholder="t('search')"
          class="w-1/2 mb-4 max-[500px]:w-2/3 hidden max-[900px]:block"
          icon="i-lucide-search"
          :is-show-clear="true"
        />
        <div v-if="pending && !data" class="flex flex-col space-y-4 items-center my-8 animate-pulse">
          <UIcon name="i-lucide-loader" class="animate-spin size-10 text-primary" />
          <span class="text-gray-500 animate-pulse">{{ t('booking.loadingTeachers') }}</span>
        </div>
        <template v-else-if="displayedTeachers?.length">
          <ClientOnly>
            <SimpleBar ref="scrollArea" class="max-h-screen overflow-y-auto p-1">
              <div class="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-[400px]:grid-cols-1!">
                <div
                  v-for="(teacher, index) in displayedTeachers"
                  :key="teacher.teacherId"
                  type="button"
                  class="teacher-card bg-white rounded-lg hover:cursor-pointer border border-black/5 shadow-sm p-4 max-sm:p-3 text-left transition-all duration-300 hover:border-primary"
                  :class="[selectedTeacherId === teacher.teacherId ? 'ring-2 ring-primary' : '', showCards ? 'card-animate' : '']"
                  :style="showCards ? { animationDelay: `${index * 10}ms` } : {}"
                  @click="handleSelectedTeacher(teacher.teacherId)"
                >
                  <div class="rounded-lg overflow-hidden shrink-0 mx-auto justify-start relative">
                    <button
                      type="button"
                      :aria-label="teacher.isFavorite ? t('booking.removeFavorite') : t('booking.addFavorite')"
                      class="absolute top-0 right-2 z-10 hover:cursor-pointer flex justify-center items-center"
                      @click="e => handleToggleFavorite(e, teacher.teacherId, teacher.isFavorite ? 'remove' : 'add')"
                    >
                      <UIcon
                        :name="
                          processingTeacherId === teacher.teacherId && isProcessing
                            ? 'i-lucide-loader'
                            : teacher.isFavorite
                              ? 'i-heroicons-heart-solid'
                              : 'i-heroicons-heart'
                        "
                        class="size-6"
                        :class="{
                          'text-primary': teacher.isFavorite,
                          'text-gray-400': !teacher.isFavorite,
                          'animate-spin': processingTeacherId === teacher.teacherId && isProcessing
                        }"
                      />
                    </button>
                    <div class="flex flex-col gap-5 max-sm:gap-4">
                      <img
                        :src="TEACHER_DEFAULT_IMAGE"
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
                            {{ teacher.award1 }}
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
              <div v-if="hasMore" ref="loadMoreTrigger" class="h-4 w-full"></div>
            </SimpleBar>
          </ClientOnly>
        </template>
        <UiEmpty v-else-if="!displayedTeachers?.length" />
      </div>
    </div>
    <UiRegistrationSlotModal @booking="handleBooking" />
    <UiBackToTop keepalive />
  </div>
</template>

<style scoped>
.calendar-animate {
  animation: fadeSlideIn 0.35s ease-out;
}

@keyframes fadeSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
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
:deep(.simplebar-scrollbar:before) {
  background: #cbd5e1;
  opacity: 0.7;
}

:deep(.simplebar-track.simplebar-vertical) {
  width: 6px;
  right: 2px;
}

:deep(.simplebar-scrollbar) {
  width: 8px;
}

:deep(.simplebar-content-wrapper) {
  padding-right: 12px;
}

:deep(.simplebar-scrollbar:before) {
  border-radius: 6px;
}
</style>
