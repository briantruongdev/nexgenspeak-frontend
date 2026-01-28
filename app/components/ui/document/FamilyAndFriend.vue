<script setup lang="ts">
const { t } = useI18n()

const items = computed(() => [
  {
    image: '/images/book1.png',
    title: t('document.familyAndFriend.books.book1')
  },
  {
    image: '/images/book2.png',
    title: t('document.familyAndFriend.books.book2')
  },
  {
    image: '/images/book3.png',
    title: t('document.familyAndFriend.books.book3')
  }
])
</script>

<template>
  <div class="container pt-24 max-xl:px-6 max-sm:pt-12">
    <p class="title">{{ $t('document.familyAndFriend.title') }}</p>
    <p class="mt-8">
      {{ $t('document.familyAndFriend.description') }}
    </p>
    <div class="grid grid-cols-3 gap-16 mt-10 max-md:grid-cols-2 max-md:gap-10 max-sm:gap-6">
      <div v-for="(item, index) in items" :key="index">
        <div class="bg-white box-shadow h-full flex flex-col rounded-xl">
          <img :src="item.image" alt="" loading="lazy" class="w-full object-cover rounded-tl-xl rounded-tr-xl" />

          <div class="p-4 flex flex-col flex-1">
            <p class="mb-10 text-lg max-sm:text-sm">
              {{ item.title }}
            </p>

            <BaseButton :text="$t('document.familyAndFriend.learnMore')" class="mx-auto mt-auto" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
