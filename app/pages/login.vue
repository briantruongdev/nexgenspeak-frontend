<script setup lang="ts">
import { loginSchema } from '~/schemas/auth.schema'

definePageMeta({ layout: 'auth' })
const { t } = useI18n()

const { schema } = useSchema(loginSchema)
const { isProcessing, formLogin, canLogin, handleLogin } = useAuth()
const showPass = ref(false)
const formRef = ref()

const login = async () => {
  const isValid = await formRef.value?.validate()
  if (isValid && canLogin.value) {
    await handleLogin()
  }
}
</script>

<template>
  <UiAuthLayout :sub-title="t('auth.loginToNGS')">
    <UForm ref="formRef" :schema :state="formLogin" class="space-y-6 max-sm:space-y-8 max-md:space-y-10">
      <UFormField name="email">
        <UInput v-model="formLogin.email" :placeholder="t('auth.email')" :ui="{ base: 'h-12 bg-transparent' }" class="w-full" />
      </UFormField>

      <UFormField name="password" class="w-full">
        <UInput
          v-model="formLogin.password"
          :placeholder="t('auth.password')"
          :type="showPass ? 'text' : 'password'"
          class="w-full"
          :ui="{ trailing: 'pe-1', base: 'h-12 bg-transparent' }"
          @keyup.enter="login"
        >
          <template #trailing>
            <UButton color="neutral" variant="link" size="sm" @click="showPass = !showPass" />
          </template>
        </UInput>
      </UFormField>
      <BaseButton
        :text="$t('header.login')"
        class="w-full"
        class-name="h-12"
        :loading="isProcessing"
        :disabled="isProcessing || !canLogin"
        class-text="text-lg"
        @click="login"
      />
    </UForm>
    <div class="mt-4 flex justify-between items-center max-xl:flex-col max-xl:gap-4">
      <p class="font-bold text-sm">
        <span class="text-primary hover:cursor-pointer hover:underline">{{ t('auth.forgotUserName') }}</span> {{ t('or') }}
        <span class="text-primary hover:cursor-pointer hover:underline" @click="navigateTo('/forgot-password')">{{
          t('auth.password')
        }}</span>
      </p>
      <p class="text-sm font-bold">
        {{ t('auth.haveNotAccount') }}
        <span class="text-primary hover:cursor-pointer hover:underline" @click="navigateTo('/register')">{{
          t('auth.register')
        }}</span>
      </p>
    </div>
    <div class="flex justify-between items-center mt-12 max-xl:flex-col max-xl:gap-8">
      <div
        class="py-4 px-8 flex items-center w-fit gap-4 bg-[#EDEFF0] rounded-2xl hover:scale-102 transform duration-200 hover:cursor-pointer hover:text-primary"
      >
        <BaseIcon name="google" :size="28" />
        <p class="text-lg font-bold max-xl:text-base">{{ t('auth.loginByGG') }}</p>
      </div>
      <div
        class="py-4 px-8 flex w-fit items-center gap-4 bg-[#EDEFF0] rounded-2xl hover:scale-102 transform duration-200 hover:cursor-pointer hover:text-primary"
      >
        <BaseIcon name="face" :size="28" />
        <p class="text-lg font-bold max-xl:text-base">{{ t('auth.loginByFace') }}</p>
      </div>
    </div>
  </UiAuthLayout>
</template>

<style scoped></style>
