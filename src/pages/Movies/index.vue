<script lang="ts">
import { defineComponent } from "vue";
import CardMidia from "@/components/CardMidia.vue";
import { getAllMovies } from "@/services/movies.ts";
import { Movie } from "@/types/movies.ts";

export default defineComponent({
  components: {
    CardMidia,
  },
  data() {
    return {
      films: [],
    };
  },
  async mounted() {
    try {
      this.films = await getAllMovies();
    } catch (err) {
      console.error("Erro ao carregar filmes:", err);
      this.films = [];
    }
  },
});
</script>

<template>
  <div>
    <h2>Movies</h2>
    <div class="card mb-3">
      <div class="card-body row">
        <CardMidia
          v-for="film in films"
          :key="film.id"
          :name="film.title"
          :urlPoster="'https://image.tmdb.org/t/p/w342' + film.poster_path"
        />
      </div>
    </div>
  </div>
</template>
