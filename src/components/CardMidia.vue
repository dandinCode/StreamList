<script lang="ts">
import { defineComponent } from "vue";
import noImage from "@/assets/noImage.jpg";

export default defineComponent({
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    urlPoster: {
      type: String as () => string | null,
    },
  },
  setup() {
    return { noImage };
  },
});
</script>

<template>
  <div class="col-12 col-sm-6 col-md-4 col-lg-4 my-2">
    <router-link :to="`/Details/${id}`" class="text-decoration-none">
      <div
        class="card h-100 shadow-sm movie-card border-0"
        :class="[
          !$vuetify.theme.current.dark
            ? 'bg-dark text-light'
            : 'bg-light text-dark',
        ]"
      >
        <img
          :src="
            urlPoster ? 'https://image.tmdb.org/t/p/w342' + urlPoster : noImage
          "
          class="card-img-top img-fluid"
          alt="Poster"
        />
        <div class="card-body d-flex flex-column justify-content-between">
          <h6 class="card-title text-center fw-bold">{{ name }}</h6>
        </div>
      </div>
    </router-link>
  </div>
</template>

<style scoped>
.movie-card img {
  height: 500px;
  object-fit: fill;
  border-radius: 0.3rem 0.3rem 0 0;
  transition: transform 0.3s ease-in-out;
}

.movie-card:hover img {
  transform: scale(0.98);
}
</style>
