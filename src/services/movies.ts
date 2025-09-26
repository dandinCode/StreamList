import type { AxiosResponse } from "axios";
import api from "./api";
import type {
    Genre,
  Language,
  Movie,
  MoviesFilters,
  MoviesResponse,
} from "@/types/types";
import { useMovieStore } from "@/stores/movies";

const movieStore = useMovieStore();

export async function getPopularMovies(page = 1): Promise<Movie[]> {
  const res: AxiosResponse<MoviesResponse> = await api.get("/movie/popular", {
    params: { page },
  });
  return res.data.results;
}

export async function getAllMovies(
  page = 1,
  filters?: MoviesFilters
): Promise<Movie[]> {
  const res: AxiosResponse<MoviesResponse> = await api.get("/discover/movie", {
    params: { page, ...filters },
  });
  movieStore.changeTotalPages(res.data.total_pages);
  return res.data.results;
}

export async function getAllLanguages(): Promise<Language[]> {
  const res: AxiosResponse<Language[]> = await api.get(
    "/configuration/languages",
    {}
  );
  return res.data;
}

export async function getAllGenres(): Promise<Genre[]> {
  const res: AxiosResponse<Genre[]> = await api.get("/genre/movie/list", {
    params: { language: "pt-BR" },
  });
  return res.data;
}
