import type { Origin } from "@/types/types";
import type { AxiosResponse } from "axios";
import api from "./api";
import { useOriginStore } from "@/stores/origin.ts";

export async function getAllOrigins(): Promise<void> {
  try {
    const res: AxiosResponse<Origin[]> = await api.get(
      "/configuration/countries",
      {
        params: { language: "pt-BR" },
      }
    );
    const OriginStore = useOriginStore();
    OriginStore.saveOrigins(res.data);
  } catch (error) {
    console.error("Falha ao buscar países de origem de filmes: ", error);
  }
}
