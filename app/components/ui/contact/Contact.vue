<script setup lang="ts">
const { t } = useI18n()

const items = computed(() => [
  {
    icon: '/images/map.png',
    value: t('contact.contactUs.address')
  },
  {
    icon: '/images/phone-call.png',
    value: '0888887798',
    type: 'tel'
  },
  {
    icon: '/images/mail.png',
    value: 'info@czen.io',
    type: 'mail'
  },
  {
    icon: '/images/facebook.png',
    value: t('contact.contactUs.facebook')
  }
])
</script>

<template>
  <div class="container pt-30 max-lg:pt-20 max-xl:px-6">
    <p class="title">{{ $t('contact.contactUs.title') }}</p>
    <p class="text-xl mt-7 max-sm:mt-4 max-lg:text-base">
      {{ $t('contact.contactUs.description') }}
    </p>
    <div class="mt-12 max-sm:mt-6 w-full">
      <p class="text-[42px] font-bold text-primary max-sm:text-3xl max-[500px]:text-2xl!">
        {{ $t('contact.contactUs.companyName') }}
      </p>
      <div class="space-y-8 mt-10 max-sm:space-y-4">
        <div v-for="(item, index) in items" :key="index" class="flex justify-start gap-4 items-start">
          <img :src="item.icon" alt="" class="w-10 h-10 object-cover" loading="lazy" />
          <a
            v-if="item.type === 'tel'"
            :href="`tel:+84 ${item.value}`"
            class="text-2xl font-medium hover:underline max-lg:text-lg hover:text-primary"
            >{{ item.value }}</a
          >
          <a
            v-else-if="item.type === 'mail'"
            :href="`mailto:${item.value}`"
            class="text-2xl font-medium hover:underline max-lg:text-lg hover:text-primary"
            >{{ item.value }}</a
          >
          <p v-else class="text-2xl font-medium max-lg:text-lg">{{ item.value }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
