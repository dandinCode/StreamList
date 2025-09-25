<script setup lang="ts">
const {name, urlPoster} = defineProps<{
  name: string;
  urlPoster: string;
}>();
</script>

<template>
  <div class="col-4">
    <div class="card p2 mb-3 cardList">
      <p class="text-center">{{ name }}</p>
      <img :src="urlPoster" class="card-img-top" alt=""  />
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
</style>
