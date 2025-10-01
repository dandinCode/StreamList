export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  release_date?: string;
  adult: boolean;
  vote_count?: string;
  vote_average?: string;
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface MoviesFilters {
  title?: string;
  original_title?: string;
  with_genres?: string;
  with_origin_country?: string;
}

export interface Origin {
  iso_3166_1: string;
  native_name: string;
  english_name: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface CachedPage {
  movies: Movie[];
  totalPages: number;
}
