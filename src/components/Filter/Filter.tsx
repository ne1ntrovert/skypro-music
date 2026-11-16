'use client';

import { useCallback, useMemo, useState } from 'react';
import classNames from 'classnames';
import { Track } from '@/types';
import {
  Filters,
  SortOrder,
  getAuthors,
  getGenres,
  toggleItem,
} from '@/utils/filterTracks';
import styles from './Filter.module.css';

type FilterProps = {
  tracks: Track[];
  filters: Filters;
  onChange: (changes: Partial<Filters>) => void;
};

type FilterName = 'author' | 'year' | 'genre';

type FilterItem = {
  name: FilterName;
  title: string;
  items: string[];
  selected: string[];
  count: number;
  onSelect: (item: string) => void;
};

const sortOptions: { value: SortOrder; label: string }[] = [
  { value: 'default', label: 'По умолчанию' },
  { value: 'new', label: 'Сначала новые' },
  { value: 'old', label: 'Сначала старые' },
];

export default function Filter({ tracks, filters, onChange }: FilterProps) {
  const [activeFilter, setActiveFilter] = useState<FilterName | null>(null);

  const authors = useMemo(() => getAuthors(tracks), [tracks]);
  const genres = useMemo(() => getGenres(tracks), [tracks]);

  const items: FilterItem[] = useMemo(
    () => [
      {
        name: 'author',
        title: 'исполнителю',
        items: authors,
        selected: filters.authors,
        count: filters.authors.length,
        onSelect: (item) =>
          onChange({ authors: toggleItem(filters.authors, item) }),
      },
      {
        name: 'year',
        title: 'году выпуска',
        items: sortOptions.map((option) => option.label),
        selected: sortOptions
          .filter((option) => option.value === filters.sort)
          .map((option) => option.label),
        count: 0,
        onSelect: (label) =>
          onChange({
            sort:
              sortOptions.find((option) => option.label === label)?.value ??
              'default',
          }),
      },
      {
        name: 'genre',
        title: 'жанру',
        items: genres,
        selected: filters.genres,
        count: filters.genres.length,
        onSelect: (item) =>
          onChange({ genres: toggleItem(filters.genres, item) }),
      },
    ],
    [authors, genres, filters, onChange],
  );

  const toggleFilter = useCallback((name: FilterName) => {
    setActiveFilter((current) => (current === name ? null : name));
  }, []);

  return (
    <div className={styles.centerblock__filter}>
      <div className={styles.filter__title}>Искать по:</div>
      {items.map((filter) => (
        <div key={filter.name} className={styles.filter__wrapper}>
          <div
            className={classNames(styles.filter__button, {
              [styles.active]: activeFilter === filter.name,
            })}
            onClick={() => toggleFilter(filter.name)}
          >
            {filter.title}
            {filter.count > 0 && (
              <span className={styles.filter__count}>{filter.count}</span>
            )}
          </div>
          {activeFilter === filter.name && (
            <div className={styles.filter__popup}>
              <ul className={styles.filter__list}>
                {filter.items.map((item) => (
                  <li
                    key={item}
                    className={classNames(styles.filter__item, {
                      [styles.filter__item_selected]:
                        filter.selected.includes(item),
                    })}
                    onClick={() => filter.onSelect(item)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
