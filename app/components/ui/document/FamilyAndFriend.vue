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
  }
]
</script>

<template>
  <div class="container pt-24">
    <p class="title">Family and Friends</p>
    <p class="mt-8">
      Family and Friends là khóa giảng dạy tiếng Anh căn bản bán chạy nhất mọi thời đại của nhà xuất bản Oxford, đã giúp hàng
      triệu học sinh trên toàn thế giới thành công với tiếng Anh. Chương trinh bao gồm các học phần mới giới thiệu ngôn ngữ chức
      năng được sử dụng hàng ngày để học sinh có thể tạo dựng những cuộc hội thoại ngay từ khi bắt đầu học. Đó thường là những dự
      án thực tế, hoạt động thủ công thú vị,khuyến khích người tham gia thực hành kỹ năng nói. Học sinh có hể thực hành tương tác
      với nhau sử dụng các cấu trúc ngữ pháp, từ vựng và cả 4 kỹ năng tính. Family and Friends - ấn bản thứ 2 bao gồm các nội dung
      giúp nâng cao sự thông thạo tiếng Anh thực hành với sự hỗ trợ của đĩa DVD, thực hành tương tác trực tuyến, cập nhật tài liệu
      đánh giá và kiểm tra năng lực và các học phần bổ sung tập trung vào văn hóa
    </p>
    <div class="grid grid-cols-3 gap-16 mt-10">
      <div v-for="(item, index) in items" :key="index">
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
  </div>
</template>

<style scoped></style>
