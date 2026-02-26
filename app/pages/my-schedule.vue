<script setup lang="ts">
import { getPaginationRowModel, type Column, type Row } from '@tanstack/vue-table'
import { ScheduleStatusEnum } from '~/types/constant.type'
import type { ISlot } from '~/types/registration.type'
import { refDebounced } from '@vueuse/core'

const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const table = useTemplateRef('table')
const { data: listSchedule, pending, refresh } = useSchedule()
const { cancelBooking } = useRegistration()
interface FlattenedSlot extends ISlot {
  date: string
}
const { t } = useI18n()

definePageMeta({
  middleware: 'auth',
  layout: 'default'
})

useSeo({
  title: () => t('seo.pages.mySchedule.title'),
  description: () => t('seo.pages.mySchedule.description'),
  noindex: true
})

const SCHEDULE_STATUS = computed(() => [
  {
    label: t('mySchedule.status.all'),
    value: ScheduleStatusEnum.ALL
  },
  {
    label: t('mySchedule.status.studied'),
    value: ScheduleStatusEnum.COMPLETED
  },
  {
    label: t('mySchedule.status.today'),
    value: ScheduleStatusEnum.TODAY
  },
  {
    label: t('mySchedule.status.upcoming'),
    value: ScheduleStatusEnum.UPCOMING
  }
])

const isConfirmOpen = ref(false)
const slotDelete = ref<FlattenedSlot>()
const isLoading = ref(false)
const pagination = ref({
  pageIndex: 0,
  pageSize: 20
})
const filters = ref({
  search: '',
  status: ScheduleStatusEnum.UPCOMING
})
const searchDebounced = refDebounced(toRef(filters.value, 'search'), 300)

const matchesSearchFilter = (date: string, searchTerm: string): boolean => {
  if (!searchTerm) return true
  const formattedDate = new Date(date).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
  return formattedDate.includes(searchTerm)
}

const flattenedData = computed(() => {
  if (!listSchedule.value?.registrations) return []

  const result: FlattenedSlot[] = []
  listSchedule.value.registrations.forEach(registration => {
    registration.slots.forEach(slot => {
      result.push({
        ...slot,
        date: registration.date
      })
    })
  })

  return result.sort((a, b) => {
    const dateCompare = new Date(a.date).getTime() - new Date(b.date).getTime()
    if (dateCompare !== 0) return dateCompare
    return a.startTime.localeCompare(b.startTime)
  })
})

const filteredData = computed(() =>
  flattenedData.value.filter(
    item => matchesSearchFilter(item.date, searchDebounced.value) && matchesStatusFilter(item.date, filters.value.status)
  )
)

const columns = computed(() => {
  const baseColumns = [
    {
      accessorKey: 'date',
      header: ({ column }: { column: Column<FlattenedSlot, unknown> }) => getHeader(column, t('mySchedule.table.date')),
      cell: ({ row }: { row: Row<FlattenedSlot> }) => {
        return new Date(row.getValue('date')).toLocaleDateString('vi-VN', {
          weekday: 'short',
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        })
      }
    },
    {
      accessorKey: 'startTime',
      header: t('mySchedule.table.time'),
      cell: ({ row }: { row: Row<FlattenedSlot> }) => {
        const startTime = row.getValue('startTime') as string
        const endTime = row.original.endTime
        return `${startTime} - ${endTime}`
      }
    },
    {
      accessorKey: 'id',
      header: t('mySchedule.table.slot'),
      cell: ({ row }: { row: Row<FlattenedSlot> }) => t('mySchedule.table.slotNumber', { id: row.getValue('id') })
    },
    {
      accessorKey: 'teacher',
      header: t('mySchedule.table.teacher'),
      cell: ({ row }: { row: Row<FlattenedSlot> }) => {
        const teacher = row.getValue('teacher') as ISlot['teacher']
        return teacher.fullName
      }
    }
  ]

  const hasFutureSlot = filteredData.value.some(slot => !isBeforeToday(new Date(slot.date)))

  if (hasFutureSlot) {
    baseColumns.push({
      accessorKey: 'actions',
      header: t('mySchedule.table.actions'),
      cell: () => ''
    })
  }

  return baseColumns
})

