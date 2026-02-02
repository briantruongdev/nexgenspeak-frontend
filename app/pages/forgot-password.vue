<script setup lang="ts">
import { forgotPassword } from '~/schemas/auth.schema'

definePageMeta({ layout: 'auth', middleware: 'guest' })
const { t } = useI18n()

const { schema } = useSchema(forgotPassword)
const { isProcessing, formResetPassword, canResetPassword, handleResetPassword } = useAuth()
const showPass = ref(false)
const showConfirmPass = ref(false)
const passwordFocused = ref(false)
const formRef = ref()

function checkStrength(str: string) {
  const requirements = [
    { regex: /.{8,}/, text: t('auth.atLeast8Characters') },
    { regex: /\d/, text: t('auth.atLeast1Number') },
    { regex: /[a-z]/, text: t('auth.atLeast1LowercaseLetter') },
    { regex: /[A-Z]/, text: t('auth.atLeast1UppercaseLetter') },
    { regex: /[^A-Za-z0-9]/, text: t('auth.atLeast1SpecialCharacter') }
  ]

  return requirements.map(req => ({ met: req.regex.test(str), text: req.text }))
}

const strength = computed(() => checkStrength(formResetPassword.value.newPassword as string))
const score = computed(() => strength.value.filter(req => req.met).length)

const color = computed(() => {
  if (score.value === 0) return 'neutral'
  if (score.value < 3) return 'error'
  if (score.value < 5) return 'warning'
  return 'success'
})

const text = computed(() => {
  if (score.value === 0) return t('auth.enter-a-password')
  if (score.value < 3) return t('auth.weak-password')
  if (score.value < 5) return t('auth.medium-password')
  return t('auth.strong-password')
})

async function resetPassword() {
  const isValid = await formRef.value?.validate()
  if (isValid && canResetPassword.value) {
    await handleResetPassword()
  }
}
</script>

<template>
  <UiAuthLayout :sub-title="t('auth.forgotPassword')">
    <UForm ref="formRef" :schema :state="formResetPassword" class="space-y-6 max-sm:space-y-8 max-md:space-y-10">
      <UFormField name="email">
        <UInput
          v-model="formResetPassword.email"
          :placeholder="t('auth.email')"
          :ui="{ base: 'h-12 bg-transparent' }"
          class="w-full"
        />
      </UFormField>

      <!-- Password -->
      <UFormField name="newPassword" class="w-full">
        <UInput
          ref="passwordRef"
          v-model="formResetPassword.newPassword"
          :placeholder="t('auth.newPassword')"
          :type="showPass ? 'text' : 'password'"
          class="w-full"
          :ui="{ trailing: 'pe-1', base: 'h-12 bg-transparent' }"
          @focus="passwordFocused = true"
          @blur="passwordFocused = false"
        >
          <template #trailing>
            <UButton color="neutral" variant="link" size="sm" @click="showPass = !showPass" />
          </template>
        </UInput>
      </UFormField>

      <div v-if="passwordFocused && formResetPassword.newPassword" class="space-y-2">
        <UProgress :color="color" :indicator="text" :model-value="score" :max="5" size="sm" />

        <p id="password-strength" class="text-sm font-medium">{{ text }}. {{ t('auth.mustContain') }}:</p>

        <ul class="space-y-1">
          <li
            v-for="(req, index) in strength"
            :key="index"
            class="flex items-center gap-0.5"
            :class="req.met ? 'text-success' : 'text-error'"
          >
            <UIcon :name="req.met ? 'i-lucide-circle-check' : 'i-lucide-circle-x'" class="size-4 shrink-0" />
            <span class="text-xs font-light">{{ req.text }}</span>
          </li>
        </ul>
      </div>

      <!-- Confirm Password -->
      <UFormField name="confirmNewPassword" class="w-full">
        <UInput
          id="confirmNewPassword"
          ref="confirmPasswordRef"
          v-model="formResetPassword.confirmNewPassword"
          :placeholder="t('auth.confirmNewPassword')"
          :type="showConfirmPass ? 'text' : 'password'"
          class="w-full"
          :ui="{ trailing: 'pe-1', base: 'h-12 bg-transparent' }"
          @keyup.enter="resetPassword"
        >
          <template #trailing>
            <UButton color="neutral" variant="link" size="sm" @click="showPass = !showPass" />
          </template>
        </UInput>
      </UFormField>

      <BaseButton
        :text="t('auth.confirm')"
        class="w-full"
        class-name="h-10 max-sm:h-11 max-md:h-12"
        class-text="text-base max-sm:text-lg"
        :loading="isProcessing"
        :disabled="isProcessing || !canResetPassword"
        @click="resetPassword"
      />
      <BaseButton
        :text="t('auth.cancel')"
        class="w-full"
        variant="outline"
        class-name="h-10 max-sm:h-11 max-md:h-12"
        class-text="text-base max-sm:text-lg"
        @click="navigateTo('/login')"
      />
    </UForm>
  </UiAuthLayout>
</template>

<style scoped></style>
