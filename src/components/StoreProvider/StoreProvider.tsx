'use client';

import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from '@/store/store';
import { setAuth } from '@/store/features/authSlice';
import { fetchFavorites } from '@/store/features/favoritesSlice';
import { loadAuth } from '@/utils/authStorage';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [store] = useState(makeStore);

  useEffect(() => {
    const auth = loadAuth();
    store.dispatch(setAuth(auth));
    if (auth) store.dispatch(fetchFavorites());
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
}
