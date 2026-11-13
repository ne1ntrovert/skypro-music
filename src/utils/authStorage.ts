import { Tokens, User } from '@/types';

export type AuthData = {
  user: User;
  tokens: Tokens;
};

export const saveAuth = (auth: AuthData) => {
  localStorage.setItem('user', JSON.stringify(auth.user));
  localStorage.setItem('tokens', JSON.stringify(auth.tokens));
};

export const loadAuth = (): AuthData | null => {
  try {
    const user = localStorage.getItem('user');
    const tokens = localStorage.getItem('tokens');
    if (!user || !tokens) return null;
    return { user: JSON.parse(user), tokens: JSON.parse(tokens) };
  } catch {
    return null;
  }
};

export const clearAuth = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('tokens');
};
