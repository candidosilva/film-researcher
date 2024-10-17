<template>
  <main class="flex flex-col container mx-auto px-6 sm:px-0 pb-14">
    <MovieDetailsPageSkeleton v-if="status !== 'success'" />

    <div v-else>
      <div class="flex flex-col sm:flex-row mt-0 sm:mt-16">
        <div class="flex flex-1">
          <NuxtImg
            :src="`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`"
            class="rounded-lg"
          />
        </div>

        <MovieDetailsInfo :movie />
      </div>

      <h1 v-if="width >= 648" class="mt-6 text-3xl mb-6">Cast</h1>

      <div class="flex flex-col-reverse sm:flex-row">
        <MovieDetailsCast :cast="movie.cast" />

        <h1 v-if="width < 648" class="mt-6 text-3xl mb-6">Cast</h1>
        <MovieDetailsVideo class="mt-4 sm:mt-0" :movie />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
const route = useRoute();
const runtimeConfig = useRuntimeConfig();
const messageStore = useMessageStore();
import { useDateFormat } from "@vueuse/core";
import { useWindowSize } from "@vueuse/core";

const { width } = useWindowSize();

const { data: movie, status } = useFetch(
  `https://api.themoviedb.org/3/movie/${route.params.id}?api_key=${runtimeConfig.public.apiKey}&append_to_response=videos,credits`,
  {
    transform(input) {
      return {
        ...input,
        movieSrc: `https://www.youtube.com/embed/${input.videos.results[0].key}`,
        release_date: useDateFormat(new Date(input.release_date), "MMMM YYYY", {
          locales: "en-US",
        }),
        runtime: `${parseInt(input.runtime / 60)}h ${input.runtime % 60}min`,
        budget: input.budget.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        }),
        cast: input.credits.cast.filter((_, index) => index < 8),
      };
    },
    onResponseError({ request, response, options }) {
      messageStore.showMessage = true;
      messageStore.message = response._data.status_message;
    },
  }
);
</script>
