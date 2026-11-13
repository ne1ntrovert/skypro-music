'use client';

import { MouseEvent, useCallback } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleLike } from '@/store/features/favoritesSlice';
import { Track } from '@/types';
import styles from './LikeButton.module.css';

type LikeButtonProps = {
  track: Track;
  className?: string;
};

export default function LikeButton({ track, className }: LikeButtonProps) {
  const dispatch = useAppDispatch();
  const isLiked = useAppSelector((state) =>
    state.favorites.tracks.some((t) => t._id === track._id),
  );

  const handleClick = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();
      dispatch(toggleLike(track));
    },
    [dispatch, track],
  );

  return (
    <svg
      className={classNames(styles.like, className, {
        [styles.like_active]: isLiked,
      })}
      onClick={handleClick}
    >
      <use href="/img/icon/sprite.svg#icon-like"></use>
    </svg>
  );
}
