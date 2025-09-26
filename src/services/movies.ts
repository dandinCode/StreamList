import type { AxiosResponse } from "axios";
import api from "./api";
import type { Movie, MoviesResponse } from "@/types/types";
import { useMovieStore } from "@/stores/movies";

const movieStore = useMovieStore();

export async function getPopularMovies(page = 1): Promise<Movie[]> {
  const res: AxiosResponse<MoviesResponse> = await api.get("/movie/popular", {
    params: { page },
  });
  return res.data.results;
}

export async function getAllMovies(page = 1): Promise<Movie[]> {
  const res: AxiosResponse<MoviesResponse> = await api.get("/discover/movie", {
    params: { page },
  });
  movieStore.changeTotalPages(res.data.total_pages)
  return res.data.results;
}
