<script setup lang="ts">
const navItemsPrimary = [
  { name: 'Kế hoạch học tập & Học phí', href: '/' },
  { name: 'Giáo viên', href: '/' },
  { name: 'Tài liệu', href: '/' }
]
const navItemsSecondary = [
  { name: 'Blog', href: '/' },
  { name: 'Liên hệ', href: '/' },
  { name: 'Tuyển dụng', href: '/' }
]
</script>

<template>
  <div class="flex justify-between items-center h-24 mx-9">
    <img src="/images/logo.png" alt="Logo" loading="lazy" class="w-24 hover:cursor-pointer" @click="navigateTo('/')" />
    <div class="flex gap-10 items-center">
      <span v-for="(item, index) in navItemsPrimary" :key="index" class="font-bold text-text-primary hover:cursor-pointer">
        {{ item.name }}
      </span>
      <USeparator orientation="vertical" class="h-8" />
      <span v-for="(item, index) in navItemsSecondary" :key="index" class="font-bold text-[#B4ADAD] hover:cursor-pointer">
        {{ item.name }}
      </span>
    </div>

    <div class="flex gap-4 items-center">
      <UButton class="rounded-xl hover:cursor-pointer" size="lg">Đăng nhập</UButton>
      <BaseIcon name="phone-call" />
      <BaseIcon name="search" />

      <USeparator orientation="vertical" class="h-8" />

      <BaseLanguages />
    </div>
  </div>
</template>

<style scoped></style>
