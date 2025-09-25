<script lang="ts" setup>
import CardMidia from "@/components/CardMidia.vue";
import { onMounted, ref } from "vue";

const API_KEY = import.meta.env.VITE_API_URL;
const BASE_URL = import.meta.env.VITE_BASE_URL;

let films = ref<any>(null);

onMounted(() => {
  fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`)
    .then((res) => res.json())
    .then((res) => {
      films.value = res.results;
      console.log(res.results);
    });
});
</script>

<template>
  <div>
    <div class="card">
      <div class="card-body row">
        <CardMidia
          v-for="film in films"
          :key="film.id"
          :name="film.original_title"
          :urlPoster="'https://image.tmdb.org/t/p/w342' + film.poster_path"
        />
      </div>
    </div>
  </div>
</template>

