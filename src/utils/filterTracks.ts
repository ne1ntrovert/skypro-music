import { Track } from '@/types';

export type SortOrder = 'default' | 'new' | 'old';

export type Filters = {
  search: string;
  authors: string[];
  genres: string[];
  sort: SortOrder;
};

export const defaultFilters: Filters = {
  search: '',
  authors: [],
  genres: [],
  sort: 'default',
};

export const getAuthors = (tracks: Track[]) => [
  ...new Set(tracks.map((track) => track.author)),
];

export const getGenres = (tracks: Track[]) => [
  ...new Set(tracks.flatMap((track) => track.genre)),
];

export const toggleItem = (list: string[], item: string) =>
  list.includes(item) ? list.filter((i) => i !== item) : [...list, item];

export const filterTracks = (tracks: Track[], filters: Filters) => {
  const search = filters.search.trim().toLowerCase();
  const result = tracks.filter(
    (track) =>
      track.name.toLowerCase().startsWith(search) &&
      (filters.authors.length === 0 ||
        filters.authors.includes(track.author)) &&
      (filters.genres.length === 0 ||
        track.genre.some((genre) => filters.genres.includes(genre))),
  );
  if (filters.sort === 'default') return result;
  const direction = filters.sort === 'new' ? -1 : 1;
  return [...result].sort(
    (a, b) => direction * a.release_date.localeCompare(b.release_date),
  );
};
