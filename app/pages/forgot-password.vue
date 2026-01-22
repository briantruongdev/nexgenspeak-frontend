<script setup lang="ts">
import { forgotPassword, type IFormForgotPassword } from '~/schemas/auth.schema'

definePageMeta({ layout: 'auth' })
const { t } = useI18n()

const { schema } = useSchema(forgotPassword)
const showOldPass = ref(false)
const showNewPass = ref(false)
const showConfirmPass = ref(false)

const form = ref<IFormForgotPassword>({
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: ''
})
</script>

<template>
  <UiAuthLayout :sub-title="t('auth.forgotPassword')">
    <UForm ref="formRef" :schema :state="form" class="space-y-6 max-sm:space-y-8 max-md:space-y-10">
      <UFormField name="oldPassword" class="w-full">
        <UInput
          v-model="form.oldPassword"
          :placeholder="t('auth.oldPassword')"
          :type="showOldPass ? 'text' : 'password'"
          class="w-full"
          :ui="{ trailing: 'pe-1', base: 'h-10 max-sm:h-11 max-md:h-12 bg-transparent' }"
        >
          <template #trailing>
            <UButton
              color="neutral"
              variant="link"
              size="sm"
              :icon="showOldPass ? 'i-lucide-eye-off' : 'i-lucide-eye'"
              @click="showOldPass = !showOldPass"
            />
          </template>
        </UInput>
      </UFormField>

      <UFormField name="newPassword" class="w-full">
        <UInput
          v-model="form.newPassword"
          :placeholder="t('auth.newPassword')"
          :type="showNewPass ? 'text' : 'password'"
          class="w-full"
          :ui="{ trailing: 'pe-1', base: 'h-10 max-sm:h-11 max-md:h-12 bg-transparent' }"
        >
          <template #trailing>
            <UButton
              color="neutral"
              variant="link"
              size="sm"
              :icon="showNewPass ? 'i-lucide-eye-off' : 'i-lucide-eye'"
              @click="showNewPass = !showNewPass"
            />
          </template>
        </UInput>
      </UFormField>

      <UFormField name="confirmNewPassword" class="w-full">
        <UInput
          v-model="form.confirmNewPassword"
          :placeholder="t('auth.confirmNewPassword')"
          :type="showConfirmPass ? 'text' : 'password'"
          class="w-full"
          :ui="{ trailing: 'pe-1', base: 'h-10 max-sm:h-11 max-md:h-12 bg-transparent' }"
        >
          <template #trailing>
            <UButton
              color="neutral"
              variant="link"
              size="sm"
              :icon="showConfirmPass ? 'i-lucide-eye-off' : 'i-lucide-eye'"
              @click="showConfirmPass = !showConfirmPass"
            />
          </template>
        </UInput>
      </UFormField>

      <BaseButton
        :text="t('auth.confirm')"
        class="w-full"
        class-name="h-10 max-sm:h-11 max-md:h-12"
        class-text="text-base max-sm:text-lg"
      />
      <BaseButton
        :text="t('auth.cancel')"
        class="w-full"
        variant="outline"
        class-name="h-10 max-sm:h-11 max-md:h-12"
        class-text="text-base max-sm:text-lg"
      />
    </UForm>
  </UiAuthLayout>
</template>

<style scoped></style>
