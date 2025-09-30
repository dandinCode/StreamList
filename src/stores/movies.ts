import { getAllMovies, searchMovies } from "@/services/movies";
import type { Genre, Movie, MoviesFilters } from "@/types/types";
import { defineStore } from "pinia";
import { useOriginStore } from "@/stores/origin";

const originStore = useOriginStore();

export const useMovieStore = defineStore("movie", {
  state: () => ({
    films: [] as Movie[],
    genres: [] as Genre[],
    genresSelected: "",
    total_pages: 1,
  }),
  actions: {
    changeTotalPages(total_pages: number) {
      this.total_pages = total_pages;
    },
    saveGenres(genres: Genre[]) {
      const sorted = [...genres].sort((a, b) => a.name.localeCompare(b.name));

      this.genres = sorted;
      sessionStorage.setItem("genres", JSON.stringify(sorted));
    },
    async loadGenres() {
      const genres = sessionStorage.getItem("genres");
      if (genres) {
        this.genres = JSON.parse(genres);
      }
    },
    setGenresSelected(selectedIds: string[]) {
      this.genresSelected = selectedIds.join(",");
    },
    async setFilms(page: number, filters?: MoviesFilters) {
      this.films = await getAllMovies(page, filters);
    },
    async searchMovies(page: number, query: string) {
      this.films = await searchMovies(page, query);
    },
  },
});
