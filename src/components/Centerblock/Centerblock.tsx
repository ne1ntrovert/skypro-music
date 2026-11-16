'use client';

import { useCallback, useMemo, useState } from 'react';
import Filter from '@/components/Filter/Filter';
import Playlist from '@/components/Playlist/Playlist';
import Loader from '@/components/Loader/Loader';
import { Track } from '@/types';
import { Filters, defaultFilters, filterTracks } from '@/utils/filterTracks';
import styles from './Centerblock.module.css';

type CenterblockProps = {
  title: string;
  tracks: Track[];
  isLoading?: boolean;
  error?: string;
};

export default function Centerblock({
  title,
  tracks,
  isLoading,
  error,
}: CenterblockProps) {
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const filteredTracks = useMemo(
    () => filterTracks(tracks, filters),
    [tracks, filters],
  );

  const updateFilters = useCallback((changes: Partial<Filters>) => {
    setFilters((current) => ({ ...current, ...changes }));
  }, []);

  const isEmpty = !isLoading && !error && filteredTracks.length === 0;

  return (
    <div className={styles.centerblock}>
      <div className={styles.centerblock__search}>
        <svg className={styles.search__svg}>
          <use href="/img/icon/sprite.svg#icon-search"></use>
        </svg>
        <input
          className={styles.search__text}
          type="search"
          placeholder="Поиск"
          name="search"
          value={filters.search}
          onChange={(event) => updateFilters({ search: event.target.value })}
        />
      </div>
      <h2 className={styles.centerblock__h2}>{title}</h2>
      <Filter tracks={tracks} filters={filters} onChange={updateFilters} />
      <div className={styles.centerblock__content}>
        {isLoading && <Loader />}
        {error && <p className={styles.centerblock__error}>{error}</p>}
        {isEmpty && (
          <p className={styles.centerblock__empty}>Нет подходящих треков</p>
        )}
        {!isLoading && !error && !isEmpty && (
          <Playlist tracks={filteredTracks} />
        )}
      </div>
    </div>
  );
}
