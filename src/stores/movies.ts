import type { Genre } from "@/types/types";
import { defineStore } from "pinia";

export const useMovieStore = defineStore("movie", {
  state: () => ({
    genres: [] as Genre[],
    total_pages: 1,
  }),
  actions: {
    changeTotalPages(total_pages: number) {
      this.total_pages = total_pages;
    },
    saveGenres(genres: Genre[]) {
      const sorted = [...genres].sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      this.genres = sorted;
      sessionStorage.setItem("genres", JSON.stringify(sorted));
    },
    async loadGenres() {
      const genres = sessionStorage.getItem("genres");
      if (genres) {
        this.genres = JSON.parse(genres);
      }
    },
  },
});
