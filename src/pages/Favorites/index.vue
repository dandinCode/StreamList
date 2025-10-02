<script lang="ts">
import { defineComponent } from "vue";
import CardMidia from "@/components/CardMidia.vue";
import { useFavoriteStore } from "@/stores/favorites";
import type { Movie } from "@/types/types";

export default defineComponent({
  components: {
    CardMidia,
  },
  data() {
    return {
      favoriteStore: useFavoriteStore(),
    };
  },
  mounted() {
    this.favoriteStore.loadFavorites();
  },
});
</script>

<template>
  <div class="p-3">
    <div class="d-flex align-items-center justify-content-between mb-4">
      <h2 class="fw-bold py-1">
        <v-icon icon="mdi-heart" class="me-2 text-error"></v-icon>
        Favoritos
      </h2>
      <small v-if="favoriteStore.favorites.length > 0">
        Total: {{ favoriteStore.favorites.length }} filmes
      </small>
    </div>

    <div
      class="card border-0 shadow-sm"
      :class="[
        $vuetify.theme.current.dark
          ? 'bg-dark text-light'
          : 'bg-light text-dark',
      ]"
    >
      <div class="card-body">
        <div class="row g-4">
          <CardMidia
            v-if="favoriteStore.favorites.length > 0"
            v-for="film in favoriteStore.favorites"
            :key="film.id"
            :name="film.title"
            :urlPoster="film.poster_path"
            :id="film.id"
          />
          <h3 v-else class="text-center py-4">Nenhum filme favoritado!</h3>
        </div>
      </div>
    </div>
  </div>
</template>
