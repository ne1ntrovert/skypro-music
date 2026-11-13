'use client';

import { useCallback, useMemo, useState } from 'react';
import classNames from 'classnames';
import { Track } from '@/types';
import styles from './Filter.module.css';

type FilterProps = {
  tracks: Track[];
};

type FilterName = 'author' | 'year' | 'genre';

type FilterItem = {
  name: FilterName;
  title: string;
  items: string[];
};

export default function Filter({ tracks }: FilterProps) {
  const [activeFilter, setActiveFilter] = useState<FilterName | null>(null);

  const filters = useMemo<FilterItem[]>(
    () => [
      {
        name: 'author',
        title: 'исполнителю',
        items: [...new Set(tracks.map((track) => track.author))],
      },
      {
        name: 'year',
        title: 'году выпуска',
        items: ['По умолчанию', 'Сначала новые', 'Сначала старые'],
      },
      {
        name: 'genre',
        title: 'жанру',
        items: [...new Set(tracks.flatMap((track) => track.genre))],
      },
    ],
    [tracks],
  );

  const toggleFilter = useCallback((name: FilterName) => {
    setActiveFilter((current) => (current === name ? null : name));
  }, []);

  return (
    <div className={styles.centerblock__filter}>
      <div className={styles.filter__title}>Искать по:</div>
      {filters.map((filter) => (
        <div key={filter.name} className={styles.filter__wrapper}>
          <div
            className={classNames(styles.filter__button, {
              [styles.active]: activeFilter === filter.name,
            })}
            onClick={() => toggleFilter(filter.name)}
          >
            {filter.title}
          </div>
          {activeFilter === filter.name && (
            <div className={styles.filter__popup}>
              <ul className={styles.filter__list}>
                {filter.items.map((item) => (
                  <li key={item} className={styles.filter__item}>
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
