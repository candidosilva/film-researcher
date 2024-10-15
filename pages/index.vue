<template>
  <main class="flex flex-col container mx-auto">
    <h1 class="mt-16 text-3xl mb-6">Featured today</h1>

    <HomeMovieCards :movies="movies?.results" />

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
        :class="{ 'bg-gray-700 text-white': page === item }"
        class="flex items-center justify-center px-4 h-10 border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
        :disabled="page === item"
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
  </main>
</template>

<script setup lang="ts">
import { useDateFormat, useOffsetPagination } from "@vueuse/core";

const runtimeConfig = useRuntimeConfig();
const messageStore = useMessageStore();
const page: Ref<number> = ref(1);
const params = computed(() => {
  return { page: page.value, api_key: runtimeConfig.public.apiKey };
});
const { data: movies } = await useFetch<any>(
  `https://api.themoviedb.org/3/discover/movie`,
  {
    params,
    transform(input) {
      return {
        ...input,
        total_results: input.total_results > 200 ? 200 : input.total_results,
        results: input.results.map((movie: any) => {
          return {
            ...movie,
            release_date: useDateFormat(
              new Date(movie.release_date),
              "MMMM YYYY",
              { locales: "en-US" }
            ),
          };
        }),
      };
    },
    onResponseError({ request, response }) {
      messageStore.showMessage = true;
      messageStore.message = response.statusText;
    },
  }
);

const { currentPage, pageCount, isFirstPage, isLastPage, prev, next } =
  useOffsetPagination({
    total: movies.value.total_results,
    page: 1,
    pageSize: 20,
    onPageChange: changePage,
    onPageSizeChange: changePage,
  });

function changePage() {
  page.value = currentPage.value;
}
</script>
