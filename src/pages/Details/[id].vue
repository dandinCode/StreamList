<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getMovieDetails } from "@/services/movies";
import type { Movie } from "@/types/types";

export default defineComponent({
  setup() {
    const route = useRoute();
    const movieId = Number((route.params as { id: string }).id);
    const movie = ref<Movie>();

    function formatDate(dateStr: string): string {
      if (!dateStr) return "-";
      const date = new Date(dateStr);
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    }

    onMounted(async () => {
      movie.value = await getMovieDetails(movieId);
    });

    return { movie, formatDate };
  },
});
</script>

<template>
  <div class="container mt-4">
    <div v-if="movie" class="row">
      <div class="col-md-4">
        <img
          :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
          alt="Poster"
          class="img-fluid rounded shadow"
        />
      </div>

      <div class="col-md-8">
        <h2>{{ movie.title }}</h2>
        <p class="text-muted" v-if="movie.release_date">
          Lançamento: {{ formatDate(movie.release_date) }}
        </p>

        <p  v-if="movie.vote_average">
          Avaliação: ⭐ {{ Number(movie.vote_average).toFixed(1) }} ({{
            movie.vote_count
          }}
          votos)
        </p>

        <div class="mb-3">
          <span
            v-for="genre in movie.genres"
            :key="genre.id"
            class="badge bg-primary me-2"
          >
            {{ genre.name }}
          </span>
        </div>

        <p>{{ movie.overview || "Resumo não disponível." }}</p>
      </div>
    </div>

    <div v-else class="text-center mt-5">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
      <p>Carregando detalhes...</p>
    </div>
  </div>
</template>
