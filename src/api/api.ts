import { Selection, Tokens, Track, User } from '@/types';

const BASE_URL = 'https://webdev-music-003b5b991590.herokuapp.com';

type ApiResponse<T> = {
  success: boolean;
  data: T;
};

type ErrorBody = {
  message?: string;
  data?: { errors?: Record<string, string[]> };
};

const getErrorMessage = (body: ErrorBody) => {
  const errors = body.data?.errors;
  if (errors) return Object.values(errors).flat().join(' ');
  return body.message || 'Что-то пошло не так, попробуйте позже';
};

const request = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(BASE_URL + url, {
    ...options,
    headers: { 'content-type': 'application/json' },
  });
  const body = await response.json();
  if (!response.ok) throw new Error(getErrorMessage(body));
  return body;
};

export const getTracks = async (): Promise<Track[]> => {
  const body = await request<ApiResponse<Track[]>>('/catalog/track/all/', {
    cache: 'no-store',
  });
  return body.data;
};

export const getSelection = async (id: string): Promise<Selection | null> => {
  const body = await request<ApiResponse<Selection | null>>(
    `/catalog/selection/${id}/`,
    { cache: 'no-store' },
  );
  return body.data;
};

export const login = (email: string, password: string): Promise<User> =>
  request<User>('/user/login/', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

export const getTokens = (email: string, password: string): Promise<Tokens> =>
  request<Tokens>('/user/token/', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

export const signup = async (
  email: string,
  password: string,
  username: string,
): Promise<User> => {
  const body = await request<{ result: User }>('/user/signup/', {
    method: 'POST',
    body: JSON.stringify({ email, password, username }),
  });
  return body.result;
};
