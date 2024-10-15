<template>
    <div class="mt-4 mb-16 flex mx-auto">
      <button
        class="flex items-center justify-center px-4 h-10 border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
        :disabled="isFirstPage"
        @click="prev"
      >
        prev
      </button>
      <button
        v-for="item in pageCount"
        :key="item"
        :class="model === item ? 'bg-gray-700 text-white' : 'bg-gray-800 text-gray-400'"
        class="flex items-center justify-center px-4 h-10 border  border-gray-700  hover:bg-gray-700 hover:text-white"
        :disabled="model === item"
        @click="currentPage = item"
      >
        {{ item }}
      </button>
      <button
        class="flex items-center justify-center px-4 h-10 border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
        :disabled="isLastPage"
        @click="next"
      >
        next
      </button>
    </div>
</template>

<script setup lang="ts">
import { useOffsetPagination } from '@vueuse/core';

interface Props {
  totalResults?: number 
}
const { totalResults = 0 } = defineProps<Props>();
const model = defineModel<number>()

const { currentPage, pageCount, isFirstPage, isLastPage, prev, next } =
  useOffsetPagination({
    total: totalResults,
    page: 1,
    pageSize: 20,
    onPageChange: changePage,
    onPageSizeChange: changePage,
  });

function changePage() {
    model.value = currentPage.value;
}
</script>