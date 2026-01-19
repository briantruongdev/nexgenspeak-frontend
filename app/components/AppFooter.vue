<script setup lang="ts">
const menuSections = [
  {
    title: 'Giới thiệu',
    links: [
      { name: 'Về chúng tôi', link: '#' },
      { name: 'Sứ mệnh & tầm nhìn', link: '#' },
      { name: 'Đội ngũ giảng viên', link: '#' },
      { name: 'Phương pháp giảng dạy', link: '#' },
      { name: 'Câu chuyện học viên', link: '#' }
    ]
  },
  {
    title: 'Hỗ trợ',
    links: [
      { name: 'Hướng dẫn đăng ký học', link: '#' },
      { name: 'Tư vấn lộ trình học', link: '#' },
      { name: 'Câu hỏi thường gặp (FAQ)', link: '#' },
      { name: 'Hỗ trợ kỹ thuật', link: '#' },
      { name: 'Liên hệ', link: '#' }
    ]
  },
  {
    title: 'Chính sách',
    links: [
      { name: 'Chính sách học phí', link: '#' },
      { name: 'Chính sách bảo lưu / hoàn tiền', link: '#' },
      { name: 'Chính sách quyền riêng tư', link: '#' },
      { name: 'Điều khoản sử dụng', link: '#' },
      { name: 'Chính sách bảo mật thông tin', link: '#' }
    ]
  },
  {
    title: 'Quyền lợi',
    links: [
      { name: 'Lộ trình học cá nhân hóa', link: '#' },
      { name: 'Học thử miễn phí', link: '#' },
      { name: 'Cam kết đầu ra', link: '#' },
      { name: 'Tài liệu học độc quyền', link: '#' },
      { name: 'Cộng đồng học viên', link: '#' }
    ]
  }
]
</script>
<template>
  <footer class="bg-primary px-32 py-12">
    <img src="/images/logo-white.png" alt="Logo" loading="lazy" class="w-40 hover:cursor-pointer" @click="navigateTo('/')" />
    <div class="grid grid-cols-[1fr_2fr] gap-8 mb-12 text-white">
      <div>
        <div class="flex gap-2 items-center">
          <BaseIcon name="earth" />
          <p class="flex items-center">
            <span class="text-white">VI</span>
            <BaseIcon name="arrow-up-down" class="inline-block ml-1" size="12" />
          </p>
          <USeparator orientation="vertical" class="h-6" />

          <span class="text-white"
            >Xem Website <br />
            NexGen Speak Việt Nam</span
          >
        </div>
        <div class="mt-10">
          <p class="flex gap-4 items-center">
            <BaseIcon name="phone-background" size="40" />
            <span class="text-white text-3xl font-bold">0888 884 638 </span>
          </p>
          <USeparator orientation="horizontal" class="w-2/3 mt-5 mb-9" />
          <p class="flex items-center gap-6">
            <BaseIcon name="face" size="40" />
            <BaseIcon name="insta" size="40" />
            <BaseIcon name="youtube" size="40" />
          </p>
        </div>
      </div>

      <div class="grid grid-cols-4 gap-8 text-white">
        <div v-for="(section, index) in menuSections" :key="index" class="space-y-3">
          <h3 class="font-bold text-base mb-8">{{ section.title }}</h3>
          <ul class="space-y-4 text-sm">
            <li v-for="(link, linkIndex) in section.links" :key="linkIndex">
              <a :href="link.link" class="hover:underline hover:opacity-80 transition-all">
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <USeparator orientation="horizontal" class="mb-8" />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-white">
      <div class="space-y-2">
        <p class="flex flex-wrap gap-2">
          <span>Số đó Website</span>
          <span>|</span>
          <span>Miễn trừ trách nhiệm</span>
        </p>
        <p>Chính sách bảo mật và bảo vệ dữ liệu cá nhân</p>
      </div>
      <div class="md:text-right">
        <p>© 2021 Bản quyền thuộc về Công ty TNHH CZen</p>
      </div>
    </div>
  </footer>
</template>

<style scoped></style>
