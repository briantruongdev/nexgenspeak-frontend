<script setup lang="ts">
import { registerSchema, type IFormRegister } from '~/schemas/auth.schema'

definePageMeta({ layout: 'auth' })
const { t } = useI18n()

const { schema } = useSchema(registerSchema)
const showPass = ref(false)

const form = ref<IFormRegister>({
  phoneOrEmail: '',
  password: ''
})
const otp = ref('')
</script>

<template>
  <UiAuthLayout :sub-title="t('auth.registerAccount')">
    <UForm ref="formRef" :schema :state="form" class="space-y-6 max-sm:space-y-8 max-md:space-y-10">
      <UFormField name="phoneOrEmail">
        <UInput
          v-model="form.phoneOrEmail"
          :placeholder="t('auth.phoneOrEmail')"
          :ui="{ base: 'h-12 bg-transparent' }"
          class="w-full"
        />
      </UFormField>

      <UFormField name="password" class="w-full">
        <UInput
          v-model="form.password"
          :placeholder="t('auth.password')"
          :type="showPass ? 'text' : 'password'"
          class="w-full"
          :ui="{ trailing: 'pe-1', base: 'h-12 bg-transparent' }"
        >
          <template #trailing>
            <UButton
              color="neutral"
              variant="link"
              size="sm"
              :icon="showPass ? 'i-lucide-eye-off' : 'i-lucide-eye'"
              @click="showPass = !showPass"
            />
          </template>
        </UInput>
      </UFormField>
      <p class="font-bold">{{ t('auth.enterOtp') }}</p>
      <UFormField>
        <UInput v-model="otp" :ui="{ base: 'h-12 bg-transparent' }" />
      </UFormField>
      <BaseButton :text="$t('auth.confirm')" class="w-full" class-name="h-12" class-text="text-lg" />
    </UForm>
    <p class="text-sm font-bold mt-4 text-end">
      {{ t('auth.haveAccount') }}
      <span class="text-primary hover:cursor-pointer hover:underline" @click="navigateTo('/login')">{{ t('auth.login') }}</span>
    </p>
  </UiAuthLayout>
</template>

<style scoped></style>
