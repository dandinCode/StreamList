<script setup>
import { useTheme } from "vuetify";

const theme = useTheme();
const savedTheme = localStorage.getItem("app-theme") || "light";
theme.change(savedTheme);

function toggleTheme() {
  let newTheme;
  if (theme.global.current.value.dark) {
    theme.change("light");
    localStorage.setItem("app-theme", "light");
  } else {
    theme.change("dark");
    localStorage.setItem("app-theme", "dark");
  }
}
</script>

<template>
  <v-btn icon @click="toggleTheme" class="theme-btn">
    <v-icon>{{
      theme.global.current.value.dark
        ? "mdi-weather-sunny"
        : "mdi-moon-waning-crescent"
    }}</v-icon>
  </v-btn>
</template>

<style scoped>
.theme-btn {
  color: var(--text-color);
  transition: all 0.3s ease;
}
.theme-btn:hover {
  transform: scale(1.1);
  color: #6366f1;
}
</style>