function getHeader(column: Column<FlattenedSlot>, label: string) {
  const isSorted = column.getIsSorted()

  return h(
    UDropdownMenu,
    {
      content: {
        align: 'start'
      },
      'aria-label': 'Actions dropdown',
      items: [
        {
          label: t('mySchedule.sort.asc'),
          type: 'checkbox',
          icon: 'i-lucide-arrow-up-narrow-wide',
          checked: isSorted === 'asc',
          onSelect: () => {
            if (isSorted === 'asc') {
              column.clearSorting()
            } else {
              column.toggleSorting(false)
            }
          }
        },
        {
          label: t('mySchedule.sort.desc'),
          icon: 'i-lucide-arrow-down-wide-narrow',
          type: 'checkbox',
          checked: isSorted === 'desc',
          onSelect: () => {
            if (isSorted === 'desc') {
              column.clearSorting()
            } else {
              column.toggleSorting(true)
            }
          }
        }
      ]
    },
    () =>
      h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        label,
        icon: isSorted
          ? isSorted === 'asc'
            ? 'i-lucide-arrow-up-narrow-wide'
            : 'i-lucide-arrow-down-wide-narrow'
          : 'i-lucide-arrow-up-down',
        class: '-mx-2.5 data-[state=open]:bg-elevated',
        'aria-label': `Sort by ${isSorted === 'asc' ? 'descending' : 'ascending'}`
      })
  )
}

