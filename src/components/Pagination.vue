<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "Pagination",
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  emits: ["changePage"],
  methods: {
    change(page: number) {
      this.$emit("changePage", page);
    },
  },
});
</script>

<template>
  <div class="d-flex justify-content-center align-items-center gap-2 mt-3 pb-9">
    <button
      v-if="currentPage - 2 > 0"
      class="btn btn-outline-primary"
      @click="change(currentPage - 2)"
    >
      {{ currentPage - 2 }}
    </button>

    <button
      v-if="currentPage - 1 > 0"
      class="btn btn-outline-primary"
      @click="change(currentPage - 1)"
    >
      {{ currentPage - 1 }}
    </button>

    <button class="btn btn-primary fw-bold" disabled>
      {{ currentPage }}
    </button>

    <button
      v-if="currentPage + 1 <= totalPages"
      class="btn btn-outline-primary"
      @click="change(currentPage + 1)"
    >
      {{ currentPage + 1 }}
    </button>

    <button
      v-if="currentPage + 2 <= totalPages"
      class="btn btn-outline-primary"
      @click="change(currentPage + 2)"
    >
      {{ currentPage + 2 }}
    </button>
  </div>
</template>
