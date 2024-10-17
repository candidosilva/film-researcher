<template>
  <div class="relative min-h-screen">
    <header class="bg-gray-900">
      <div
        class="sm:container mx-auto sm:flex sm:h-14 p-2 sm:p-0 sm:items-center"
      >
        <NuxtLink
          to="/"
          class="flex items-center justify-center sm:justify-normal mb-2 sm:mb-0"
        >
          <Icon name="arcticons:movielab" class="h-12 w-12 bg-white" />

          <h1 class="ml-2 text-3xl">Movie Search</h1>
        </NuxtLink>

        <HeaderSearchInput />
      </div>
    </header>

    <slot />

    <ClientOnly>
      <Message />
    </ClientOnly>

    <footer
      class="bg-slate-950 flex justify-center sm:justify-end py-4 container absolute bottom-0 left-[50%] translate-x-[-50%]"
    >
      <span class="text-sm mr-2"> powered by </span>
      <img src="/assets/TMDB-Logo.svg" width="100" height="100" />
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useWindowSize } from "@vueuse/core";

const moviesStore = useMoviesStore();
const { width } = useWindowSize();

function searchMovies() {
  if (moviesStore.search !== "") {
    moviesStore.searchMovies();
  }
}
</script>
