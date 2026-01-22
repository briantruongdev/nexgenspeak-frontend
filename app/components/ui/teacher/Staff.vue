<script setup lang="ts">
interface Teacher {
  id: number
  name: string
  title: string
  image: string
  highlights: { icon: string; text: string }[]
}

const teachers = ref<Teacher[]>([
  {
    id: 1,
    name: 'Trần Thanh Tâm',
    title: 'Academic Director tại Nexgen',
    image: '/images/teacher-default.png',
    highlights: [
      { icon: 'award-2', text: 'Linearthinking Ambassador' },
      { icon: 'line-2', text: '8.5 IELTS Overall' },
      { icon: 'line-2', text: '8.5 IELTS Speaking' },
      { icon: 'graduation', text: 'Thạc sĩ Giảng dạy ngôn ngữ' },
      { icon: 'graduation', text: 'Cử nhân RMIT' },
      { icon: 'play', text: 'IELTS Musketeer — The IELTS Face-off mùa 4' }
    ]
  },
  ...Array.from({ length: 17 }).map((_, idx) => ({
    id: idx + 2,
    name: 'Nguyễn Mỹ Anh',
    title: 'Giảng viên Tiếng Anh',
    image: '/images/teacher-default.png',
    highlights: [
      { icon: 'award', text: 'Linearthinking Ambassador' },
      { icon: 'line', text: '7.5 IELTS Overall' },
      { icon: 'heart', text: 'Thạc sĩ Giảng dạy ngôn ngữ' }
    ]
  }))
])

const page = ref(1)
const pageSize = 9
const selectedTeacherId = ref<Teacher['id']>(teachers.value[0]?.id ?? 1)
const selectedTeacher = computed(() => teachers.value.find(t => t.id === selectedTeacherId.value) ?? teachers.value[0])

const pagedTeachers = computed(() => {
  const start = (page.value - 1) * pageSize
  return teachers.value.slice(start, start + pageSize)
})

watch(
  () => page.value,
  () => {
    const first = pagedTeachers.value[0]
    if (first) selectedTeacherId.value = first.id
  }
)
</script>

<template>
  <section class="bg-[#EEF0F1] pt-40">
    <div class="container py-16 max-lg:py-12 max-md:py-10 max-xl:px-6">
      <div class="text-center mb-10 max-md:mb-8">
        <p class="text-4xl font-extrabold max-md:text-3xl max-sm:text-2xl">Đội ngũ Giáo Viên</p>
        <div class="mt-3 flex items-center justify-center gap-4">
          <span class="h-[2px] w-8 bg-primary rounded-full" />
          <span class="h-[2px] w-8 bg-primary rounded-full" />
          <span class="h-[2px] w-8 bg-primary rounded-full" />
        </div>
      </div>

      <div class="grid grid-cols-[420px_1fr] gap-10 max-lg:grid-cols-[360px_1fr] max-md:grid-cols-1">
        <div class="bg-white rounded-2xl p-6 max-sm:p-4 shadow-sm border border-black/5">
          <div class="flex flex-col gap-5">
            <img
              :src="selectedTeacher?.image"
              :alt="selectedTeacher?.name"
              loading="lazy"
              class="w-full h-60 max-lg:h-52 max-sm:h-44 object-contain rounded-xl"
            />

            <div>
              <p class="text-2xl font-extrabold max-sm:text-xl">{{ selectedTeacher?.name }}</p>
              <p class="text-sm text-[#6B7280] mt-1">{{ selectedTeacher?.title }}</p>
            </div>

            <div class="space-y-3">
              <div v-for="(h, idx) in selectedTeacher?.highlights" :key="idx" class="flex items-start gap-3">
                <BaseIcon :name="h.icon" class="mt-[2px] shrink-0" />
                <p class="text-sm font-medium leading-6">{{ h.text }}</p>
              </div>
            </div>

            <BaseButton
              text="Xem thông tin giảng viên"
              variant="outline"
              class="w-full"
              class-name="h-11 max-sm:h-10"
              class-text="font-semibold"
            />
          </div>
        </div>

        <div>
          <div class="grid grid-cols-3 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
            <button
              v-for="t in pagedTeachers"
              :key="t.id"
              type="button"
              class="bg-white rounded-[10px] hover:cursor-pointer border border-black/5 shadow-sm p-4 text-left transition-all duration-200 hover:border-primary"
              :class="selectedTeacherId === t.id ? 'ring-2 ring-primary border-primary/30' : ''"
              @click="selectedTeacherId = t.id"
            >
              <div class="w-2/3 h-16 rounded-lg bg-[#F6E5D5] overflow-hidden shrink-0 mx-auto flex justify-center">
                <img :src="t.image" :alt="t.name" loading="lazy" class="object-cover h-[75px]" />
              </div>
              <p class="font-bold text-sm mt-2 truncate text-center">{{ t.name }}</p>
            </button>
          </div>

          <div class="mt-8 flex justify-center">
            <UPagination
              v-model:page="page"
              :total="teachers.length"
              :items-per-page="pageSize"
              color="primary"
              active-color="primary"
              :ui="{
                root: 'select-none',
                list: 'gap-2'
              }"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
