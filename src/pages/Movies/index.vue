<script lang="ts">
import { defineComponent } from "vue";
import CardMidia from "@/components/CardMidia.vue";
import { getAllMovies } from "@/services/movies.ts";
import { Movie } from "@/types/movies.ts";
import { useMovieStore } from "@/stores/movies";

export default defineComponent({
  components: {
    CardMidia,
  },
  data() {
    return {
      films: [],
      currentPage: 1,
      movieStore: useMovieStore(),
    };
  },
  async mounted() {
    await this.loadPage(this.currentPage);
  },
  methods: {
    async loadPage(page: number) {
      try {
        this.films = await getAllMovies(page);
      } catch (err) {
        console.error("Erro ao carregar filmes:", err);
        this.films = [];
      }
    },
    changeCurrentPage(page: number) {
      this.currentPage = page;
      this.loadPage(page);
    },
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
      <div
        class="d-flex justify-content-center align-items-center gap-2 mt-3 pb-9"
      >
        <button
          v-if="currentPage - 2 > 0"
          class="btn btn-outline-primary"
          @click="changeCurrentPage(currentPage - 2)"
        >
          {{ currentPage - 2 }}
        </button>

        <button
          v-if="currentPage - 1 > 0"
          class="btn btn-outline-primary"
          @click="changeCurrentPage(currentPage - 1)"
        >
          {{ currentPage - 1 }}
        </button>

        <button class="btn btn-primary fw-bold" disabled>
          {{ currentPage }}
        </button>

        <button
          v-if="currentPage + 1 <= movieStore.total_pages"
          class="btn btn-outline-primary"
          @click="changeCurrentPage(currentPage + 1)"
        >
          {{ currentPage + 1 }}
        </button>

        <button
          v-if="currentPage + 2 <= movieStore.total_pages"
          class="btn btn-outline-primary"
          @click="changeCurrentPage(currentPage + 2)"
        >
          {{ currentPage + 2 }}
        </button>
      </div>
    </div>
  </div>
</template>
