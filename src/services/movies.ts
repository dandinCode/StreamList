import type { AxiosResponse } from "axios";
import api from "./api";
import type { Movie, MoviesResponse } from "@/types/types";

export async function getPopularMovies(page = 1): Promise<Movie[]> {
  const res: AxiosResponse<MoviesResponse> = await api.get("/movie/popular", {
    params: { page },
  });
  return res.data.results;
}
