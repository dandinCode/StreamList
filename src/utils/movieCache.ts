import type { CachedPage, Movie, MoviesFilters } from "@/types/types";

interface CacheData {
  cache: Record<string, CachedPage>;
  order: string[];
}

const CACHE_KEY = "movieCache";
const MAX_PAGES = 5;

function normalizeFilters(filters?: MoviesFilters): Record<string, string> {
  if (!filters) return {};
  return (Object.keys(filters) as (keyof MoviesFilters)[])
    .sort()
    .filter((k) => filters[k] !== undefined && filters[k] !== "")
    .reduce((acc, k) => {
      acc[k] = filters[k] as string;
      return acc;
    }, {} as Record<string, string>);
}

function getCacheKey(page: number, filters?: MoviesFilters): string {
  const norm = normalizeFilters(filters);
  const filterString = Object.entries(norm)
    .map(([k, v]) => `${k}=${v}`)
    .join(";");
  return `movies:page=${page};${filterString}`;
}

function loadCache(): CacheData {
  const raw = sessionStorage.getItem(CACHE_KEY);
  return raw ? JSON.parse(raw) : { cache: {}, order: [] };
}

function saveCache(data: CacheData) {
  sessionStorage.setItem(CACHE_KEY, JSON.stringify(data));
}

export function getFromCache(
  page: number,
  filters?: MoviesFilters
): CachedPage | null {
  const key = getCacheKey(page, filters);
  const data = loadCache();

  const entry = data.cache[key];
  if (entry) {
    data.order = data.order.filter((k) => k !== key);
    data.order.push(key);
    saveCache(data);
    return entry;
  }
  return null;
}

export function saveToCache(
  page: number,
  filters: MoviesFilters | undefined,
  movies: Movie[],
  totalPages: number
) {
  const key = getCacheKey(page, filters);
  const data = loadCache();

  const entry: CachedPage = { movies, totalPages };
  data.cache[key] = entry;

  data.order = data.order.filter((k) => k !== key);
  data.order.push(key);

  if (data.order.length > MAX_PAGES) {
    const oldestKey = data.order.shift();
    if (oldestKey) {
      delete data.cache[oldestKey];
    }
  }

  saveCache(data);
}
