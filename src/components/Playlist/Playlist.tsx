import TrackItem from '@/components/Track/Track';
import { Track } from '@/types';
import styles from './Playlist.module.css';

type PlaylistProps = {
  tracks: Track[];
};

export default function Playlist({ tracks }: PlaylistProps) {
  return (
    <>
      <div className={styles.content__title}>
        <div className={styles.col01}>Трек</div>
        <div className={styles.col02}>Исполнитель</div>
        <div className={styles.col03}>Альбом</div>
        <div className={styles.col04}>
          <svg className={styles.playlistTitle__svg}>
            <use href="/img/icon/sprite.svg#icon-watch"></use>
          </svg>
        </div>
      </div>
      <div className={styles.content__playlist}>
        {tracks.map((track) => (
          <TrackItem key={track._id} track={track} />
        ))}
      </div>
    </>
  );
}
