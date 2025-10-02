<script lang="ts">
import { defineComponent } from "vue";
import { useMovieStore } from "@/stores/movies";

export default defineComponent({
  data() {
    return {
      movieStore: useMovieStore(),
      sortBy: "title" as "title" | "release_date" | "vote_average",
      sortDirection: "asc" as "asc" | "desc",
    };
  },
  methods: {
    toggleSort(criteria: "title" | "release_date" | "vote_average") {
      if (this.sortBy === criteria) {
        this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
      } else {
        this.sortBy = criteria;
        this.sortDirection = "asc";
      }
      useMovieStore().sortMovies(this.sortBy, this.sortDirection);
    },
  },
});
</script>

<template>
  <div class="d-flex flex-wrap gap-2 mb-3 p-2 align-items-center">
    <button
      class="btn d-flex align-items-center"
      :class="[
        $vuetify.theme.current.dark ? 'btn-outline-warning' : 'btn-warning',
      ]"
      @click="toggleSort('title')"
    >
      Ordem alfabética
      <span v-if="sortBy === 'title'" class="ms-1">
        ({{ sortDirection === "asc" ? "A-Z" : "Z-A" }})
      </span>
    </button>

    <button
      class="btn d-flex align-items-center"
      :class="[
        $vuetify.theme.current.dark ? 'btn-outline-warning' : 'btn-warning',
      ]"
      @click="toggleSort('release_date')"
    >
      Ano de lançamento
      <span v-if="sortBy === 'release_date'" class="ms-1">
        ({{ sortDirection === "asc" ? "Mais antigo" : "Mais recente" }})
      </span>
    </button>

    <button
      class="btn d-flex align-items-center"
      :class="[
        $vuetify.theme.current.dark ? 'btn-outline-warning' : 'btn-warning',
      ]"
      @click="toggleSort('vote_average')"
    >
      Avaliação do público
      <span v-if="sortBy === 'vote_average'" class="ms-1">
        ({{ sortDirection === "asc" ? "Menor nota" : "Maior nota" }})
      </span>
    </button>
  </div>
</template>
