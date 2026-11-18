'use client';

import { MouseEvent, useCallback } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectIsLiked, toggleLike } from '@/store/features/favoritesSlice';
import Icon from '@/components/Icon/Icon';
import { Track } from '@/types';
import styles from './LikeButton.module.css';

type LikeButtonProps = {
  track: Track;
  className?: string;
};

export default function LikeButton({ track, className }: LikeButtonProps) {
  const dispatch = useAppDispatch();
  const isLiked = useAppSelector((state) => selectIsLiked(state, track._id));

  const handleClick = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();
      dispatch(toggleLike(track));
    },
    [dispatch, track],
  );

  return (
    <Icon
      name="icon-like"
      className={classNames(styles.like, className, {
        [styles.like_active]: isLiked,
      })}
      onClick={handleClick}
    />
  );
}
