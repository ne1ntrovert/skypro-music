'use client';

import classNames from 'classnames';
import Icon from '@/components/Icon/Icon';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  nextTrack,
  prevTrack,
  setIsPlaying,
  toggleShuffle,
} from '@/store/features/playerSlice';
import styles from './PlayerControls.module.css';

type PlayerControlsProps = {
  isLoop: boolean;
  onToggleLoop: () => void;
};

export default function PlayerControls({
  isLoop,
  onToggleLoop,
}: PlayerControlsProps) {
  const dispatch = useAppDispatch();
  const { isPlaying, isShuffle } = useAppSelector((state) => state.player);

  return (
    <div className={styles.player__controls}>
      <div
        className={styles.player__btnPrev}
        onClick={() => dispatch(prevTrack())}
      >
        <Icon name="icon-prev" className={styles.player__btnPrevSvg} />
      </div>
      <div
        className={styles.player__btnPlay}
        onClick={() => dispatch(setIsPlaying(!isPlaying))}
      >
        <Icon
          name={isPlaying ? 'icon-pause' : 'icon-play'}
          className={styles.player__btnPlaySvg}
        />
      </div>
      <div
        className={styles.player__btnNext}
        onClick={() => dispatch(nextTrack())}
      >
        <Icon name="icon-next" className={styles.player__btnNextSvg} />
      </div>
      <div
        className={classNames(styles.player__btnRepeat, styles.btnIcon, {
          [styles.active]: isLoop,
        })}
        onClick={onToggleLoop}
      >
        <Icon name="icon-repeat" className={styles.player__btnRepeatSvg} />
      </div>
      <div
        className={classNames(styles.player__btnShuffle, styles.btnIcon, {
          [styles.active]: isShuffle,
        })}
        onClick={() => dispatch(toggleShuffle())}
      >
        <Icon name="icon-shuffle" className={styles.player__btnShuffleSvg} />
      </div>
    </div>
  );
}
