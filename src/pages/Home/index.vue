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
      movies: [] as Movie[],
    };
  },
  async mounted() {
    try {
      this.movies = await getPopularMovies();
    } catch (err) {
      console.error("Erro ao carregar filmes:", err);
      this.movies = [];
    }
  },
});
</script>

<template>
  <div class="p-3">
    <div class="d-flex align-items-center justify-content-between mb-4">
      <h2 class="fw-bold py-1">
        <v-icon icon="mdi-home" class="me-2 text-primary"></v-icon>
        Início
      </h2>
      <small v-if="movies.length > 0">
        Exibindo {{ movies.length }} filmes
      </small>
    </div>

    <div
      class="card border-0 shadow-sm"
      :class="[
        $vuetify.theme.current.dark
          ? 'bg-dark text-light'
          : 'bg-light text-dark',
      ]"
    >
      <div class="card-body">
        <div class="row g-4">
          <CardMidia
            v-if="movies.length > 1"
            v-for="film in movies"
            :key="film.id"
            :name="film.title"
            :urlPoster="film.poster_path"
            :id="film.id"
          />
          <h3 v-else class="text-center py-4">Nenhum filme encontrado!</h3>
        </div>
      </div>
    </div>
  </div>
</template>
