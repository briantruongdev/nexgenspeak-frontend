<script setup lang="ts">
import 'simplebar-vue/dist/simplebar.min.css'
import SimpleBar from 'simplebar-vue'
import type { ITeacher } from '~/types/teacher.type'

const INITIAL_LOAD_COUNT = 12
const LOAD_MORE_COUNT = 6
const OBSERVER_ROOT_MARGIN = '50px'
const ANIMATION_DELAY_MS = 50

const { t } = useI18n()
const { data, pending } = useTeacher()

const selectedTeacherId = ref<ITeacher['teacherId']>(data.value?.teachers[0]?.teacherId ?? '')
const scrollArea = ref<InstanceType<typeof SimpleBar> | null>(null)
const loadMoreTrigger = ref<HTMLElement | null>(null)
const displayCount = ref(INITIAL_LOAD_COUNT)
const showCards = ref(false)

const allTeachers = computed(() => data.value?.teachers ?? [])

const selectedTeacher = computed(() => {
  const found = allTeachers.value.find(t => t.teacherId === selectedTeacherId.value)
  return found ?? allTeachers.value[0]
})

const displayedTeachers = computed(() => allTeachers.value.slice(0, displayCount.value))

const hasMore = computed(() => displayCount.value < allTeachers.value.length)

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
  [() => displayedTeachers.value.length, () => data.value],
  ([newLength, newData]) => {
    if (newLength > 0 && newData) {
      nextTick(setupObserver)
    }
  },
  { flush: 'post' }
)

onMounted(() => {
  setTimeout(() => {
    showCards.value = true
  }, ANIMATION_DELAY_MS)

  nextTick(setupObserver)
})

onBeforeUnmount(() => {
  cleanupObserver()
})
</script>

<template>
  <section class="bg-[#EEF0F1] max-lg:pt-0">
    <div class="container py-10 max-lg:py-12 max-md:py-10 max-xl:px-6">
      <UiTeacherTitle :title="t('teacher.staff.title')" />

      <div
        class="grid grid-cols-[420px_1fr] gap-10 max-xl:grid-cols-[360px_1fr] max-xl:gap-8 max-lg:grid-cols-[320px_1fr] max-lg:gap-6 max-md:grid-cols-1 items-start"
      >
        <div
          class="bg-white rounded-2xl p-6 max-sm:p-4 shadow-sm border border-black/5 detail-card"
          :class="showCards ? 'detail-animate' : ''"
        >
          <div class="flex flex-col gap-5 max-sm:gap-4">
            <img
              :key="selectedTeacher?.teacherId"
              :src="`/images/${selectedTeacher?.avatar}`"
              :alt="selectedTeacher?.fullName"
              loading="lazy"
              class="w-full h-60 max-sm:h-44 object-contain rounded-xl"
            />

            <div :key="selectedTeacher?.teacherId">
              <p class="text-2xl font-extrabold max-lg:text-xl max-sm:text-lg">{{ selectedTeacher?.fullName }}</p>
              <p class="text-sm text-[#6B7280] mt-1 max-sm:text-xs">{{ selectedTeacher?.position }}</p>
            </div>

            <div :key="selectedTeacher?.teacherId" class="space-y-3 max-sm:space-y-2">
              <div class="flex items-start gap-3 max-sm:gap-2">
                <BaseIcon name="award-2" class="mt-0.5 shrink-0 max-sm:w-4 max-sm:h-4" />
                <p class="text-sm leading-6 max-sm:text-xs max-sm:leading-5">
                  {{ selectedTeacher?.award1 }}
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
              :text="t('teacher.staff.viewInfo')"
              variant="outline"
              class="w-full"
              class-name="h-11 max-sm:h-10 rounded-xl"
              class-text="font-semibold max-sm:text-sm"
              @click="navigateTo({ name: 'teacher-id', params: { id: selectedTeacher?.teacherId } })"
            />
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 max-sm:p-4 shadow-sm border border-black/5 flex flex-col">
          <div v-if="pending" class="flex flex-col space-y-4 items-center my-8 animate-pulse">
            <UIcon name="i-lucide-loader" class="animate-spin size-10 text-primary" />
            <span class="text-gray-500 animate-pulse">{{ t('booking.loadingTeachers') }}</span>
          </div>
          <template v-else-if="displayedTeachers?.length">
            <ClientOnly>
              <SimpleBar ref="scrollArea" class="max-h-125" data-simplebar-auto-hide="false">
                <div
                  class="grid grid-cols-3 gap-4 max-xl:gap-3 max-lg:grid-cols-2 max-md:grid-cols-3 max-sm:grid-cols-2 content-start pr-2"
                >
                  <button
                    v-for="(teacher, index) in displayedTeachers"
                    :key="teacher.teacherId"
                    type="button"
                    :style="showCards ? { animationDelay: `${index * 10}ms` } : {}"
                    class="bg-white teacher-card rounded-[10px] hover:cursor-pointer border border-black/5 shadow-sm p-3 m-1 max-sm:p-3 text-left transition-all duration-200 hover:border-primary h-fit"
                    :class="[
                      selectedTeacherId === teacher.teacherId ? 'ring-1 ring-primary' : '',
                      showCards ? 'card-animate' : ''
                    ]"
                    @click="selectedTeacherId = teacher.teacherId"
                  >
                    <div
                      class="w-2/3 h-16 max-sm:h-14 rounded-lg bg-[#F6E5D5] overflow-hidden shrink-0 mx-auto flex justify-center"
                    >
                      <img
                        :src="`/images/${teacher.avatar}`"
                        :alt="teacher.fullName"
                        loading="lazy"
                        class="object-cover h-18.75 max-sm:h-16.25"
                      />
                    </div>
                    <p class="font-bold text-sm max-sm:text-xs mt-2 mb-1 truncate text-center">{{ teacher.fullName }}</p>
                    <p class="text-sm text-center">{{ teacher.position }}</p>
                  </button>
                </div>
                <div v-if="hasMore" ref="loadMoreTrigger" class="h-4 w-full"></div>
              </SimpleBar>
            </ClientOnly>
          </template>
          <UiEmpty v-else />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
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
