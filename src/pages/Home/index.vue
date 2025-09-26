<script lang="ts">
  import { defineComponent } from "vue";
  import CardMidia from "@/components/CardMidia.vue";
  import { getPopularMovies } from "@/services/movies.ts";

  export default defineComponent({
    components: {
      CardMidia,
    },
    data() {
      return {
        films: [] as any[],
      };
    },
    async mounted() {
      try {
        this.films = await getPopularMovies();
      } catch (err) {
        console.error("Erro ao carregar filmes:", err);
        this.films = [];
      }
    },
  });
</script>

<template>
  <div>
    <div class="card">
      <div class="card-body row">
        <CardMidia
          v-for="film in films"
          :key="film.id"
          :name="film.original_title"
          :urlPoster="'https://image.tmdb.org/t/p/w342' + film.poster_path"
        />
      </div>
    </div>
  </div>
</template>
