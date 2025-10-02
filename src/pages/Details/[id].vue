<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getMovieDetails } from "@/services/movies";
import Favorite from "@/components/Favorite.vue";
import StarRating from "@/components/StarRating.vue";
import type { Movie } from "@/types/types";
import noImage from "@/assets/noImage.jpg";

export default defineComponent({
  components: {
    Favorite,
    StarRating,
  },
  data() {
    return {
      movieId: Number((useRoute().params as { id: string }).id),
      movie: ref<Movie>(),
    };
  },
  methods: {
    formatDate(dateStr: string): string {
      if (!dateStr) return "-";
      const date = new Date(dateStr);
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    },
  },
  async mounted() {
    try {
      this.movie = await getMovieDetails(this.movieId);
    } catch (error) {
      console.error(error);
    }
  },
  setup() {
    return { noImage };
  },
});
</script>

<template>
  <div class="container mt-4">
    <div v-if="movie" class="row">
      <div class="col-md-4">
        <img
          :src="
            movie.poster_path
              ? 'https://image.tmdb.org/t/p/w500' + movie.poster_path
              : noImage
          "
          alt="Poster"
          class="img-fluid rounded shadow"
        />
      </div>

      <div class="col-md-8">
        <h2>{{ movie.title }}</h2>
        <p v-if="movie.release_date">
          Lançamento: {{ formatDate(movie.release_date) }}
        </p>

        <p v-if="movie.vote_average">
          Avaliação:
          <StarRating
            :rating="Number(movie.vote_average)"
            :voteCount="Number(movie.vote_count)"
          />
        </p>

        <div class="mb-3">
          <span
            v-for="genre in movie.genres"
            :key="genre.id"
            class="badge rounded-pill"
            :class="
              $vuetify.theme.current.dark
                ? 'bg-secondary me-2'
                : 'bg-primary me-2'
            "
          >
            {{ genre.name }}
          </span>
        </div>

        <div class="mb-4">
          <h5>Sinopse</h5>
          <p class="text-justify">
            {{ movie.overview || "Resumo não disponível." }}
          </p>
        </div>

        <Favorite :movie="movie" />
      </div>
    </div>
    <div v-else class="text-center mt-5">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
      <p>Carregando detalhes...</p>
    </div>
  </div>
</template>

<style scoped>
.badge {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.badge:hover {
  transform: scale(1.05);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
.text-justify {
  text-align: justify;
  line-height: 1.6;
}
</style>
