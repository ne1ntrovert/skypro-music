'use client';

import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCurrentTrack } from '@/store/features/playerSlice';
import { Track } from '@/types';
import styles from './Track.module.css';

type TrackProps = {
  track: Track;
};

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${minutes}:${rest.toString().padStart(2, '0')}`;
};

export default function TrackItem({ track }: TrackProps) {
  const dispatch = useAppDispatch();
  const { currentTrack, isPlaying } = useAppSelector((state) => state.player);
  const isCurrent = currentTrack?._id === track._id;

  return (
    <div
      className={styles.playlist__item}
      onClick={() => dispatch(setCurrentTrack(track))}
    >
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
          <svg className={styles.track__timeSvg}>
            <use href="/img/icon/sprite.svg#icon-like"></use>
          </svg>
          <span className={styles.track__timeText}>
            {formatTime(track.duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
}
