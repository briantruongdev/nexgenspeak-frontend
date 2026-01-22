<script setup lang="ts">
import { loginSchema, type IFormLogin } from '~/schemas/auth.schema'

definePageMeta({ layout: 'auth' })
const { t } = useI18n()

const { schema } = useSchema(loginSchema)
const showPass = ref(false)

const form = ref<IFormLogin>({
  userName: '',
  password: ''
})
</script>

<template>
  <UiAuthLayout sub-title="Đăng nhập vào NexGen Speak">
    <UForm ref="formRef" :schema :state="form" class="space-y-6 max-sm:space-y-8 max-md:space-y-10">
      <UFormField name="userName">
        <UInput v-model="form.userName" :placeholder="t('auth.userName')" :ui="{ base: 'h-12 bg-transparent' }" class="w-full" />
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
      <BaseButton :text="$t('header.login')" class="w-full" class-name="h-12" class-text="text-lg" />
    </UForm>
    <div class="mt-4 flex justify-between items-center max-xl:flex-col max-xl:gap-4">
      <p class="font-bold text-sm">
        <span class="text-primary hover:cursor-pointer hover:underline">Quên Tên đăng nhập?</span> hoặc
        <span class="text-primary hover:cursor-pointer hover:underline" @click="navigateTo('/forgot-password')">Mật Khẩu?</span>
      </p>
      <p class="text-sm font-bold">
        Bạn chưa đăng ký tài khoản?
        <span class="text-primary hover:cursor-pointer hover:underline" @click="navigateTo('/register')">Đăng ký</span>
      </p>
    </div>
    <div class="flex justify-between items-center mt-12 max-xl:flex-col max-xl:gap-8">
      <div
        class="py-4 px-8 flex items-center w-fit gap-4 bg-[#EDEFF0] rounded-2xl hover:scale-102 transform duration-200 hover:cursor-pointer hover:opacity-80"
      >
        <BaseIcon name="google" size="28" />
        <p class="text-lg font-bold max-xl:text-base">Đăng nhập bằng Google</p>
      </div>
      <div
        class="py-4 px-8 flex w-fit items-center gap-4 bg-[#EDEFF0] rounded-2xl hover:scale-102 transform duration-200 hover:cursor-pointer hover:opacity-80"
      >
        <BaseIcon name="face" size="28" />
        <p class="text-lg font-bold max-xl:text-base">Đăng nhập bằng Facebook</p>
      </div>
    </div>
  </UiAuthLayout>
</template>

<style scoped></style>
