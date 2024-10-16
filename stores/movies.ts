import { defineStore } from "pinia";
import { useDateFormat } from "@vueuse/core";

interface Results {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
  release_date: string;
}

interface Movies {
  total_pages: number;
  total_results: number;
  results: Results[];
}

export const useMoviesStore = defineStore("movies", () => {
  const movies: Ref<Movies | null> = ref(null);
  const page: Ref<number> = ref(1);
  const loading: Ref<boolean> = ref(false);
  const search: Ref<string> = ref("");
  const searchString = computed<string>(() => {
    return search.value.split(" ").join("+");
  });
  const runtimeConfig = useRuntimeConfig();
  const moviesSearched: Ref<Boolean> = ref(false);

  async function featureMovies() {
    if (movies.value === null) {
      const messageStore = useMessageStore();
      loading.value = true;
      try {
        const response: Movies = await $fetch(
          `https://api.themoviedb.org/3/discover/movie?page=${page.value}&api_key=${runtimeConfig.public.apiKey}`
        );
        movies.value = {
          ...response,
          total_results: 10,
          results: response.results
            .filter((_, index) => index < 10)
            .map((movie: any) => {
              return {
                ...movie,
                release_date: useDateFormat(
                  new Date(movie.release_date),
                  "MMMM YYYY",
                  {
                    locales: "en-US",
                  }
                ),
              };
            }),
        };
      } catch (e: any) {
        if (e.response) {
          messageStore.showMessage = true;
          messageStore.message = e.response._data.status_message;
        } else {
          messageStore.showMessage = true;
          messageStore.message = e;
        }
      }
      loading.value = false;
    }
  }

  async function searchMovies() {
    const messageStore = useMessageStore();
    loading.value = true;
    try {
      const response: Movies = await $fetch(
        `https://api.themoviedb.org/3/search/movie?page=${page.value}&query=${searchString.value}&api_key=${runtimeConfig.public.apiKey}`
      );
      movies.value = {
        ...response,
        total_results:
          response.total_results > 200 ? 200 : response.total_results,
        results: response.results.map((movie: any) => {
          return {
            ...movie,
            release_date: useDateFormat(
              new Date(movie.release_date),
              "MMMM YYYY",
              {
                locales: "en-US",
              }
            ),
          };
        }),
      };
      moviesSearched.value = true;
    } catch (e: any) {
      if (e.response) {
        messageStore.showMessage = true;
        messageStore.message = e.response._data.status_message;
      } else {
        messageStore.showMessage = true;
        messageStore.message = e;
      }
    }
    loading.value = false;
  }

  return {
    movies,
    page,
    loading,
    search,
    moviesSearched,
    featureMovies,
    searchMovies,
  };
});
