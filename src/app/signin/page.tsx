'use client';

import { useRouter } from 'next/navigation';
import AuthForm, { AuthFormValues } from '@/components/AuthForm/AuthForm';
import { getTokens, login } from '@/api/api';
import { useAppDispatch } from '@/store/hooks';
import { setAuth } from '@/store/features/authSlice';
import { fetchFavorites } from '@/store/features/favoritesSlice';
import { saveAuth } from '@/utils/authStorage';

export default function Signin() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async ({ email, password }: AuthFormValues) => {
    const user = await login(email, password);
    const tokens = await getTokens(email, password);
    saveAuth({ user, tokens });
    dispatch(setAuth({ user, tokens }));
    dispatch(fetchFavorites());
    router.push('/');
  };

  return <AuthForm mode="signin" onSubmit={handleSubmit} />;
}
