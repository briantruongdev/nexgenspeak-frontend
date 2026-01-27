<script setup lang="ts">
const items = [
  {
    icon: 'location',
    value: 'Tòa nhà Suced 108 Nguyễn Hoàng, Nam Từ Liêm, Hà Nội'
  },
  {
    icon: 'tel',
    value: '0888887798',
    type: 'tel'
  },
  {
    icon: 'mail-bg',
    value: 'info@czen.io',
    type: 'mail'
  },
  {
    icon: 'face-bg',
    value: 'NexGen Speak Việt Nam'
  }
]
</script>

<template>
  <div class="container pt-32 max-lg:pt-20">
    <p class="title">Liên hệ với Chúng Tôi</p>
    <p class="text-xl mt-7">
      Chúng tôi tạo khác biệt bằng một thương hiệu đột phá. Chúng tôi tin rằng từng cá nhân sẽ trở nên xuất sắc hơn khi phát huy
      được sức mạnh của tập thể. Tư duy đột phá sẽ giúp chúng tôi trở thành người mở lối.
    </p>
    <div class="mt-16 w-full">
      <p class="text-[42px] font-bold text-primary">Công Ty TNHH NexGen Speak</p>
      <div class="space-y-8 mt-10">
        <div v-for="(item, index) in items" :key="index" class="flex justify-start gap-2.5 items-center">
          <BaseIcon :name="item.icon" size="45" />
          <a v-if="item.type === 'tel'" :href="`tel:+84 ${item.value}`" class="text-2xl font-medium hover:underline">{{
            item.value
          }}</a>
          <a v-else-if="item.type === 'mail'" :href="`mailto:${item.value}`" class="text-2xl font-medium hover:underline">{{
            item.value
          }}</a>
          <p v-else class="text-2xl font-medium">{{ item.value }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
