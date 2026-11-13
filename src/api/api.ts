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

type RequestOptions = {
  method?: 'GET' | 'POST' | 'DELETE';
  body?: object;
  access?: string;
};

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

const getErrorMessage = (body: ErrorBody) => {
  const errors = body.data?.errors;
  if (errors) return Object.values(errors).flat().join(' ');
  return body.message || 'Что-то пошло не так, попробуйте позже';
};

const request = async <T>(
  url: string,
  { method = 'GET', body, access }: RequestOptions = {},
): Promise<T> => {
  const headers: Record<string, string> = {
    'content-type': 'application/json',
  };
  if (access) headers.Authorization = `Bearer ${access}`;
  const response = await fetch(BASE_URL + url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  });
  const result = await response.json();
  if (!response.ok)
    throw new ApiError(response.status, getErrorMessage(result));
  return result;
};

export const getTracks = async (): Promise<Track[]> => {
  const body = await request<ApiResponse<Track[]>>('/catalog/track/all/');
  return body.data;
};

export const getSelection = async (id: string): Promise<Selection | null> => {
  const body = await request<ApiResponse<Selection | null>>(
    `/catalog/selection/${id}/`,
  );
  return body.data;
};

export const login = (email: string, password: string): Promise<User> =>
  request<User>('/user/login/', { method: 'POST', body: { email, password } });

export const getTokens = (email: string, password: string): Promise<Tokens> =>
  request<Tokens>('/user/token/', {
    method: 'POST',
    body: { email, password },
  });

export const refreshToken = (refresh: string): Promise<{ access: string }> =>
  request<{ access: string }>('/user/token/refresh/', {
    method: 'POST',
    body: { refresh },
  });

export const signup = async (
  email: string,
  password: string,
  username: string,
): Promise<User> => {
  const body = await request<{ result: User }>('/user/signup/', {
    method: 'POST',
    body: { email, password, username },
  });
  return body.result;
};

export const getFavorites = async (access: string): Promise<Track[]> => {
  const body = await request<ApiResponse<Track[]>>(
    '/catalog/track/favorite/all/',
    { access },
  );
  return body.data;
};

export const addFavorite = (id: number, access: string): Promise<unknown> =>
  request(`/catalog/track/${id}/favorite/`, { method: 'POST', access });

export const removeFavorite = (id: number, access: string): Promise<unknown> =>
  request(`/catalog/track/${id}/favorite/`, { method: 'DELETE', access });

export const withReAuth = async <T>(
  tokens: Tokens,
  onAccessUpdate: (access: string) => void,
  fn: (access: string) => Promise<T>,
): Promise<T> => {
  try {
    return await fn(tokens.access);
  } catch (error) {
    if (!(error instanceof ApiError) || error.status !== 401) throw error;
    const { access } = await refreshToken(tokens.refresh);
    onAccessUpdate(access);
    return fn(access);
  }
};
