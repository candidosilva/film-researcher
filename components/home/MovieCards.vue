<template>
  <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-5 gap-y-10">
    <div
      v-for="(card, index) in movies"
      :key="index"
      class="flex flex-col cursor-pointer"
      @click="$router.push(`/${card.id}`)"
    >
      <Icon
        name="mdi:image-off-outline"
        v-if="card.poster_path === null"
        size="100"
        class="w-full h-full"
      />
      <div v-else class="relative">
        <NuxtImg
          ref="el"
          :src="`https://image.tmdb.org/t/p/original/${card.poster_path}`"
          class="rounded-lg"
          :style="{ width: width, height: height }"
          loading="lazy"
        />

        <HomeVoteAverage :vote-average="card.vote_average" />
      </div>

      <div class="flex justify-between sm:flex-col">
        <div class="text-white text-lg mt-5">{{ card.title }}</div>
        <div class="text-zinc-400 text-lg mt-5 sm:mt-0">
          {{
            card.release_date !== "Invalid Date NaN"
              ? card.release_date
              : "No date found"
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useElementSize } from "@vueuse/core";

interface Movies {
  poster_path: string;
  vote_average: number;
  title: string;
  release_date: string;
  id: number;
}

interface Props {
  movies?: Movies[] | undefined;
}
const { movies = [] } = defineProps<Props>();
</script>
