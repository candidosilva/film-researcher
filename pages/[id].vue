<template>
  <main class="flex flex-col container mx-auto px-6 sm:px-0 pb-14">
    <MovieDetailsPageSkeleton v-if="status !== 'success'" />

    <div v-else>
      <div class="flex flex-col sm:flex-row mt-0 sm:mt-16">
        <div class="flex flex-1">
          <NuxtImg
            :src="`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`"
            class="rounded-lg sm:w-[312px] sm:h-[394px] md:w-[376px] md:h-[364px] lg:w-[504px] lg:h-[322px] xl:w-[632px] xl:h-[360px] 2xl:w-[760px] 2xl:h-[427px]"
            loading="lazy"
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
interface Cast {
  profile_path: string;
  name: string;
  character: string;
  cast?: Cast[];
}

interface Credits {
  cast: Cast[];
}

interface Movie {
  backdrop_path: string;
  cast: Cast[];
  release_date: string;
  runtime: number;
  credits: Credits;
  budget: number;
}

const route = useRoute();
const runtimeConfig = useRuntimeConfig();
const messageStore = useMessageStore();
import { useDateFormat } from "@vueuse/core";
import { useWindowSize } from "@vueuse/core";

const { width } = useWindowSize();

const { data: movie, status } = useFetch(
  `https://api.themoviedb.org/3/movie/${route.params.id}?api_key=${runtimeConfig.public.apiKey}&append_to_response=videos,credits`,
  {
    transform(input: Movie) {
      return {
        ...input,
        movieSrc: `https://www.youtube.com/embed/${input.videos.results[0].key}`,
        release_date: useDateFormat(new Date(input.release_date), "MMMM YYYY", {
          locales: "en-US",
        }),
        runtime: `${parseInt(input.runtime / 60).toString()}h ${input.runtime % 60}min`,
        budget: input.budget.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        }),
        cast: input.credits.cast.filter((_, index: number) => index < 8),
      };
    },
    onResponseError({ request, response, options }) {
      messageStore.showMessage = true;
      messageStore.message = response._data.status_message;
    },
  }
);
</script>
