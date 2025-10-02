import { getAllGenres, getAllMovies, searchMovies } from "@/services/movies";
import type { Genre, Movie, MoviesFilters } from "@/types/types";
import { defineStore } from "pinia";

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
    async saveGenres() {
      const genres = await getAllGenres();
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
    sortMovies(sortBy: string, sortDirection: string) {
      const movies = this.films;
      return movies.sort((a, b) => {
        let comparison = 0;

        if (sortBy === "title") {
          comparison = a.title.localeCompare(b.title, "pt-BR", {
            sensitivity: "base",
          });
        } else if (sortBy === "release_date") {
          const dateA = new Date(a.release_date ?? 0).getTime();
          const dateB = new Date(b.release_date ?? 0).getTime();
          comparison = dateA - dateB;
        } else if (sortBy === "vote_average") {
          comparison = Number(a.vote_average) - Number(b.vote_average);
        }

        return sortDirection === "asc" ? comparison : -comparison;
      });
    },
  },
});
