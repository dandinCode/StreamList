<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "StarRating",
  props: {
    rating: {
      type: Number,
      required: true,
    },
    voteCount: {
      type: Number,
    },
  },
  methods: {
    getStarType(index: number) {
      const ratingInStars = this.rating / 2;
      if (index + 1 <= Math.floor(ratingInStars)) return "mdi-star";
      if (index < ratingInStars) return "mdi-star-half-full";
      return "mdi-star-outline";
    },
  },
});
</script>

<template>
  <div class="d-flex align-items-center">
    <v-icon v-for="(star, index) in 5" :key="index" small color="warning">
      {{ getStarType(index) }}
    </v-icon>
    <span class="ms-2">({{ voteCount }} votos)</span>
  </div>
</template>
