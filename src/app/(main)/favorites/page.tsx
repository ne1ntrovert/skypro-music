'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Centerblock from '@/components/Centerblock/Centerblock';
import { useAppSelector } from '@/store/hooks';

export default function FavoritesPage() {
  const router = useRouter();
  const { user, isReady } = useAppSelector((state) => state.auth);
  const { tracks, isLoading } = useAppSelector((state) => state.favorites);
  const hadUser = useRef(false);

  useEffect(() => {
    if (user) hadUser.current = true;
  }, [user]);

  useEffect(() => {
    if (isReady && !user) router.replace(hadUser.current ? '/' : '/signin');
  }, [isReady, user, router]);

  if (!user || isLoading) {
    return <Centerblock title="Мои треки" tracks={[]} isLoading />;
  }

  return <Centerblock title="Мои треки" tracks={tracks} />;
}
