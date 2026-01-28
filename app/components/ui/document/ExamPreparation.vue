<script setup lang="ts">
const { t } = useI18n()

const items = computed(() => [
  {
    image: '/images/book1.png',
    title: t('document.examPreparation.books.book1')
  },
  {
    image: '/images/book2.png',
    title: t('document.examPreparation.books.book2')
  },
  {
    image: '/images/book3.png',
    title: t('document.examPreparation.books.book3')
  },
  {
    image: '/images/book3.png',
    title: t('document.examPreparation.books.book3')
  },
  {
    image: '/images/book1.png',
    title: t('document.examPreparation.books.book1')
  },
  {
    image: '/images/book2.png',
    title: t('document.examPreparation.books.book2')
  }
])

const page = ref(1)
const pageSize = 3

const paged = computed(() => {
  const start = (page.value - 1) * pageSize
  return items.value.slice(start, start + pageSize)
})
</script>

<template>
  <div class="container pt-24 max-xl:px-6">
    <p class="title">{{ $t('document.examPreparation.title') }}</p>
    <p class="mt-8">
      {{ $t('document.examPreparation.description') }}
    </p>
    <div class="grid grid-cols-3 gap-16 mt-10 max-md:grid-cols-2">
      <div v-for="(item, index) in paged" :key="index">
        <div class="bg-white box-shadow h-full flex flex-col rounded-xl">
          <img :src="item.image" alt="" loading="lazy" class="w-full object-cover rounded-tl-xl rounded-tr-xl" />

          <div class="p-4 flex flex-col flex-1">
            <p class="mb-10 text-lg max-sm:text-sm">
              {{ item.title }}
            </p>

            <BaseButton :text="$t('document.examPreparation.learnMore')" class="mx-auto mt-auto" />
          </div>
        </div>
      </div>
    </div>
    <div class="my-8 flex justify-center">
      <UPagination
        v-model:page="page"
        :total="items.length"
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

<style scoped></style>
