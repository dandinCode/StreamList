<script lang="ts">
import { defineComponent } from "vue";
import { useFavoriteStore } from "@/stores/favorites";
import type { Movie } from "@/types/types";

export default defineComponent({
  props: {
    movie: {
      type: Object as () => Movie,
      required: true,
    },
  },
  setup(props) {
    const favoriteStore = useFavoriteStore();
    favoriteStore.loadFavorites();

    const toggleFavorite = () => {
      favoriteStore.toggleFavorite(props.movie);
    };

    const isFavorite = () => favoriteStore.isFavorite(props.movie.id);

    return { toggleFavorite, isFavorite };
  },
});
</script>

<template>
  <div class="fw-bolder  pb-9">
    <p v-if="isFavorite()">Remover dos favoritos</p>
    <p v-else>Adicionar aos favoritos</p>
    <v-icon
      :icon="isFavorite() ? 'mdi-heart' : 'mdi-heart-outline'"
      color="red"
      @click="toggleFavorite"
      class="cursor-pointer"
    />
  </div>
</template>
