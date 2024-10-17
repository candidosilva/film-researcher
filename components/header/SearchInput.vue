<template>
  <div class="ml-auto relative block">
    <button
      type="button"
      :disabled="moviesStore.search === ''"
      @click="moviesStore.searchMovies"
      @keyup.enter="searchMovies()"
    >
      <Icon
        name="material-symbols:search"
        size="28"
        class="absolute right-2 top-1 flex items-center pl-3 cursor-pointer"
      />
      <input
        v-model="moviesStore.search"
        type="text"
        class="bg-transparent w-96 placeholder:text-slate-400 text-white text-sm border border-gray-600 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow"
        placeholder="Search"
      />
    </button>
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
