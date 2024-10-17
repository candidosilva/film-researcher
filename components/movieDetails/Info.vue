<template>
  <div class="ml-4 flex-1">
    <h1 class="text-3xl mb-1">{{ movie.title }}</h1>
    <p class="text-zinc-400">
      {{ movie.release_date }} - {{ movie.runtime }} - {{ movie.budget }}
    </p>

    <div class="flex gap-4 mt-4">
      <div
        v-for="(genre, index) in movie.genres"
        :key="index"
        class="border border-white rounded-full px-4 py-1"
      >
        {{ genre.name }}
      </div>
    </div>

    <MovieDetailsVoteAverage :vote-average="movie.vote_average" class="mt-6" />

    <p class="mt-6">{{ movie.overview }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps({ movie: Object });
</script>
