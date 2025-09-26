export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  release_date?: string;
  adult: boolean;
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
  release_date?: string;
  with_origin_country?: string;
  adult?: boolean;
  with_original_language?: string;
}

export interface Language {
  iso_639_1: string;
  english_name: string;
  name: string;
}

export interface Genre {
  id: number;
  name: string;
}
