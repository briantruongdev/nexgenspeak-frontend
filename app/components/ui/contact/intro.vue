<script setup lang="ts">
const bannerImageSrc = '/images/banner-auth.png'
</script>

<template>
  <div class="container grid grid-cols-[1fr_1.5fr] pt-24 max-lg:pt-20">
    <div class="aspect-3/4">
      <img :src="bannerImageSrc" class="w-full h-full object-cover" />
    </div>
    <div class="bg-bg-primary h-[80%] self-center p-10 pr-20 flex flex-col justify-between">
      <div>
        <p class="text-4xl font-bold">Giới thiệu về NexGen Speak</p>
        <p class="text-xl mt-10">
          Chúng tôi tạo khác biệt bằng một thương hiệu đột phá. Chúng tôi tin rằng từng cá nhân sẽ trở nên xuất sắc hơn khi phát
          huy được sức mạnh của tập thể. Tư duy đột phá sẽ giúp chúng tôi trở thành người mở lối.
        </p>
        <p class="text-xl mt-7">
          Chúng tôi tạo khác biệt bằng một thương hiệu đột phá. Chúng tôi tin rằng từng cá nhân sẽ trở nên xuất sắc hơn khi phát
          huy được sức mạnh của tập thể. Tư duy đột phá sẽ giúp chúng tôi trở thành người mở lối.
        </p>
      </div>
      <div>
        <BaseButton text="Câu chuyện Thương Hiệu" class-name="rounded">
          <BaseIcon name="arrow-right-white" class="shrink-0 text-white" />
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
