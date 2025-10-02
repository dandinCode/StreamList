<script setup>
import { ref } from "vue";

const drawer = ref(null);

const items = [
  { text: "Início", icon: "mdi-home", to: "/home" },
  { text: "Filmes", icon: "mdi-movie", to: "/movies" },
  { text: "Favoritos", icon: "mdi-heart", to: "/favorites" },
];
</script>

<template>
  <v-app id="inspire">
    <v-navigation-drawer
      style="position: fixed; top: 0; left: 0; height: 100vh"
      v-model="drawer"
    >
      <v-list :lines="false" density="compact" nav>
        <router-link v-for="(item, i) in items" :key="i" :to="item.to">
          <v-list-item :value="item" color="primary">
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>

            <v-list-item-title :textContent="item.text"></v-list-item-title>
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar style="position: fixed; top: 0">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title class="font-fancy">Stream List</v-app-bar-title>
      <theme-button />
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<style scoped>
a {
  text-decoration: none;
  color: #505050;
}

.v-theme--dark a {
  color: #ffffff;
}
</style>
