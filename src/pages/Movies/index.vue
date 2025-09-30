<script lang="ts">
import { defineComponent } from "vue";
import CardMidia from "@/components/CardMidia.vue";
import Pagination from "@/components/Pagination.vue";
import DropdownFilters from "@/components/DropdownFilters.vue";
import { getAllGenres } from "@/services/movies.ts";
import { useMovieStore } from "@/stores/movies";
import { useOriginStore } from "@/stores/origin";
import type { Movie } from "@/types/types";
import { getAllOrigins } from "@/services/origin";

function debounce<T extends (...args: any[]) => void>(fn: T, delay = 500) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export default defineComponent({
  components: {
    CardMidia,
  },
  data() {
    return {
      currentPage: 1,
      movieStore: useMovieStore(),
      searchMovieField: "",
    };
  },
  async mounted() {
    const genres = sessionStorage.getItem("genres");
    if (!genres) {
      await getAllGenres();
    }
    const origins = sessionStorage.getItem("origins");
    if (!origins) {
      await getAllOrigins();
    }
    await this.loadPage(this.currentPage);
  },
  methods: {
    async loadPage(page: number) {
      try {
        await useMovieStore().setFilms(page, {
          with_genres: useMovieStore().genresSelected,
          with_origin_country: useOriginStore().originSelected,
        });
      } catch (err) {
        console.error("Erro ao carregar filmes:", err);
      }
    },
    async changeCurrentPage(page: number) {
      this.currentPage = page;
      if (this.searchMovieField.length >= 3) {
        await this.movieStore.searchMovies(page, this.searchMovieField);
      } else {
        await this.loadPage(page);
      }
    },
  },
  created() {
    const debouncedSearch = debounce(async (query: string) => {
      if (query.length >= 3) {
        await this.movieStore.searchMovies(1, query);
      } else {
        await this.loadPage(1);
      }
    }, 400);
    watch(
      () => this.searchMovieField,
      (newValue) => {
        debouncedSearch(newValue);
      }
    );
  },
});
</script>

<template>
  <div>
    <h2>Movies</h2>
    <div class="mb-3 p-2">
      <label hidden for="searchMovieField" class="form-label">
        Pesquisar...
      </label>

      <input
        v-model="searchMovieField"
        type="text"
        class="form-control"
        id="searchMovieField"
        placeholder="Pesquisar..."
      />
    </div>

    <DropdownFilters />
    <div class="card mb-3">
      <div class="card-body row">
        <CardMidia
          v-if="movieStore.films.length > 1"
          v-for="film in movieStore.films"
          :key="film.id"
          :name="film.title"
          :urlPoster="'https://image.tmdb.org/t/p/w342' + film.poster_path"
          :id="film.id"
        />
        <h3 v-else>Nenhum filme encontrado!</h3>
      </div>
      <Pagination
        :currentPage="currentPage"
        :totalPages="movieStore.total_pages"
        @changePage="changeCurrentPage"
      />
    </div>
  </div>
</template>
