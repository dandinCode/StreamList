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
  <div class="p-2">
    <h2>Favorites</h2>
    <div class="card mb-3">
      <div class="card-body row">
        <template v-if="favoriteStore.favorites.length > 0">
          <CardMidia
            v-for="film in favoriteStore.favorites"
            :key="film.id"
            :name="film.title"
            :urlPoster="'https://image.tmdb.org/t/p/w342' + film.poster_path"
            :id="film.id"
          />
        </template>
        <h3 v-else>Nenhum filme favoritado!</h3>
      </div>
    </div>
  </div>
</template>
