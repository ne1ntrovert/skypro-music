'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearError } from '@/store/features/favoritesSlice';
import styles from './Notification.module.css';

export default function Notification() {
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.favorites.error);

  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => dispatch(clearError()), 4000);
    return () => clearTimeout(timer);
  }, [error, dispatch]);

  if (!error) return null;

  return <div className={styles.notification}>{error}</div>;
}
