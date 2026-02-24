<script setup lang="ts">
const { t } = useI18n()

const items = computed(() => [
  {
    idx: 1,
    title: 'Học 1 kèm 1: 1 giáo viên giỏi chỉ dạy 1 học viên',
    des: 'Tận dụng tối đa 45 phút/ buổi học. Yếu chỗ nào tập trung chỗ đó. Giáo viên theo sát, khích lệ học viên.'
  },
  {
    idx: 2,
    title: 'Học Online tiện lợi: Chủ động thời gian, tiết kiệm chi phí',
    des: 'Tùy chọn ca học từ 9h sáng - 9h tối, không mất thời gian đi lại. Có thể học tăng cường. Được hủy ca học, bảo lưu đến 2 năm.'
  },
  {
    idx: 3,
    title: 'Học là dùng được: giáo trình và phương pháp tối ưu cho người đi làm',
    des: 'Tăng thời gian nghe nói, phản xạ, luyện phát âm x10 lần. Kỹ năng mềm (giao thiệp, thuyết trình, đàm phán, networking...) tiến bộ vượt bậc.'
  },
  {
    idx: 4,
    title: 'Đào tạo 4 kỹ năng bài bản - chuẩn Châu Âu CEFR và TOEIC',
    des: 'Đủ khả năng lấy IELTS 7.0+, TOEIC 800+ cho mục tiêu thăng tiến, nhảy việc, cao học, du học, định cư...'
  }
])

const aboutClass = computed(() => [
  {
    id: 1,
    image: '/images/plan1.png',
    title: 'LỚP HỌC ĐẢO NGƯỢC (FLIPPED LEARNING MODEL)',
    data: [
      'Học viên được tặng sách có bản quyền và hướng dẫn tự học trước buổi học kèm.',
      'Học 1 kèm 1 với giáo viên trong 45 phút, tập trung sửa lỗi và thực hành nghe nói.',
      'Làm bài tập về nhà, luyện các đề thi để giáo viên chấm điểm.'
    ]
  },
  {
    id: 2,
    image: '/images/plan2.png',
    title: 'CÁ NHÂN HOÁ HỌC TẬP (PERSONALIZED LEARNING)',
    data: [
      'Mỗi học viên 1 lộ trình riêng biệt dựa vào nhu cầu và bài kiểm tra đầu vào 4 kỹ năng.',
      'Giáo vụ giải đáp, bổ trợ kỹ năng yếu, chỉnh lộ trình và hướng giảng dạy cho từng học viên.',
      ' Báo cáo học tập cập nhật kịp thời, dễ dàng theo dõi trên điện thoại, máy tính.'
    ]
  },
  {
    id: 3,
    image: '/images/plan3.png',
    title: 'PHẦN MỀM HỌC TRỰC TUYẾN CHẤT LƯỢNG',
    data: [
      'Sử dụng phầm mềm Team hỗ trợ tối đa việc học trực tuyến.',
      ' Đường truyền ổn định; hình ảnh âm thanh sắc nét; tương tác được (khoanh, viết...) lên slide bài giảng.'
    ]
  },

  {
    id: 4,
    image: '/images/plan4.png',
    title: ' 100% GIÁO VIÊN CHẤT LƯỢNG',
    data: [
      'Tốt nghiệp Đại học và có bằng cấp giảng dạy tiếng Anh (TESOL, CELTA…)',
      'Nhiều năm kinh nghiệm dạy tiếng Anh trực tuyến',
      'Được đào tạo kỹ trước khi giảng dạy và thẩm định chất lượng thường xuyên'
    ]
  }
])
</script>

