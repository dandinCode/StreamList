<script lang="ts">
import { defineComponent } from "vue";
import CardMidia from "@/components/CardMidia.vue";
import { getPopularMovies } from "@/services/movies.ts";
import type { Movie } from "@/types/types";

export default defineComponent({
  components: {
    CardMidia,
  },
  data() {
    return {
      films: [] as Movie[],
    };
  },
  async mounted() {
    try {
      this.films = await getPopularMovies();
    } catch (err) {
      console.error("Erro ao carregar filmes:", err);
      this.films = [];
    }
  },
});
</script>

<template>
  <div class="p-2">
    <h2>Home</h2>
    <div class="card mb-3">
      <div class="card-body row">
        <CardMidia
          v-for="film in films"
          :key="film.id"
          :name="film.title"
          :urlPoster="'https://image.tmdb.org/t/p/w342' + film.poster_path"
          :id="film.id"
        />
      </div>
    </div>
  </div>
</template>
