<script setup lang="ts">
const items = [
  {
    image: '/images/book1.png',
    title: '14 NGÀY ÔN CẤP TỐC TẤT CẢ CÁC NGỮ PHÁP QUAN TRỌNG NHẤT VỚI PHIẾU BÀI TẬP ĐƯỢC THIẾT KẾ ĐẸP MẮT'
  },
  {
    image: '/images/book2.png',
    title: 'English for Project Management - Luyện Đọc'
  },
  {
    image: '/images/book3.png',
    title: 'Luyện nghe hội thoại các tình huống thường gặp khi giao tiếp'
  },
  {
    image: '/images/book3.png',
    title: 'Luyện nghe hội thoại các tình huống thường gặp khi giao tiếp'
  },
  {
    image: '/images/book1.png',
    title: '14 NGÀY ÔN CẤP TỐC TẤT CẢ CÁC NGỮ PHÁP QUAN TRỌNG NHẤT VỚI PHIẾU BÀI TẬP ĐƯỢC THIẾT KẾ ĐẸP MẮT'
  },
  {
    image: '/images/book2.png',
    title: 'English for Project Management - Luyện Đọc'
  }
]

const page = ref(1)
const pageSize = 3

const paged = computed(() => {
  const start = (page.value - 1) * pageSize
  return items.slice(start, start + pageSize)
})
</script>

<template>
  <div class="container pt-24">
    <p class="title">Luyện thi TOEIC</p>
    <p class="mt-8">
      Đây là bộ tài liệu luyện thi mới theo cấu trúc đề thi của TOEIC® mới, bao gồm các chiến lược và kỹ năng ôn thi chi tiết để
      thí sinh có thể cải thiện điểm số của từng phần thi, hơn 1000 bài tập thực hành, 2 bài kiểm tra năng lực về kỹ năng Nghe
      hiểu và Đọc TOEIC®, 2 bài kiểm tra hoàn chỉnh với các phiếu trả lời kiểu TOEIC® để thí sinh có thể đánh giá và chuẩn bị cho
      các điều kiện của bài thi TOEIC®, 1 Audio CD đi kèm với sách có học phần về kỹ năng Nghe hiểu, 1 Complete Audio Program ( ko
      bán kèm với sách, có kỹ năng nghe ở tất cả các học phần), một tập lệnh âm thanh bao gồm tất cả các tài liệu được ghi lại ở
      Complete Audio Program.
    </p>
    <div class="grid grid-cols-3 gap-16 mt-10">
      <div v-for="(item, index) in paged" :key="index">
        <div class="bg-white box-shadow h-full flex flex-col rounded-xl">
          <img :src="item.image" alt="" loading="lazy" class="w-full object-cover rounded-tl-xl rounded-tr-xl" />

          <div class="p-4 flex flex-col flex-1">
            <p class="mb-10 text-lg">
              {{ item.title }}
            </p>

            <BaseButton text="Tìm hiểu thêm" class="mx-auto mt-auto" />
          </div>
        </div>
      </div>
    </div>
    <div class="my-8 flex justify-center">
      <UPagination
        v-model:page="page"
        :total="items.length"
        :items-per-page="pageSize"
        color="primary"
        active-color="primary"
        :ui="{
          root: 'select-none',
          list: 'gap-2 max-sm:gap-1',
          next: 'hover:cursor-pointer',
          prev: 'hover:cursor-pointer',
          last: 'hover:cursor-pointer',
          first: 'hover:cursor-pointer',
          item: 'hover:cursor-pointer'
        }"
      />
    </div>
  </div>
</template>

<style scoped></style>
