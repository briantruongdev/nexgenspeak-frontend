<script setup lang="ts">
const data = [
  {
    icon: 'line',
    title: 'Kỹ năng sư phạm tốt',
    description:
      'Đội ngũ giáo viên nhiều năm kinh nghiệm, là Thạc sĩ, Thủ khoa, Á khoa,Giảng viên các trường Đại học danh tiếng. Có chứng chỉ giảng dạy quốc tế và được đào tạo bài bản.'
  },
  {
    icon: 'heart',
    title: 'Dạy học có tâm',
    description:
      'Đội ngũ giáo viên luôn đặt học viên của mình lên hàng đầu. Không chỉ giảng dạy và truyền đạt kiến thức tại lớp, giáo viên còn sẵn sàng hỗ trợ học viên ngoài giờ học thông qua Fanpage.'
  },
  {
    icon: 'award',
    title: 'Linearthinking Ambassador',
    description:
      'Linearthinking là Hệ phương pháp học Tiếng Anh độc quyền của Nexgen. Đội ngũ của chúng tôi được đào tạo bài bản để giúp học viên tiếp thu trọn vẹn và vận dụng được Linearthinking thành thạo nhất.'
  }
]
</script>

<template>
  <div class="container relative">
    <div class="flex justify-between h-[80vh]">
      <div class="mt-12 relative">
        <p class="title mb-5">Đội ngũ giáo viên tại Nexgen</p>
        <p class="text-xl">
          Là những giáo viên giỏi kiến thức và giỏi truyền đạt. Rất tận tâm với học viên, đi dạy vì cái tâm và luôn khát khao cải
          tiến việc học Tiếng Anh ở Việt Nam.
        </p>
        <BaseButton text="Nhắn tin đặt lịch ngay" class="absolute top-2/5" />
      </div>
      <img src="/images/teacher-banner.png" alt="Banner" class="w-100 h-100" />
    </div>
    <div class="grid grid-cols-3 gap-14 bg-white p-10 rounded-4xl box-shadow absolute -bottom-1/4">
      <div v-for="(item, index) in data" :key="index">
        <BaseIcon :name="item.icon" />
        <p class="text-xl font-medium my-4">{{ item.title }}</p>
        <p class="text-justify">
          {{ item.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.box-shadow {
  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}
</style>
