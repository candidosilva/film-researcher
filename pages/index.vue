<template>
  <main class="flex flex-col container mx-auto px-16 sm:px-0">
    <h1 class="mt-16 text-3xl mb-6">
      {{ moviesStore.moviesSearched ? "Movies searched" : "Featured today" }}
    </h1>

    <HomeMovieCardsSkeleton v-if="moviesStore.loading" />
    <HomeMovieCards v-else :movies="moviesStore.movies?.results" />

    <HomePagination
      :total-results="moviesStore.movies?.total_results"
      :key="moviesStore.movies?.total_results"
    />
  </main>
</template>

<script setup lang="ts">
const moviesStore = useMoviesStore();

onBeforeMount(() => {
  moviesStore.featureMovies();
});
</script>
