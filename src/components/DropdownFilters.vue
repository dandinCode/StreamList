<script lang="ts">
import { defineComponent } from "vue";
import type { Genre, Origin } from "@/types/types";
import { useMovieStore } from "@/stores/movies";
import { useOriginStore } from "@/stores/origin";

export default defineComponent({
  data() {
    return {
      movieStore: useMovieStore(),
      originStore: useOriginStore(),
    };
  },
  mounted() {
    useMovieStore().loadGenres();
    useOriginStore().loadOrigins();
  },
});
</script>

<template>
  <div>
    <v-btn color="primary">
      Filtros
      <v-menu activator="parent">
        <v-list>
          <v-list-item v-for="category in ['Gênero', 'País de origem']" :key="category" link>
            <v-list-item-title>{{ category }}</v-list-item-title>
            <template v-slot:append>
              <v-icon icon="mdi-menu-right" size="x-small"></v-icon>
            </template>

            <v-menu activator="parent" open-on-hover submenu>
              <v-list>
                <template v-if="category === 'Gênero'">
                  <v-list-item
                    v-for="genre in movieStore.genres"
                    :key="genre.id"
                    link
                  >
                    <v-list-item-title>{{ genre.name }}</v-list-item-title>
                  </v-list-item>
                </template>

                <template v-else-if="category === 'País de origem'">
                  <v-list-item
                    v-for="origin in originStore.origins"
                    :key="origin.iso_3166_1"
                    link
                  >
                    <v-list-item-title>{{ origin.native_name }} - {{ origin.iso_3166_1.toUpperCase() }}</v-list-item-title>
                  </v-list-item>
                </template>
              </v-list>
            </v-menu>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-btn>
  </div>
</template>
