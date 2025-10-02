import type { AxiosResponse } from "axios";
import api from "./api";
import type {
  Genre,
  Movie,
  MoviesFilters,
  MoviesResponse,
} from "@/types/types";
import { useMovieStore } from "@/stores/movies";
import { getFromCache, getMovieById, saveToCache } from "@/utils/movieCache";

export async function getPopularMovies(page: number = 1): Promise<Movie[]> {
  try {
    const res: AxiosResponse<MoviesResponse> = await api.get("/movie/popular", {
      params: { page },
    });
    return res.data.results;
  } catch (error) {
    console.error("Falha ao buscar filmes populares: ", error);
    return [];
  }
}

export async function getAllMovies(
  page: number = 1,
  filters: MoviesFilters = {}
): Promise<Movie[]> {
  try {
    const movieStore = useMovieStore();

    const cached = getFromCache(page, filters);
    if (cached) {
      movieStore.changeTotalPages(cached.totalPages);
      return cached.movies;
    }

    const res: AxiosResponse<MoviesResponse> = await api.get(
      "/discover/movie",
      {
        params: { page, ...filters },
      }
    );

    movieStore.changeTotalPages(res.data.total_pages);
    saveToCache(page, filters, res.data.results, res.data.total_pages);
    return res.data.results;
  } catch (error) {
    console.error("Falha ao buscar filmes: ", error);
    return [];
  }
}

export async function getAllGenres(): Promise<void> {
  try {
    const res: AxiosResponse<{ genres: Genre[] }> = await api.get(
      "/genre/movie/list",
      {
        params: { language: "pt-BR" },
      }
    );
    const movieStore = useMovieStore();
    movieStore.saveGenres(res.data.genres);
  } catch (error) {
    console.error("Falha ao buscar gêneros: ", error);
  }
}

export async function getMovieDetails(id: number): Promise<Movie> {
  try {
    const cachedMovie = getMovieById(id);
    if (cachedMovie) {
      return cachedMovie;
    }

    const res: AxiosResponse<Movie> = await api.get(`/movie/${id}`, {
      params: { language: "pt-BR" },
    });
    return res.data;
  } catch (error) {
    console.error("Falha ao buscar filmes:", error);
    return {
      id,
      title: "",
    } as Movie;
  }
}

export async function searchMovies(
  page: number = 1,
  query: string
): Promise<Movie[]> {
  try {
    const movieStore = useMovieStore();
    const filter = { title: query };
    const cached = getFromCache(page, filter);
    if (cached) {
      movieStore.changeTotalPages(cached.totalPages);
      return cached.movies;
    }

    const res: AxiosResponse<MoviesResponse> = await api.get("/search/movie", {
      params: { query, page, language: "pt-BR" },
    });
    movieStore.changeTotalPages(res.data.total_pages);
    saveToCache(page, filter, res.data.results, res.data.total_pages);
    return res.data.results;
  } catch (error) {
    console.error("Falha ao buscar filmes: ", error);
    return [];
  }
}
