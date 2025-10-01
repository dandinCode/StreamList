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
      useMovieStore().sortMovies(this.sortBy, this.sortDirection)
    },
  },
});
</script>

<template>
  <div class="d-flex gap-2 mb-3 p-2">
    <button class="btn btn-outline-primary" @click="toggleSort('title')">
      Ordem alfabética
      <span v-if="sortBy === 'title'">
        ({{ sortDirection === "asc" ? "A-Z" : "Z-A" }})
      </span>
    </button>

    <button class="btn btn-outline-primary" @click="toggleSort('release_date')">
      Ano de lançamento
      <span v-if="sortBy === 'release_date'">
        ({{ sortDirection === "asc" ? "Mais antigo" : "Mais recente" }})
      </span>
    </button>

    <button class="btn btn-outline-primary" @click="toggleSort('vote_average')">
      Avaliação do público
      <span v-if="sortBy === 'vote_average'">
        ({{ sortDirection === "asc" ? "Menor nota" : "Maior nota" }})
      </span>
    </button>
  </div>
</template>
