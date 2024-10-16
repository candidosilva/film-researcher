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
      :class="
        currentPage === item
          ? 'bg-gray-700 text-white'
          : 'bg-gray-800 text-gray-400'
      "
      class="flex items-center justify-center px-4 h-10 border border-gray-700 hover:bg-gray-700 hover:text-white"
      :disabled="currentPage === item"
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
import { useOffsetPagination } from "@vueuse/core";

const props = defineProps({
  totalResults: { type: Number, default: 1 },
});

const moviesStore = useMoviesStore();
const { currentPage, pageCount, isFirstPage, isLastPage, prev, next } =
  useOffsetPagination({
    total: props.totalResults,
    page: 1,
    pageSize: 20,
    onPageChange: changePage,
  });

function changePage() {
  moviesStore.page = currentPage.value;
  moviesStore.searchMovies();
}
</script>
