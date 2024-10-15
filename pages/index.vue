<template>
  <main class="flex flex-col container mx-auto">
    <h1 class="mt-16 text-3xl mb-6">Featured today</h1>

    <HomeMovieCardsSkeleton v-if="status !== 'success'" />
    <HomeMovieCards v-else="status === 'success'" :movies="movies?.results" />

    <HomePagination v-model="page" :total-results="movies.total_results" :clear="clear" />
  </main>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'

const runtimeConfig = useRuntimeConfig()
const messageStore = useMessageStore()
const page: Ref<number> = ref(1)
const params = computed(() => {
  return { page: page.value, api_key: runtimeConfig.public.apiKey }
})
const {
  data: movies,
  status,
  clear
} = await useFetch<any>(`https://api.themoviedb.org/3/discover/movie`, {
  params,
  transform(input) {
    return {
      ...input,
      total_results: input.total_results > 200 ? 200 : input.total_results,
      results: input.results.map((movie: any) => {
        return {
          ...movie,
          release_date: useDateFormat(new Date(movie.release_date), 'MMMM YYYY', {
            locales: 'en-US'
          })
        }
      })
    }
  },
  onResponseError({ request, response }) {
    messageStore.showMessage = true
    messageStore.message = response.statusText
  }
})
</script>
