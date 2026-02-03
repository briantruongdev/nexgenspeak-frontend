<script setup lang="ts">
import { registerSchema } from '~/schemas/auth.schema'

definePageMeta({ layout: 'auth', middleware: 'guest' })
const { t } = useI18n()
const { isProcessing, formRegister, canRegister, handleRegister } = useAuth()
const { schema } = useSchema(registerSchema)
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

const strength = computed(() => checkStrength(formRegister.value.password as string))
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

async function register() {
  const isValid = await formRef.value?.validate()
  if (isValid && canRegister.value) {
    await handleRegister()
  }
}
</script>

<template>
  <UiAuthLayout :sub-title="t('auth.registerAccount')">
    <UForm ref="formRef" :schema :state="formRegister" class="space-y-6 max-sm:space-y-4">
      <UFormField name="email">
        <UInput
          v-model="formRegister.email"
          :placeholder="t('auth.email')"
          :ui="{ base: 'h-12 bg-transparent' }"
          class="w-full"
        />
      </UFormField>

      <UFormField name="phone">
        <UInput
          v-model="formRegister.phone"
          :placeholder="t('auth.phone')"
          :ui="{ base: 'h-12 bg-transparent' }"
          class="w-full"
        />
      </UFormField>

      <!-- Password -->
      <UFormField name="password" class="w-full">
        <UInput
          ref="passwordRef"
          v-model="formRegister.password"
          :placeholder="t('auth.password')"
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

      <div v-if="passwordFocused && formRegister.password" class="space-y-2">
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
      <UFormField name="confirmPassword" class="w-full">
        <UInput
          id="confirmPassword"
          ref="confirmPasswordRef"
          v-model="formRegister.confirmPassword"
          :placeholder="t('auth.confirmPassword')"
          :type="showConfirmPass ? 'text' : 'password'"
          class="w-full"
          :ui="{ trailing: 'pe-1', base: 'h-12 bg-transparent' }"
          @keyup.enter="register"
        >
          <template #trailing>
            <UButton color="neutral" variant="link" size="sm" @click="showPass = !showPass" />
          </template>
        </UInput>
      </UFormField>

      <BaseButton
        :text="$t('auth.confirm')"
        class="w-full"
        class-name="h-12"
        class-text="text-lg"
        :loading="isProcessing"
        :disabled="isProcessing || !canRegister"
        @click="register"
      />
    </UForm>
    <p class="text-sm font-bold mt-4 text-center">
      {{ t('auth.haveAccount') }}
      <span class="text-primary hover:cursor-pointer hover:underline" @click="navigateTo('/login')">{{ t('auth.login') }}</span>
    </p>
  </UiAuthLayout>
</template>

<style scoped></style>
