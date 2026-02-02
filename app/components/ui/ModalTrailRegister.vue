<script setup lang="ts">
import { trialRegisterSchema } from '~/schemas/trial-register.schema'

const { isTrialRegisterModalVisible, isProcessing, form, englishLevelOptions, onSubmit } = useTrialRegister()

const { schema } = useSchema(trialRegisterSchema)
const { t } = useI18n()
</script>

<template>
  <UModal v-model:open="isTrialRegisterModalVisible" :title="t('trialRegister.title')" class="w-1/2">
    <template #body>
      <UForm ref="formRef" :schema="schema" :state="form" @submit="onSubmit">
        <div class="grid grid-cols-2 gap-6">
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
      </UForm>
    </template>
    <template #footer>
      <div class="flex justify-end w-full">
        <BaseButton
          type="submit"
          :text="t('trialRegister.submit')"
          :loading="isProcessing"
          :disabled="isProcessing"
          class="w-full"
          trailing-icon="i-lucide-move-right"
          @click="onSubmit"
        />
      </div>
    </template>
  </UModal>
</template>

<style scoped></style>
