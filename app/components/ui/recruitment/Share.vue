<script setup lang="ts">
const items = ['/images/people4.png', '/images/people5.png', '/images/people3.png', '/images/people4.png', '/images/people5.png']
</script>

<template>
  <div class="container pt-24">
    <p class="title">Chia sẻ trải nghiệm từ <span class="text-primary">Giáo viên và Founder</span></p>
    <p class="mt-9">
      Chúng tôi tạo ra môi trường để mỗi học viên có thể thực hành nhiều hơn. trò chuyện với giáo viên bản xứ một cách tự nhiên
      nhất. Và cuối cùng là sử dụng tiếng Anh nhuần nhuyễn
    </p>
    <div class="mt-20 grid grid-cols-2 gap-13">
      <div class="grid grid-cols-[1fr_1.5fr] gap-8">
        <UCarousel
          v-slot="{ item }"
          orientation="vertical"
          :items="items"
          loop
          arrows
          wheel-gestures
          prev-icon="i-lucide-chevron-left"
          next-icon="i-lucide-chevron-right"
          :ui="{
            container: 'h-[530px]',
            item: 'basis-full basis-1/3',
            prev: 'hover:cursor-pointer bg-primary text-white shadow-none ring-0 focus:ring-0 hover:bg-primary/60',
            next: 'hover:cursor-pointer bg-primary text-white shadow-none ring-0 focus:ring-0 hover:bg-primary/60'
          }"
          class="w-full max-w-xs mx-auto"
        >
          <img :src="item" width="320" height="320" class="object-cover" />
        </UCarousel>
        <img src="/images/ceo.png" alt="" class="h-[510px] object-cover" loading="lazy" />
      </div>
      <div>
        <p class="text-3xl font-bold">Trương Bá Chính</p>
        <p class="mt-1 font-medium">Tổng Giám Đốc, Sáng lập NexGen Speak</p>
        <div class="space-y-3 mt-10">
          <p>
            NG.Speak trao cho nhân viên cơ hội được tiếp cận với những công nghệ mới nhất đồng thời đầu tư vào việc phát triển tư
            duy và kỹ năng. Nhờ vậy, chúng tôi được trang bị để vượt qua thử thách trước mắt và đón đầu những cơ hội sắp đến.
          </p>
          <p>
            Một trong những chiến lược của NexGen là phát triển nhân tài nội bộ. Bản thân tôi vô cùng cảm kích vì được trải nghiệm
            chương trình Futurewise nơi rèn giũa và giúp tôi hoàn thiện bản thân cho vai trò lãnh đạo.
          </p>
          <p>Nếu bạn quan tâm đến cơ hội phát triển sự nghiệp và tưởng thưởng xứng đáng NexGenN chính là câu trả lời.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
