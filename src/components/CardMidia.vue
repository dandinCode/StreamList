<script lang="ts">
import { defineComponent } from "vue";

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
      type: String,
      required: true,
    },
  },
});
</script>

<template>
  <div class="col-12 col-sm-6 col-md-4 col-lg-4">
    <div class="card p2 mb-3 cardList">
      <router-link :to="`/Details/${id}`">
        <p class="text-center">{{ name }}</p>
        <img :src="urlPoster" class="card-img-top" alt="" />
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.cardList {
  background: rgb(72, 63, 251);
  background: radial-gradient(
    circle,
    rgba(94, 87, 232, 0.6) 0%,
    rgba(70, 252, 244, 0.2) 100%
  );
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

}
.cardList:hover {
  background: rgb(72, 63, 251);
  background: radial-gradient(
    circle,
    rgba(72, 63, 251, 0.6) 0%,
    rgba(70, 252, 244, 0.4) 100%
  );
}
.cardList img:hover {
  padding: 0.1rem;
}
.cardList img {
  height: 500px;
  object-fit: cover;
}
.cardList p {
  min-height: 3rem; 
}
</style>
