<script setup lang="ts">
const src = '/images/contact-banner2.png'
</script>

<template>
  <div class="relative pt-32 max-lg:pt-20">
    <img :src alt="Banner" loading="lazy" class="h-screen w-screen object-cover" />
    <div class="absolute w-2/5 bg-primary rounded-tr-[50px] rounded-br-[50px] text-white top-50 px-10 py-16">
      <p class="text-3xl font-bold">Sứ mệnh</p>
      <p class="mt-2">
        Chúng tôi chia sẻ kiến thức và cởi mở với tư duy làm việc mới. Chúng tôi đưa ra quyết định đúng đắn với sự cân nhắc hợp
        lý. Chúng tôi chia sẻ kiến thức và cởi mở với tư duy làm việc mới. Chúng tôi đưa ra quyết định đúng đắn với sự cân nhắc
        hợp lý.
      </p>
      <p class="text-3xl font-bold my-4">Phương châm đào tạo</p>
      <div class="space-x-3">
        <div>
          <p class="text-xl font-bold">Tinh gọn</p>
          <p class="mt-2">Lộ trình không chia nhỏ, đáp ứng nhu cầu học lấy chứng chỉ cấp tốc trong thời gian ngắn.</p>
        </div>
        <div>
          <p class="text-xl font-bold">Tiết kiệm</p>
          <p class="mt-2">Mức học phí phù hợp với đa số đối tượng người học là học sinh, sinh viên, người mới ra trường.</p>
        </div>
        <div>
          <p class="text-xl font-bold">Tiết kiệm</p>
          <p class="mt-2">Giáo trình độc quyền. Đội ngũ giáo viên chuyên môn cao, giàu kinh nghiệm.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
