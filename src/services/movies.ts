import type { AxiosResponse } from "axios";
import api from "./api";
import type {
  Genre,
  Movie,
  MoviesFilters,
  MoviesResponse,
} from "@/types/types";
import { useMovieStore } from "@/stores/movies";
import { getFromCache, saveToCache } from "@/utils/movieCache";

export async function getPopularMovies(page = 1): Promise<Movie[]> {
  const res: AxiosResponse<MoviesResponse> = await api.get("/movie/popular", {
    params: { page },
  });
  return res.data.results;
}

export async function getAllMovies(
  page = 1,
  filters: MoviesFilters = {}
): Promise<Movie[]> {
  const movieStore = useMovieStore();

  const cached = getFromCache(page, filters);
  if (cached) {
    movieStore.changeTotalPages(cached.totalPages);
    return cached.movies;
  }

  const res: AxiosResponse<MoviesResponse> = await api.get("/discover/movie", {
    params: { page, ...filters },
  });
  
  movieStore.changeTotalPages(res.data.total_pages);
  saveToCache(page, filters, res.data.results, res.data.total_pages);
  return res.data.results;
}

export async function getAllGenres(): Promise<void> {
  const res: AxiosResponse<{ genres: Genre[] }> = await api.get(
    "/genre/movie/list",
    {
      params: { language: "pt-BR" },
    }
  );
  const movieStore = useMovieStore();
  movieStore.saveGenres(res.data.genres);
}

export async function getMovieDetails(id: number): Promise<Movie> {
  const res: AxiosResponse<Movie> = await api.get(
    `/movie/${id}`,
    {
      params: { language: "pt-BR" },
    }
  );
  return res.data;
}