<template>
  <section class="bg-[#EEF0F1] py-16 max-lg:py-12 max-md:py-8">
    <div class="container max-xl:px-6">
      <p class="title">{{ t('studyPlan.learningMethod.title') }}</p>
      <p class="text-lg my-4 max-sm:text-base">
        {{ t('studyPlan.learningMethod.description') }}
      </p>
      <div class="space-y-6 max-[400px]:mb-6">
        <div v-for="(item, index) in items" :key="index" class="flex items-start gap-6 max-[450px]:gap-4">
          <div
            class="shrink-0 w-16 h-16 max-[600px]:w-10 max-[600px]:h-10 max-[600px]:text-xl flex items-center justify-center text-3xl font-bold border border-primary rounded-full text-primary"
          >
            {{ index + 1 }}
          </div>

          <div class="flex-1">
            <p class="text-xl font-medium max-sm:text-lg max-[400px]:text-base">
              {{ item.title }}
            </p>

            <p class="mt-2 text-gray-600 max-[400px]:text-sm">
              {{ item.des }}
            </p>
          </div>
        </div>
      </div>
      <!-- <div class="flex justify-center mt-12 max-lg:mt-8">
        <p class="w-2/3 justify-center text-lg font-medium text-center max-md:w-full max-sm:text-base max-[400px]:text-sm!">
          {{ t('studyPlan.learningMethod.footer') }}
        </p>
      </div> -->
      <div class="w-full flex justify-center py-10 max-[400px]:hidden">
        <div class="relative w-[900px] max-w-full h-[140px] max-[550px]:h-30! flex">
          <div class="w-3/5 rounded-l-full bg-white flex items-center pl-16 max-sm:pl-10 max-[450px]:pl-6!">
            <ul class="space-y-4 text-primary text-xl max-sm:text-base font-semibold max-sm:space-y-2 max-[550px]:text-xs!">
              <li class="flex items-center gap-4 max-[450px]:gap-2">
                <span>✓</span>
                <span>Phương pháp thực tế</span>
              </li>
              <li class="flex items-center gap-4 max-[450px]:gap-2">
                <span>✓</span>
                <span>Công nghệ thông minh</span>
              </li>
              <li class="flex items-center gap-4 max-[450px]:gap-2">
                <span>✓</span>
                <span>Giáo viên chất lượng</span>
              </li>
            </ul>
          </div>

          <div class="w-2/5 bg-primary rounded-r-full flex items-center justify-center text-white relative">
            <div class="text-center text-2xl max-md:text-xl max-sm:text-base max-[500px]:text-xs!">
              <p class="font-bold">HIỆU QUẢ RÕ RỆT</p>
              <p class="font-bold mt-2">TRONG 1 THÁNG</p>
            </div>
          </div>

          <div
            class="absolute left-3/5 top-0 -translate-x-1/2 h-full w-[80px] max-[500px]:w-14! bg-primary"
            style="clip-path: polygon(40% 0%, 100% 0%, 60% 50%, 100% 100%, 40% 100%, 0% 50%)"
          ></div>
        </div>
      </div>

      <div v-for="item in aboutClass" :key="item.id">
        <div class="grid grid-cols-2 gap-8 my-8 max-sm:hidden">
          <img v-if="item.id % 2 === 0" :src="item.image" loading="lazy" class="h-70 max-md:h-60 w-full object-cover" />
          <div>
            <p class="text-primary text-xl font-medium max-md:text-lg max-sm:text-base">{{ item.id }}. {{ item.title }}</p>
            <ul class="list-disc pl-4 mt-2">
              <li v-for="(_item, index) in item.data" :key="index" class="text-lg max-md:text-base max-sm:text-sm">
                {{ _item }}
              </li>
            </ul>
          </div>
          <img v-if="item.id % 2 !== 0" :src="item.image" loading="lazy" class="h-70 max-md:h-60 w-full object-cover" />
        </div>
        <div class="hidden max-sm:block mb-6 max-[450px]:mb-4!">
          <p class="text-primary text-xl font-medium max-[500px]:text-base!">{{ item.id }}. {{ item.title }}</p>
          <img :src="item.image" loading="lazy" class="h-40 w-full object-cover my-4" />
          <ul class="list-disc pl-4 mt-2">
            <li v-for="(_item, index) in item.data" :key="index" class="max-[500px]:text-sm!">
              {{ _item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
