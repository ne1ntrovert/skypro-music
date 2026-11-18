'use client';

import Icon from '@/components/Icon/Icon';
import LikeButton from '@/components/LikeButton/LikeButton';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectIsLiked, toggleLike } from '@/store/features/favoritesSlice';
import { Track } from '@/types';
import styles from './TrackPlay.module.css';

type TrackPlayProps = {
  track: Track;
};

export default function TrackPlay({ track }: TrackPlayProps) {
  const dispatch = useAppDispatch();
  const isLiked = useAppSelector((state) => selectIsLiked(state, track._id));

  const handleDislike = () => {
    if (isLiked) dispatch(toggleLike(track));
  };

  return (
    <div className={styles.player__trackPlay}>
      <div className={styles.trackPlay__contain}>
        <div className={styles.trackPlay__image}>
          <Icon name="icon-note" className={styles.trackPlay__svg} />
        </div>
        <div className={styles.trackPlay__author}>
          <span className={styles.trackPlay__authorLink}>{track.name}</span>
        </div>
        <div className={styles.trackPlay__album}>
          <span className={styles.trackPlay__albumLink}>{track.author}</span>
        </div>
      </div>

      <div className={styles.trackPlay__likeDis}>
        <div className={styles.trackPlay__like}>
          <LikeButton track={track} />
        </div>
        <div className={styles.trackPlay__dislike} onClick={handleDislike}>
          <Icon name="icon-dislike" className={styles.trackPlay__dislikeSvg} />
        </div>
      </div>
    </div>
  );
}
