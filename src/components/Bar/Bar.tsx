'use client';

import { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setIsPlaying } from '@/store/features/playerSlice';
import styles from './Bar.module.css';

export default function Bar() {
  const dispatch = useAppDispatch();
  const { currentTrack, isPlaying } = useAppSelector((state) => state.player);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch(() => dispatch(setIsPlaying(false)));
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrack, dispatch]);

  if (!currentTrack) return null;

  const playIcon = isPlaying ? 'icon-pause' : 'icon-play';

  return (
    <div className={styles.bar}>
      <audio
        ref={audioRef}
        src={currentTrack.track_file}
        onEnded={() => dispatch(setIsPlaying(false))}
      ></audio>
      <div className={styles.bar__content}>
        <div className={styles.bar__playerProgress}></div>
        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <div className={styles.player__controls}>
              <div className={styles.player__btnPrev}>
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
              <div className={styles.player__btnNext}>
                <svg className={styles.player__btnNextSvg}>
                  <use href="/img/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>
              <div
                className={classNames(styles.player__btnRepeat, styles.btnIcon)}
              >
                <svg className={styles.player__btnRepeatSvg}>
                  <use href="/img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </div>
              <div
                className={classNames(
                  styles.player__btnShuffle,
                  styles.btnIcon,
                )}
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
                <div
                  className={classNames(styles.trackPlay__like, styles.btnIcon)}
                >
                  <svg className={styles.trackPlay__likeSvg}>
                    <use href="/img/icon/sprite.svg#icon-like"></use>
                  </svg>
                </div>
                <div
                  className={classNames(
                    styles.trackPlay__dislike,
                    styles.btnIcon,
                  )}
                >
                  <svg className={styles.trackPlay__dislikeSvg}>
                    <use href="/img/icon/sprite.svg#icon-dislike"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bar__volumeBlock}>
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
                  defaultValue={1}
                  onChange={(event) => {
                    if (audioRef.current) {
                      audioRef.current.volume = Number(event.target.value);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
