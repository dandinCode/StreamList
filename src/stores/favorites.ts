import type { Movie } from "@/types/types";
import { defineStore } from "pinia";

export const useFavoriteStore = defineStore("favorite", {
  state: () => ({
    favorites: [] as Movie[],
  }),
  actions: {
    loadFavorites() {
      const favorites = localStorage.getItem("favorites");
      if (favorites) {
        this.favorites = JSON.parse(favorites);
      }
    },
    addFavorite(movie: Movie) {
      if (!this.favorites.some((fav) => fav.id === movie.id)) {
        this.favorites.push(movie);

        this.favorites.sort((a, b) => a.title.localeCompare(b.title));
        localStorage.setItem("favorites", JSON.stringify(this.favorites));
      }
    },
    removeFavorite(movieId: number) {
      this.favorites = this.favorites.filter((fav) => fav.id !== movieId);
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    },
    toggleFavorite(movie: Movie) {
      if (!this.isFavorite(movie.id)) {
        this.addFavorite(movie);
        return;
      }
      this.removeFavorite(movie.id);
    },
    isFavorite(movieId: number): boolean {
      return this.favorites.some((fav) => fav.id === movieId);
    },
  },
});
