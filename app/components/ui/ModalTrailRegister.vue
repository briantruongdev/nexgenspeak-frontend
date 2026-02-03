<script setup lang="ts">
import { trialRegisterSchema } from '~/schemas/trial-register.schema'

const {
  isTrialRegisterModalVisible,
  isProcessing,
  form,
  englishLevelOptions,
  canTrailRegister,
  agreePolicy,
  showPolicy,
  resetForm,
  onSubmit
} = useTrialRegister()

const formRef = ref()
const { schema } = useSchema(trialRegisterSchema)
const { t } = useI18n()

const handleSubmit = async () => {
  const isValid = await formRef.value?.validate()
  if (isValid && canTrailRegister.value) {
    await onSubmit()
  }
}
</script>

<template>
  <UModal
    v-model:open="isTrialRegisterModalVisible"
    :title="t('trialRegister.title')"
    class="w-1/2 max-lg:w-10/12"
    :ui="{ close: 'hover:cursor-pointer' }"
    @update:open="resetForm"
  >
    <template #body>
      <!-- <p class="text-sm mb-2 text-info">
        NexGen Speak cam kết sử dụng thông tin vào mục đích tư vấn lộ trình học và không kinh doanh dưới mọi hình thức.
      </p> -->
      <UForm ref="formRef" :schema="schema" :state="form" @submit="handleSubmit">
        <div class="grid grid-cols-2 gap-6 max-md:grid-cols-1">
          <UFormField :label="t('trialRegister.name')" name="name" required>
            <BaseInput v-model="form.name" :placeholder="t('trialRegister.namePlaceholder')" class="w-full" />
          </UFormField>
          <UFormField :label="t('trialRegister.email')" name="email" required>
            <BaseInput v-model="form.email" :placeholder="t('trialRegister.emailPlaceholder')" type="email" class="w-full" />
          </UFormField>
          <UFormField :label="t('trialRegister.phone')" name="phone" required>
            <BaseInput v-model="form.phone" :placeholder="t('trialRegister.phonePlaceholder')" class="w-full" />
          </UFormField>

          <UFormField :label="t('trialRegister.englishLevel')" name="englishLevel" required>
            <BaseSelectMenu
              v-model="form.englishLevel"
              :items="englishLevelOptions"
              value-key="value"
              label-key="label"
              :placeholder="t('trialRegister.englishLevel')"
              class="w-full"
            />
          </UFormField>
        </div>
        <UCheckbox
          v-model="agreePolicy"
          required
          class="mt-6"
          :ui="{ root: 'flex justify-start items-start', base: 'hover:cursor-pointer' }"
        >
          <template #description>
            <p class="-mt-0.5">
              {{ t('trialRegister.iAgree') }} <i>{{ t('trialRegister.contact') }}</i> {{ t('trialRegister.purpose') }}
            </p></template
          ></UCheckbox
        >
        <p v-if="showPolicy" class="text-sm text-error mt-1">{{ t('trialRegister.policy') }}</p>
        <div class="flex justify-end w-full mt-6">
          <BaseButton
            type="submit"
            :text="t('trialRegister.submit')"
            :loading="isProcessing"
            :disabled="isProcessing || !canTrailRegister"
            class="w-full"
            trailing-icon="i-lucide-move-right"
            @click="handleSubmit"
          />
        </div>
      </UForm>
    </template>
  </UModal>
</template>

<style scoped></style>
