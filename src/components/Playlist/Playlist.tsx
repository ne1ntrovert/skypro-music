import Icon from '@/components/Icon/Icon';
import TrackItem from '@/components/TrackItem/TrackItem';
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
          <Icon name="icon-watch" className={styles.playlistTitle__svg} />
        </div>
      </div>
      <div className={styles.content__playlist}>
        {tracks.map((track) => (
          <TrackItem key={track._id} track={track} playlist={tracks} />
        ))}
      </div>
    </>
  );
}
