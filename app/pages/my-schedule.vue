<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { getPaginationRowModel, type Column } from '@tanstack/vue-table'
import type { ISlot } from '~/types/registration.type'

const { t } = useI18n()
const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const isConfirmOpen = ref(false)
const slotDelete = ref<FlattenedSlot>()

const table = useTemplateRef('table')
definePageMeta({
  middleware: 'auth',
  layout: 'default'
})

interface FlattenedSlot extends ISlot {
  date: string
}

const { data: listSchedule, cancelBooking } = useBooking()

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

const columns: TableColumn<FlattenedSlot>[] = [
  {
    accessorKey: 'date',
    header: ({ column }) => getHeader(column, 'Ngày học'),
    cell: ({ row }) => {
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
    header: 'Thời gian',
    cell: ({ row }) => {
      const startTime = row.getValue('startTime') as string
      const endTime = row.original.endTime
      return `${startTime} - ${endTime}`
    }
  },
  {
    accessorKey: 'id',
    header: 'Ca học',
    cell: ({ row }) => `Ca #${row.getValue('id')}`
  },
  {
    accessorKey: 'teacher',
    header: 'Giáo viên',
    cell: ({ row }) => {
      const teacher = row.getValue('teacher') as ISlot['teacher']
      return teacher.fullName
    }
  },
  // {
  //   accessorKey: 'teacher.position',
  //   header: 'Chuyên môn',
  //   cell: ({ row }) => {
  //     const teacher = row.original.teacher
  //     return teacher.position
  //   }
  // },
  {
    id: 'actions',
    header: 'Thao tác',
    meta: {
      class: {
        th: 'text-center',
        td: 'text-center'
      }
    }
  }
]

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
          label: 'Asc',
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
          label: 'Desc',
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
const isLoading = ref(false)
const pagination = ref({
  pageIndex: 0,
  pageSize: 5
})

const globalFilter = ref('')
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
    isConfirmOpen.value = false
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="container mx-auto py-8 px-4">
    <div class="mb-6">
      <h1 class="text-3xl font-bold">Lịch học của tôi</h1>
      <p class="text-gray-600 mt-2">Quản lý và theo dõi lịch học của bạn</p>
    </div>

    <UCard>
      <UTable
        ref="table"
        v-model:pagination="pagination"
        v-model:global-filter="globalFilter"
        :pagination-options="{
          getPaginationRowModel: getPaginationRowModel()
        }"
        :data="flattenedData"
        :columns="columns"
        :loading="isLoading"
        loading-color="primary"
        loading-animation="carousel"
        :ui="{
          root: 'min-w-full',
          td: 'py-4'
        }"
      >
        <template #actions-cell="{ row }">
          <UButton
            color="error"
            variant="soft"
            size="sm"
            icon="i-lucide-trash-2"
            class="hover:cursor-pointer"
            :loading="isLoading"
            @click="handleCancelSchedule(row.original)"
          >
            Hủy
          </UButton>
        </template>

        <template #empty>
          <div class="flex flex-col items-center justify-center py-12">
            <UIcon name="i-lucide-calendar-x" class="w-12 h-12 text-gray-400 mb-4" />
            <p class="text-gray-500">Bạn chưa có lịch học nào</p>
          </div>
        </template>
      </UTable>
      <div class="flex justify-end border-t border-default pt-4 px-4">
        <UPagination
          :page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
          :items-per-page="table?.tableApi?.getState().pagination.pageSize"
          :total="table?.tableApi?.getFilteredRowModel().rows.length"
          @update:page="p => table?.tableApi?.setPageIndex(p - 1)"
        />
      </div>
    </UCard>
    <UiConfirmModal
      v-model:open="isConfirmOpen"
      variant="danger"
      :title="t('cancel-slot')"
      :description="`Bạn có chắc chắn muốn hủy ca học #${slotDelete?.id} vào lúc ${slotDelete?.startTime} - ${slotDelete?.endTime}?`"
      :confirm-text="t('delete')"
      :cancel-text="t('cancel')"
      :is-loading="isLoading"
      @confirm="handleCancelSchedule()"
    />
  </div>
</template>
