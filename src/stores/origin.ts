import type { Origin } from "@/types/types";
import { defineStore } from "pinia";

export const useOriginStore = defineStore("origin", {
  state: () => ({
    origins: [] as Origin[],
  }),
  actions: {
    saveOrigins(origins: Origin[]) {
      const sorted = [...origins].sort((a, b) =>
        a.native_name.localeCompare(b.native_name)
      );

      this.origins = sorted;
      sessionStorage.setItem("origins", JSON.stringify(sorted));
    },
    async loadOrigins() {
      const origins = sessionStorage.getItem("origins");
      if (origins) {
        this.origins = JSON.parse(origins);
      }
    },
  },
});
