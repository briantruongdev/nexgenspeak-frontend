<script setup lang="ts">
const { locale, t } = useI18n()

const menuSections = computed(() => [
  {
    title: t('footer.sections.introduction.title'),
    links: [
      { name: t('footer.sections.introduction.aboutUs'), link: '#' },
      { name: t('footer.sections.introduction.missionVision'), link: '#' },
      { name: t('footer.sections.introduction.teachingTeam'), link: '#' },
      { name: t('footer.sections.introduction.teachingMethod'), link: '#' },
      { name: t('footer.sections.introduction.studentStories'), link: '#' }
    ]
  },
  {
    title: t('footer.sections.support.title'),
    links: [
      { name: t('footer.sections.support.registrationGuide'), link: '#' },
      { name: t('footer.sections.support.learningPathConsultation'), link: '#' },
      { name: t('footer.sections.support.faq'), link: '#' },
      { name: t('footer.sections.support.technicalSupport'), link: '#' },
      { name: t('footer.sections.support.contact'), link: '#' }
    ]
  },
  {
    title: t('footer.sections.policies.title'),
    links: [
      { name: t('footer.sections.policies.tuitionPolicy'), link: '#' },
      { name: t('footer.sections.policies.reservationRefund'), link: '#' },
      { name: t('footer.sections.policies.privacyPolicy'), link: '#' },
      { name: t('footer.sections.policies.termsOfUse'), link: '#' },
      { name: t('footer.sections.policies.dataProtection'), link: '#' }
    ]
  },
  {
    title: t('footer.sections.benefits.title'),
    links: [
      { name: t('footer.sections.benefits.personalizedLearning'), link: '#' },
      { name: t('footer.sections.benefits.freeTrial'), link: '#' },
      { name: t('footer.sections.benefits.outputCommitment'), link: '#' },
      { name: t('footer.sections.benefits.exclusiveMaterials'), link: '#' },
      { name: t('footer.sections.benefits.studentCommunity'), link: '#' }
    ]
  }
])
</script>

<template>
  <footer class="bg-primary px-32 py-12 max-xl:p-6">
    <img src="/images/logo-white.png" alt="Logo" loading="lazy" class="w-40 hover:cursor-pointer" @click="navigateTo('/')" />
    <div class="grid grid-cols-[1fr_2fr] gap-8 mb-12 text-white max-lg:grid-cols-1">
      <div>
        <div class="flex gap-2 items-center w-fit">
          <BaseIcon name="earth" />
          <p class="flex items-center">
            <span class="text-white uppercase">{{ locale }}</span>
            <BaseIcon name="arrow-up-down" class="inline-block ml-1" size="12" />
          </p>
          <USeparator orientation="vertical" class="h-6" />

          <span class="text-white"
            >{{ $t('footer.viewWebsite') }} <br />
            {{ $t('footer.nexgenSpeakVietnam') }}</span
          >
        </div>
        <div class="mt-10">
          <p class="flex gap-4 items-center">
            <BaseIcon name="phone-background" size="40" />
            <span class="text-white text-3xl font-bold">0888 887 798 </span>
          </p>
          <USeparator orientation="horizontal" class="w-2/3 mt-5 mb-9" />
          <p class="flex items-center gap-6">
            <BaseIcon name="face" size="40" />
            <BaseIcon name="insta" size="40" />
            <!-- <BaseIcon name="youtube" size="40" class="text-white" /> -->
            <img src="/images/youtube.png" alt="" class="h-10" loading="lazy" />
          </p>
        </div>
      </div>

      <div class="grid grid-cols-4 gap-8 text-white max-md:grid-cols-2">
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
      <div class="flex flex-wrap gap-2 justify-center">
        <span>{{ $t('footer.disclaimer') }}</span>
        <span>|</span>
        <p>{{ $t('footer.privacyDataProtection') }}</p>
      </div>
      <div class="md:text-right max-md:text-center">
        <p>{{ $t('footer.copyright') }} <a href="https://czen.io" class="hover:underline" target="blank">https://czen.io</a></p>
      </div>
    </div>
  </footer>
</template>

<style scoped></style>
