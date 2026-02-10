<script setup lang="ts">
const { isSlotModalVisible, selectedTeacherId, selectedSlotIds, isSlotSelected, handleSelectSlot } = useRegistration()
const { slots, isGettingSlots } = useTeacher()
const { isBooking } = useRegistration()
const { t } = useI18n()
const config = useRuntimeConfig()
const maxSlots = config.public.maxSlots

const emit = defineEmits<{
  booking: []
}>()
</script>

<template>
  <UModal
    v-model:open="isSlotModalVisible"
    :ui="{
      content: 'px-8 max-[450px]:h-[90vh] flex flex-col'
    }"
  >
    <template #content>
      <div class="py-6">
        <div v-if="isGettingSlots" class="flex flex-col space-y-4 items-center my-8 animate-pulse">
          <UIcon name="i-lucide-loader" class="animate-spin size-10 text-primary" />
          <span class="text-gray-500 animate-pulse">{{ t('booking.loadingSlots') }}</span>
        </div>
        <Transition name="slots-fade" mode="out-in">
          <div v-if="slots && slots.length > 0 && !isGettingSlots" lass="my-8 max-[450px]:my-4">
            <div class="mb-4 flex items-center justify-between">
              <p class="text-xl font-medium max-sm:text-sm">
                {{ t('booking.selectSlot') }} {{ t('booking.selectedSlots', { count: selectedSlotIds.length, max: maxSlots }) }}
              </p>
              <UButton
                v-if="selectedSlotIds.length > 0"
                color="error"
                variant="soft"
                size="sm"
                class="hover:cursor-pointer"
                @click="selectedSlotIds = []"
              >
                {{ $t('booking.clearAll') }}
              </UButton>
            </div>
            <div class="grid grid-cols-8 gap-4 max-lg:grid-cols-6 max-md:grid-cols-4 max-[450px]:grid-cols-3!">
              <div
                v-for="(item, index) in slots"
                :key="item.id"
                class="slot-item h-12 max-sm:h-10 text-center flex items-center justify-center text-base font-medium rounded-lg border transition-all duration-300 cursor-pointer select-none"
                :class="[
                  isSlotSelected(item.id)
                    ? 'bg-primary text-white border-primary shadow-lg scale-105 hover:scale-110'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-primary hover:shadow-md hover:scale-105'
                ]"
                :style="{ animationDelay: `${index * 30}ms` }"
                @click="handleSelectSlot(item.id)"
              >
                <span class="font-semibold max-sm:text-sm max-[450px]:text-xs!">{{ item.startTime }}-{{ item.endTime }}</span>
              </div>
            </div>
          </div>
        </Transition>
        <div v-if="selectedTeacherId && (!slots || slots.length === 0) && !isGettingSlots" class="my-8 text-center text-gray-500">
          <p>{{ t('booking.noSlotsAvailable') }}</p>
        </div>

        <Transition name="button-slide" appear>
          <div v-if="selectedSlotIds.length">
            <BaseButton
              :text="t('booking.bookLesson')"
              class="w-full h-12 mt-8 max-sm:mt-6 max-sm:h-10"
              :loading="isBooking"
              :disabled="isBooking"
              @click="emit('booking')"
            />
          </div>
        </Transition>
      </div>
    </template>
  </UModal>
</template>

<style scoped>
.button-slide-enter-active,
.button-slide-leave-active {
  transition: all 0.4s ease;
}

.button-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.button-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
