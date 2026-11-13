import Filter from '@/components/Filter/Filter';
import Playlist from '@/components/Playlist/Playlist';
import Loader from '@/components/Loader/Loader';
import { Track } from '@/types';
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
        />
      </div>
      <h2 className={styles.centerblock__h2}>{title}</h2>
      <Filter tracks={tracks} />
      <div className={styles.centerblock__content}>
        {isLoading && <Loader />}
        {error && <p className={styles.centerblock__error}>{error}</p>}
        {!isLoading && !error && <Playlist tracks={tracks} />}
      </div>
    </div>
  );
}
