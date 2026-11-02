import Filter from '@/components/Filter/Filter';
import Playlist from '@/components/Playlist/Playlist';
import { Track } from '@/types';
import styles from './Centerblock.module.css';

type CenterblockProps = {
  tracks: Track[];
};

export default function Centerblock({ tracks }: CenterblockProps) {
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
      <h2 className={styles.centerblock__h2}>Треки</h2>
      <Filter tracks={tracks} />
      <div className={styles.centerblock__content}>
        <Playlist tracks={tracks} />
      </div>
    </div>
  );
}
