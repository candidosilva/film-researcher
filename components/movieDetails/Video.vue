<template>
  <iframe
    ref="el"
    width="100%"
    :height="height"
    :src="movie.movieSrc"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
    class="rounded-md flex-1"
  ></iframe>
</template>

<script setup lang="ts">
import { useElementSize } from "@vueuse/core";
defineProps({ movie: Object });

const el = ref(null);
const { width } = useElementSize(el);

const height = computed(() => (315 * width.value) / 560);
</script>
