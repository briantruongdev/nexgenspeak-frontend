<script setup lang="ts">
import { useInfiniteScroll } from '@vueuse/core'
import type { ITeacher } from '~/types/teacher.type'

const { t } = useI18n()
const srcImg = '/images/teacher-default.png'
const { data, pending } = useTeacher()
const selectedTeacherId = ref<ITeacher['teacherId']>(data.value?.teachers[0]?.teacherId ?? '')
const scrollArea = ref<HTMLElement | null>(null)
const initialLoadCount = 12
const loadMoreCount = 6
const displayCount = ref(initialLoadCount)
const showCards = ref(false)
const selectedTeacher = computed(
  () => data.value?.teachers.find(t => t.teacherId === selectedTeacherId.value) ?? data.value?.teachers[0]
)

const allTeachers = computed(() => data.value?.teachers ?? [])

const displayedTeachers = computed(() => {
  return allTeachers.value.slice(0, displayCount.value)
})

const hasMore = computed(() => {
  return displayCount.value < allTeachers.value.length
})

const loadMore = () => {
  displayCount.value += loadMoreCount
}

useInfiniteScroll(
  scrollArea,
  () => {
    if (hasMore.value) {
      loadMore()
    }
  },
  { distance: 100 }
)
onMounted(() => {
  setTimeout(() => {
    showCards.value = true
  }, 50)
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
            <Transition name="fade" mode="out-in">
              <img
                :key="selectedTeacher?.teacherId"
                :src="srcImg"
                :alt="selectedTeacher?.fullName"
                loading="lazy"
                class="w-full h-60 max-lg:h-52 max-sm:h-44 object-contain rounded-xl"
              />
            </Transition>

            <Transition name="fade" mode="out-in">
              <div :key="selectedTeacher?.teacherId">
                <p class="text-2xl font-extrabold max-lg:text-xl max-sm:text-lg">{{ selectedTeacher?.fullName }}</p>
                <p class="text-sm text-[#6B7280] mt-1 max-sm:text-xs">{{ selectedTeacher?.position }}</p>
              </div>
            </Transition>

            <Transition name="fade" mode="out-in">
              <div :key="selectedTeacher?.teacherId" class="space-y-3 max-sm:space-y-2">
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
            </Transition>

            <BaseButton
              :text="$t('teacher.staff.viewInfo')"
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
            <div
              ref="scrollArea"
              class="grid grid-cols-3 teacher-list-scroll gap-4 max-xl:gap-3 max-lg:grid-cols-2 max-md:grid-cols-3 max-sm:grid-cols-2 overflow-y-auto max-h-125 content-start pr-2"
            >
              <div
                v-for="(teacher, index) in displayedTeachers"
                :key="teacher.teacherId"
                type="button"
                :style="showCards ? { animationDelay: `${index * 10}ms` } : {}"
                class="bg-white teacher-card rounded-[10px] hover:cursor-pointer border border-black/5 shadow-sm p-3 m-1 max-sm:p-3 text-left transition-all duration-200 hover:border-primary h-fit"
                :class="[
                  +selectedTeacherId === +teacher.teacherId ? 'ring-1 ring-primary ' : '',
                  showCards ? 'card-animate' : ''
                ]"
                @click="selectedTeacherId = teacher.teacherId"
              >
                <div class="w-2/3 h-16 max-sm:h-14 rounded-lg bg-[#F6E5D5] overflow-hidden shrink-0 mx-auto flex justify-center">
                  <img :src="srcImg" :alt="teacher.fullName" loading="lazy" class="object-cover h-18.75 max-sm:h-16.25" />
                </div>
                <p class="font-bold text-sm max-sm:text-xs mt-2 truncate text-center">{{ teacher.fullName }}</p>
              </div>

              <div v-if="hasMore" class="my-6 flex justify-center">
                <UIcon name="i-lucide-loader" class="animate-spin size-8 text-primary" />
              </div>
            </div>
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

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.detail-card {
  opacity: 1;
}

.detail-card.detail-animate {
  opacity: 0;
  animation: fadeInLeft 0.6s ease-out forwards;
}

.teacher-card {
  opacity: 1;
}

.teacher-card.card-animate {
  opacity: 0;
  animation: fadeInUp 0.4s ease-out forwards;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
