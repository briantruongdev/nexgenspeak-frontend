<script setup lang="ts">
const open = ref(false)
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
  <div class="flex justify-between items-center h-24 mx-9 max-xl:hidden">
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
  <div class="hidden max-xl:block mx-6">
    <div class="flex justify-between items-center">
      <img src="/images/logo.png" alt="Logo" loading="lazy" class="w-24 hover:cursor-pointer" @click="navigateTo('/')" />

      <UDrawer
        v-model:open="open"
        direction="right"
        inset:dismissible="false"
        :modal="false"
        :handle="false"
        should-scale-background
        set-background-color-on-scale
      >
        <UIcon name="i-lucide-menu" class="size-8 hover:cursor-pointer" />

        <template #body>
          <div class="min-w-96">
            <div class="flex justify-between items-center border-b border-border-primary">
              <img src="/images/logo.png" alt="Logo" loading="lazy" class="w-16 hover:cursor-pointer" @click="navigateTo('/')" />

              <UIcon name="i-lucide-x" class="size-6 hover:cursor-pointer" @click="open = false" />
            </div>

            <p class="space-y-3 flex flex-col my-3">
              <span v-for="(item, index) in navItemsPrimary" :key="index" class="hover:cursor-pointer hover:text-primary">
                {{ item.name }}
              </span>
            </p>
            <p class="space-y-3 flex flex-col">
              <span v-for="(item, index) in navItemsSecondary" :key="index" class="hover:cursor-pointer hover:text-primary">
                {{ item.name }}
              </span>
            </p>
          </div>
        </template>

        <template #footer>
          <UButton class="rounded-xl hover:cursor-pointer w-full flex justify-center" size="lg">Đăng nhập</UButton>
        </template>
      </UDrawer>
    </div>
  </div>
</template>
