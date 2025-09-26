import { defineStore } from "pinia";

export const useMovieStore = defineStore("movie", {
  state: () => ({
    total_pages: 1,
  }),
  actions: {
    changeTotalPages(total_pages: number) {
      this.total_pages = total_pages;
    },
  },
});
