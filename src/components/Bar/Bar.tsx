'use client';

import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  nextTrack,
  prevTrack,
  setIsPlaying,
  toggleShuffle,
} from '@/store/features/playerSlice';
import { toggleLike } from '@/store/features/favoritesSlice';
import { formatTime } from '@/utils/formatTime';
import LikeButton from '@/components/LikeButton/LikeButton';
import styles from './Bar.module.css';

export default function Bar() {
  const dispatch = useAppDispatch();
  const { currentTrack, isPlaying, isShuffle } = useAppSelector(
    (state) => state.player,
  );
  const isLiked = useAppSelector((state) =>
    state.favorites.tracks.some((t) => t._id === currentTrack?._id),
  );
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isLoop, setIsLoop] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch((error: DOMException) => {
        if (error.name !== 'AbortError') dispatch(setIsPlaying(false));
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrack, dispatch]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume, currentTrack]);

  if (!currentTrack) return null;

  const playIcon = isPlaying ? 'icon-pause' : 'icon-play';
  const progress = duration ? (currentTime / duration) * 100 : 0;

  const handleEnded = () => {
    dispatch(setIsPlaying(false));
    dispatch(nextTrack());
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(event.target.value);
    if (audioRef.current) audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const handleDislike = () => {
    if (isLiked) dispatch(toggleLike(currentTrack));
  };

  return (
    <div className={styles.bar}>
      <audio
        ref={audioRef}
        src={currentTrack.track_file}
        loop={isLoop}
        onEnded={handleEnded}
        onTimeUpdate={(event) =>
          setCurrentTime(event.currentTarget.currentTime)
        }
        onLoadedMetadata={(event) => {
          setDuration(event.currentTarget.duration);
          setCurrentTime(event.currentTarget.currentTime);
        }}
      ></audio>
      <div className={styles.bar__content}>
        <input
          className={styles.bar__playerProgress}
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={currentTime}
          onChange={handleSeek}
          style={{
            background: `linear-gradient(to right, #b672ff ${progress}%, #2e2e2e ${progress}%)`,
          }}
        />
        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <div className={styles.player__controls}>
              <div
                className={classNames(styles.player__btnPrev, styles.btn)}
                onClick={() => dispatch(prevTrack())}
              >
                <svg className={styles.player__btnPrevSvg}>
                  <use href="/img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>
              <div
                className={classNames(styles.player__btnPlay, styles.btn)}
                onClick={() => dispatch(setIsPlaying(!isPlaying))}
              >
                <svg className={styles.player__btnPlaySvg}>
                  <use href={'/img/icon/sprite.svg#' + playIcon}></use>
                </svg>
              </div>
              <div
                className={classNames(styles.player__btnNext, styles.btn)}
                onClick={() => dispatch(nextTrack())}
              >
                <svg className={styles.player__btnNextSvg}>
                  <use href="/img/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>
              <div
                className={classNames(
                  styles.player__btnRepeat,
                  styles.btnIcon,
                  {
                    [styles.active]: isLoop,
                  },
                )}
                onClick={() => setIsLoop(!isLoop)}
              >
                <svg className={styles.player__btnRepeatSvg}>
                  <use href="/img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </div>
              <div
                className={classNames(
                  styles.player__btnShuffle,
                  styles.btnIcon,
                  { [styles.active]: isShuffle },
                )}
                onClick={() => dispatch(toggleShuffle())}
              >
                <svg className={styles.player__btnShuffleSvg}>
                  <use href="/img/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </div>
            </div>

            <div className={styles.player__trackPlay}>
              <div className={styles.trackPlay__contain}>
                <div className={styles.trackPlay__image}>
                  <svg className={styles.trackPlay__svg}>
                    <use href="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className={styles.trackPlay__author}>
                  <span className={styles.trackPlay__authorLink}>
                    {currentTrack.name}
                  </span>
                </div>
                <div className={styles.trackPlay__album}>
                  <span className={styles.trackPlay__albumLink}>
                    {currentTrack.author}
                  </span>
                </div>
              </div>

              <div className={styles.trackPlay__likeDis}>
                <div className={styles.trackPlay__like}>
                  <LikeButton track={currentTrack} />
                </div>
                <div
                  className={classNames(
                    styles.trackPlay__dislike,
                    styles.btnIcon,
                  )}
                  onClick={handleDislike}
                >
                  <svg className={styles.trackPlay__dislikeSvg}>
                    <use href="/img/icon/sprite.svg#icon-dislike"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bar__volumeBlock}>
            <div className={styles.bar__time}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
            <div className={styles.volume__content}>
              <div className={styles.volume__image}>
                <svg className={styles.volume__svg}>
                  <use href="/img/icon/sprite.svg#icon-volume"></use>
                </svg>
              </div>
              <div className={classNames(styles.volume__progress, styles.btn)}>
                <input
                  className={classNames(
                    styles.volume__progressLine,
                    styles.btn,
                  )}
                  type="range"
                  name="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={(event) => setVolume(Number(event.target.value))}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
