<script lang="ts">
import { defineComponent } from "vue";
import CardMidia from "@/components/CardMidia.vue";
import Pagination from "@/components/Pagination.vue";
import DropdownFilters from "@/components/DropdownFilters.vue";
import SortingButtons from "@/components/SortingButtons.vue";
import { useMovieStore } from "@/stores/movies";
import { useOriginStore } from "@/stores/origin";
import type { Movie } from "@/types/types";
import { debounce } from "@/utils/debounce.ts";

export default defineComponent({
  components: {
    CardMidia,
    Pagination,
    DropdownFilters,
    SortingButtons,
  },
  data() {
    return {
      currentPage: 1,
      movieStore: useMovieStore(),
      searchMovieField: "",
      debouncedSearch: null as ((query: string) => void) | null,
    };
  },
  async mounted() {
    this.debouncedSearch = this.getDebouncedSearch();
    useMovieStore().saveGenres();
    useOriginStore().saveOrigins();
    await this.loadPage(this.currentPage);
  },
  methods: {
    async loadPage(page: number) {
      try {
        await useMovieStore().setMovies(page, {
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
    cleanSearchField() {
      this.searchMovieField = "";
      this.currentPage = 1;
    },
    getDebouncedSearch() {
      return debounce(async (query: string) => {
        if (query.length >= 3) {
          await this.movieStore.searchMovies(1, query);
          this.currentPage = 1;
          return;
        }
        await this.loadPage(1);
      }, 400);
    },
  },
  watch: {
    searchMovieField(newValue: string) {
      if (this.debouncedSearch) {
        this.debouncedSearch(newValue);
      }
    },
  },
});
</script>

<template>
  <div class="p-3">
    <div class="d-flex flex-column flex-md-row justify-content-between mb-4">
      <h2 class="fw-bold mb-3 mb-md-0">🎬 Filmes</h2>

      <div class="input-group w-100 w-md-50 shadow-sm rounded p-2">
        <span
          class="input-group-text bg-primary text-white d-flex align-items-center"
        >
          <v-icon icon="mdi-magnify" size="20"></v-icon>
        </span>

        <input
          v-model="searchMovieField"
          type="text"
          class="form-control border-0"
          id="searchMovieField"
          placeholder="Pesquisar filmes..."
        />

        <button
          v-if="searchMovieField"
          class="btn btn-outline-secondary d-flex align-items-center"
          @click="cleanSearchField"
        >
          <v-icon icon="mdi-close-circle" size="20"></v-icon>
        </button>
      </div>
    </div>

    <div class="d-flex flex-column flex-md-row gap-2 mb-4">
      <DropdownFilters @cleanSearchField="cleanSearchField" />
      <SortingButtons />
    </div>

    <div
      class="card border-0 shadow-sm"
      :class="[
        $vuetify.theme.current.dark
          ? 'bg-dark text-light'
          : 'bg-light text-dark',
      ]"
    >
      <div class="card-body row g-3">
        <CardMidia
          v-if="movieStore.movies.length > 1"
          v-for="film in movieStore.movies"
          :key="film.id"
          :name="film.title"
          :urlPoster="film.poster_path"
          :id="film.id"
        />
        <h3 v-else class="text-center py-4">Nenhum filme encontrado!</h3>
      </div>
      <Pagination
        :currentPage="currentPage"
        :totalPages="movieStore.total_pages"
        @changePage="changeCurrentPage"
      />
    </div>
  </div>
</template>