const handleCancelSchedule = async (slot?: FlattenedSlot) => {
  if (slot?.id) {
    slotDelete.value = slot
    isConfirmOpen.value = true
    return
  }
  try {
    isLoading.value = true
    const data = {
      registrationId: slotDelete.value!.registrationId,
      slotIds: [slotDelete.value!.id]
    }
    await cancelBooking(data)
    await refresh()
    isConfirmOpen.value = false
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="container mx-auto py-8 max-xl:px-6">
    <div class="mb-6">
      <h1 class="text-3xl font-bold">{{ t('mySchedule.title') }}</h1>
      <p class="text-gray-600 mt-2">{{ t('mySchedule.description') }}</p>
    </div>

    <UCard>
      <div class="flex gap-4 mb-4">
        <BaseInput
          v-model="filters.search"
          :placeholder="t('search')"
          class="w-1/4 max-lg:w-1/3 max-sm:w-full"
          icon="i-lucide-search"
          :is-show-clear="true"
        />
        <BaseSelectMenu
          v-model="filters.status"
          :items="SCHEDULE_STATUS"
          value-key="value"
          label-key="label"
          :placeholder="t('status')"
          class="w-1/6 max-lg:w-1/4 max-sm:w-full"
        />
      </div>
      <div class="max-sm:hidden">
        <UTable
          ref="table"
          v-model:pagination="pagination"
          :pagination-options="{
            getPaginationRowModel: getPaginationRowModel()
          }"
          :data="filteredData"
          :columns="columns"
          :loading="pending"
          loading-color="primary"
          loading-animation="carousel"
          :ui="{
            root: 'min-w-full',
            td: 'py-4'
          }"
        >
          <template #actions-cell="{ row }">
            <UButton
              v-if="!isBeforeToday(new Date(row.original.date))"
              color="error"
              variant="soft"
              size="sm"
              icon="i-lucide-trash-2"
              class="hover:cursor-pointer"
              :loading="isLoading"
              @click="handleCancelSchedule(row.original)"
            >
              {{ t('mySchedule.actions.cancel') }}
            </UButton>
          </template>

          <template #empty>
            <div v-if="!pending" class="flex flex-col items-center justify-center py-12">
              <UIcon name="i-lucide-calendar-x" class="w-12 h-12 text-gray-400 mb-4" />
              <p class="text-gray-500">{{ t('mySchedule.empty') }}</p>
            </div>
          </template>
        </UTable>
        <div v-if="filteredData.length" class="flex justify-end border-t border-default pt-4 px-4 max-sm:border-none">
          <UPagination
            :page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
            :items-per-page="table?.tableApi?.getState().pagination.pageSize"
            :total="table?.tableApi?.getFilteredRowModel().rows.length"
            @update:page="p => table?.tableApi?.setPageIndex(p - 1)"
          />
        </div>
      </div>
      <div class="hidden max-sm:block">
        <div v-if="isLoading" class="flex flex-col space-y-4 items-center my-8">
          <UIcon name="i-lucide-loader" class="animate-spin size-10 text-primary" />
          <span class="text-gray-500">{{ $t('mySchedule.loading') }}</span>
        </div>
        <template v-else-if="filteredData.length">
          <div v-for="item in filteredData" :key="item.id">
            <UCollapsible :unmount-on-hide="false" class="flex flex-col gap-2">
              <div class="group flex justify-between items-center hover:cursor-pointer border-b border-border-primary py-2">
                <div class="flex justify-between w-2/3 max-[500px]:hidden">
                  <span>{{ item.date }}</span>

                  <p class="flex space-x-1 items-center">
                    <span class="text-[#667085] text-sm">{{ t('mySchedule.table.time') }}: </span>
                    <span> {{ item.startTime }} - {{ item.endTime }}</span>
                  </p>
                </div>
                <span class="max-[500px]:block hidden">{{ item.date }}</span>
                <UIcon
                  name="i-lucide-chevron-right"
                  class="size-5 group-data-[state=open]:rotate-90 transition-transform duration-200"
                />
              </div>
              <template #content>
                <div class="space-y-2 border-b border-border-primary pb-2">
                  <p class="flex justify-between items-center">
                    <span class="text-[#667085] text-sm">{{ t('mySchedule.table.slot') }}</span>
                    <span>#{{ item.id }}</span>
                  </p>
                  <p class="justify-between items-center max-[500px]:flex hidden">
                    <span class="text-[#667085] text-sm">{{ t('mySchedule.table.time') }}: </span>
                    <span> {{ item.startTime }} - {{ item.endTime }}</span>
                  </p>
                  <p class="flex justify-between items-center">
                    <span class="text-[#667085] text-sm">{{ t('mySchedule.table.teacher') }}</span>
                    <span>{{ item.teacher.fullName }}</span>
                  </p>
                  <div v-if="!isBeforeToday(new Date(item.date))" class="flex justify-between items-center">
                    <span class="text-[#667085] text-sm">{{ t('mySchedule.table.actions') }}</span>
                    <UButton
                      color="error"
                      variant="soft"
                      size="sm"
                      icon="i-lucide-trash-2"
                      class="hover:cursor-pointer"
                      :loading="isLoading"
                      @click="handleCancelSchedule(item)"
                    >
                      {{ t('mySchedule.actions.cancel') }}
                    </UButton>
                  </div>
                </div>
              </template>
            </UCollapsible>
          </div>
          <div class="flex justify-end border-t border-default pt-4 px-4 max-sm:border-none">
            <UPagination
              :page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
              :items-per-page="table?.tableApi?.getState().pagination.pageSize"
              :total="table?.tableApi?.getFilteredRowModel().rows.length"
              @update:page="p => table?.tableApi?.setPageIndex(p - 1)"
            />
          </div>
        </template>
        <UiEmpty v-else />
      </div>
    </UCard>
    <UiConfirmModal
      v-model:open="isConfirmOpen"
      variant="danger"
      :title="t('cancel-slot')"
      :description="
        t('mySchedule.confirmCancel', { id: slotDelete?.id, startTime: slotDelete?.startTime, endTime: slotDelete?.endTime })
      "
      :confirm-text="t('delete')"
      :cancel-text="t('cancel')"
      :is-loading="isLoading"
      @confirm="handleCancelSchedule()"
    />
  </div>
</template>
