<script lang="ts">
import { defineComponent, ref } from "vue";
import type { Genre, Origin } from "@/types/types";
import { useMovieStore } from "@/stores/movies";
import { useOriginStore } from "@/stores/origin";

export default defineComponent({
  data() {
    return {
      movieStore: useMovieStore(),
      originStore: useOriginStore(),
      selectedGenres: ref<string[]>([]),
      selectedOrigin: ref<string | null>(null),
    };
  },
  mounted() {
    useMovieStore().loadGenres();
    useOriginStore().loadOrigins();
  },
  emits: ["cleanSearchField"],
  methods: {
    async applyFilters() {
      useMovieStore().setGenresSelected(this.selectedGenres);
      useOriginStore().setOriginSelected(this.selectedOrigin);
      this.$emit("cleanSearchField");
      await useMovieStore().setFilms(1, {
        with_genres: useMovieStore().genresSelected,
        with_origin_country: useOriginStore().originSelected,
      });
    },
  },
});
</script>

<template>
  <div class="p-2">
    <v-btn color="primary">
      Filtros
      <v-menu activator="parent" :close-on-content-click="false">
        <v-list>
          <v-list-item
            v-for="category in ['Gênero', 'País de origem']"
            :key="category"
            link
          >
            <v-list-item-title>{{ category }}</v-list-item-title>
            <template v-slot:append>
              <v-icon icon="mdi-menu-right" size="x-small"></v-icon>
            </template>

            <v-menu activator="parent" submenu :close-on-content-click="false">
              <v-list>
                <template v-if="category === 'Gênero'">
                  <v-list-item
                    v-for="genre in movieStore.genres"
                    :key="genre.id"
                  >
                    <v-checkbox
                      v-model="selectedGenres"
                      :value="genre.id"
                      :label="genre.name"
                      density="compact"
                    />
                  </v-list-item>
                </template>

                <template v-else-if="category === 'País de origem'">
                  <v-list-item
                    v-for="origin in originStore.origins"
                    :key="origin.iso_3166_1"
                    @click="
                      selectedOrigin === origin.iso_3166_1
                        ? (selectedOrigin = null)
                        : (selectedOrigin = origin.iso_3166_1)
                    "
                  >
                    <v-list-item-title>
                      {{ origin.native_name }} -
                      {{ origin.iso_3166_1.toUpperCase() }}
                    </v-list-item-title>
                    <v-list-item-action>
                      <v-icon
                        v-if="selectedOrigin === origin.iso_3166_1"
                        icon="mdi-check"
                        color="primary"
                      />
                    </v-list-item-action>
                  </v-list-item>
                </template>
              </v-list>
            </v-menu>
          </v-list-item>
          <v-btn color="success" class="ms-2" @click="applyFilters">
            Pesquisar
          </v-btn>
        </v-list>
      </v-menu>
    </v-btn>
  </div>
</template>
