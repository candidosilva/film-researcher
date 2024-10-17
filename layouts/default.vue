<template>
  <div class="relative min-h-screen">
    <header class="bg-gray-900">
      <div class="container mx-auto flex h-14 items-center">
        <NuxtLink to="/" class="flex items-center">
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
      class="bg-slate-950 flex justify-end py-4 container absolute bottom-0 left-[50%] translate-x-[-50%]"
    >
      <span class="text-sm mr-2"> powered by </span>
      <img src="/assets/TMDB-Logo.svg" width="100" height="100" />
    </footer>
  </div>
</template>

<script setup lang="ts">
const moviesStore = useMoviesStore();

function searchMovies() {
  if (moviesStore.search !== "") {
    moviesStore.searchMovies();
  }
}
</script>
