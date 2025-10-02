import type { Origin } from "@/types/types";
import type { AxiosResponse } from "axios";
import api from "./api";

export async function getAllOrigins(): Promise<Origin[]> {
  try {
    const res: AxiosResponse<Origin[]> = await api.get(
      "/configuration/countries",
      {
        params: { language: "pt-BR" },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Falha ao buscar países de origem de filmes: ", error);
    return [];
  }
}
