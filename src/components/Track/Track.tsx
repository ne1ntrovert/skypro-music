'use client';

import { useCallback } from 'react';
import classNames from 'classnames';
import LikeButton from '@/components/LikeButton/LikeButton';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCurrentTrack } from '@/store/features/playerSlice';
import { formatTime } from '@/utils/formatTime';
import { Track } from '@/types';
import styles from './Track.module.css';

type TrackProps = {
  track: Track;
  playlist: Track[];
};

export default function TrackItem({ track, playlist }: TrackProps) {
  const dispatch = useAppDispatch();
  const { currentTrack, isPlaying } = useAppSelector((state) => state.player);
  const isCurrent = currentTrack?._id === track._id;

  const handleClick = useCallback(() => {
    dispatch(setCurrentTrack({ track, playlist }));
  }, [dispatch, track, playlist]);

  return (
    <div className={styles.playlist__item} onClick={handleClick}>
      <div className={styles.playlist__track}>
        <div className={styles.track__title}>
          <div className={styles.track__titleImage}>
            {isCurrent ? (
              <div
                className={classNames(styles.track__dot, {
                  [styles.track__dotPulse]: isPlaying,
                })}
              ></div>
            ) : (
              <svg className={styles.track__titleSvg}>
                <use href="/img/icon/sprite.svg#icon-note"></use>
              </svg>
            )}
          </div>
          <div className={styles.track__titleText}>
            <span className={styles.track__titleLink}>
              {track.name} <span className={styles.track__titleSpan}></span>
            </span>
          </div>
        </div>
        <div className={styles.track__author}>
          <span className={styles.track__authorLink}>{track.author}</span>
        </div>
        <div className={styles.track__album}>
          <span className={styles.track__albumLink}>{track.album}</span>
        </div>
        <div className={styles.track__time}>
          <LikeButton track={track} className={styles.track__like} />
          <span className={styles.track__timeText}>
            {formatTime(track.duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
}
