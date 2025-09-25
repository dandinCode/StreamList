<script lang="ts">
  import { defineComponent } from "vue";
  import CardMidia from "@/components/CardMidia.vue";

  const API_KEY = import.meta.env.VITE_API_URL;
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  export default defineComponent({
    components: {
      CardMidia,
    },
    data() {
      return {
        films: [] as any[],
      };
    },
    mounted() {
      fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`)
        .then((res) => res.json())
        .then((res) => {
          this.films = res.results;
          console.log(res.results);
        });
    },
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
