<script setup lang="ts">
const input = useTemplateRef('input')
const skills = ref(['Kỹ năng nói', 'Kỹ năng đọc', 'Kỹ năng viết', 'Kỹ năng nghe', 'Từ vựng', 'Ngữ pháp'])
const value = ref('Kỹ năng nói')
</script>

<template>
  <div class="container pt-24">
    <p class="title text-center">Kho tài liệu Tiếng Anh NexGen</p>
    <p class="text-lg font-medium mt-10 text-center">
      NexGen có một kho tàng lớn về tài liệu học Tiếng Anh, cập nhật thường xuyên từ cơ bản đến nâng cao.
    </p>
    <p class="text-lg font-medium text-center">Đăng ký ngay để bắt đầu hành trình chinh phục tiếng Anh giao tiếp!</p>
    <div class="flex justify-center mt-8">
      <UInput
        ref="input"
        icon="i-lucide-search"
        placeholder="Nhập chủ đề"
        class="w-2/3"
        :ui="{
          base: 'h-16'
        }"
      >
        <template #trailing>
          <BaseButton text="Tìm kiếm" class="rounded" />
        </template>
      </UInput>
    </div>
    <div class="flex flex-wrap gap-12 my-10 justify-center">
      <div v-for="(item, index) in skills" :key="index">
        <p
          class="bg-white border border-solid border-primary rounded-full py-2 px-4 whitespace-nowrap hover-scale-105 hover:cursor-pointer"
        >
          {{ item }}
        </p>
      </div>
    </div>
    <div class="flex justify-center items-center gap-10">
      <USelectMenu
        v-model="value"
        :items="skills"
        class="w-96"
        size="xl"
        :ui="{
          base: 'hover:cursor-pointer',
          value: 'ml-2 hover:cursor-pointer',
          content: 'hover:cursor-pointer'
        }"
      />
      <BaseButton text="Làm mới" variant="outline" class="rounded" />
    </div>
  </div>
</template>

<style scoped></style>
