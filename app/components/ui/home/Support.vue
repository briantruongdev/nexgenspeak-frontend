<script setup lang="ts"></script>

<template>
  <div class="bg-[#EDEFF0] mt-32 max-md:mt-24 max-lg:px-6">
    <div class="container py-10">
      <p class="text-5xl text-primary font-bold max-sm:text-3xl">Quý Khách cần thêm thông tin?</p>
      <p class="mt-4 text-lg font-medium max-md:text-base">
        Vẫn còn phân vân để lựa chọn gói sản phẩm phù hợp? Muốn tư vấn kỹ hơn về sản phẩm? Hãy liên hệ ngay với chúng tôi.
      </p>

      <div class="grid grid-cols-[3fr_1fr_3fr] mt-16 w-4/5 mx-auto max-md:w-full">
        <div class="flex justify-start items-start gap-4">
          <BaseIcon name="phone" size="36" />
          <div>
            <p class="text-primary text-lg font-bold">0988.666.8686 (miễn cước)</p>
            <p class="text-lg font-medium max-sm:text-sm">Thứ 2 - Thứ 6, 8h30 - 17h30.</p>
            <p class="text-lg font-medium mt-6 max-sm:text-sm">
              Ngoài giờ làm việc, vui lòng để lại tin nhắn, chúng tôi sẽ liên lạc lại.
            </p>
          </div>
        </div>
        <USeparator
          orientation="vertical"
          size="sm"
          :ui="{
            border: 'border-[#D9D9D9]'
          }"
        />
        <div class="flex justify-start items-start gap-4">
          <BaseIcon name="advise" size="44" />
          <div>
            <p class="text-primary text-lg font-bold">Muốn được tư vấn</p>
            <p class="text-lg font-medium max-sm:text-sm">Quý Khách vui lòng để lại thông tin và chúng tôi sẽ liên lạc lại.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
