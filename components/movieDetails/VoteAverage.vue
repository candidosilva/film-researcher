<template>
  <div
    class="w-16 h-16 rounded-full bg-white flex justify-center items-center"
    x-data="{ circumference: 2 * 22 / 7 * 120 }"
  >
    <svg class="w-full h-full" viewBox="0 0 100 100">
      <circle
        class="text-gray-200 stroke-current"
        :class="bgVoteColor(voteAverage)"
        stroke-width="10"
        cx="50"
        cy="50"
        r="40"
        fill="transparent"
      ></circle>
      <circle
        class="-rotate-90 origin-[50%_50%] stroke-current"
        :class="voteColor(voteAverage)"
        stroke-width="10"
        stroke-linecap="round"
        cx="50"
        cy="50"
        r="40"
        fill="transparent"
        stroke-dasharray="251.2"
        :stroke-dashoffset="`calc(251.2 - (251.2 * ${voteAverage} * 10) / 100)`"
      ></circle>

      <text
        class="text-2xl font-bold"
        x="50"
        y="50"
        font-family="Verdana"
        font-size="20"
        text-anchor="middle"
        alignment-baseline="middle"
      >
        {{ voteAverage.toFixed(1) }}
      </text>
    </svg>
    <div class="text-zinc-800 font-bold text-2xl"></div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  voteAverage?: number;
}
const { voteAverage = 0 } = defineProps<Props>();

function voteColor(vote: number) {
  if (vote <= 4) return "text-red-500";
  if (vote > 4 && vote < 7) return "text-yellow-500";
  return "text-green-500";
}

function bgVoteColor(vote: number) {
  if (vote <= 4) return "text-red-100";
  if (vote > 4 && vote < 7) return "text-yellow-100";
  return "text-green-100";
}
</script>
