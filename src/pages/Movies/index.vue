<script lang="ts">
import { defineComponent } from "vue";
import CardMidia from "@/components/CardMidia.vue";
import { getAllMovies } from "@/services/movies.ts";
import { Movie } from "@/types/movies.ts";
import { useMovieStore } from "@/stores/movies";
import Pagination from "@/components/Pagination.vue";

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
    async changeCurrentPage(page: number) {
      this.currentPage = page;
      await this.loadPage(page);
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
      <Pagination
        :currentPage="currentPage"
        :totalPages="movieStore.total_pages"
        @changePage="changeCurrentPage"
      />
    </div>
  </div>
</template>
