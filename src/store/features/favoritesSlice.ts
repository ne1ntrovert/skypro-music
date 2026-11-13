import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ApiError,
  addFavorite,
  getFavorites,
  removeFavorite,
  withReAuth,
} from '@/api/api';
import { Track } from '@/types';
import { clearAuth, saveAuth } from '@/utils/authStorage';
import { logout, setAccessToken } from './authSlice';
import type { RootState } from '../store';

type FavoritesState = {
  tracks: Track[];
  isLoading: boolean;
  error: string | null;
};

const initialState: FavoritesState = {
  tracks: [],
  isLoading: false,
  error: null,
};

type ThunkConfig = {
  state: RootState;
  rejectValue: string;
};

const getMessage = (
  error: unknown,
  fallback: string,
  dispatch: (action: ReturnType<typeof logout>) => void,
) => {
  if (error instanceof ApiError && error.status === 401) {
    dispatch(logout());
    clearAuth();
    return 'Сессия истекла, войдите заново';
  }
  return error instanceof Error ? error.message : fallback;
};

export const fetchFavorites = createAsyncThunk<Track[], void, ThunkConfig>(
  'favorites/fetch',
  async (_, { getState, dispatch, rejectWithValue }) => {
    const { user, tokens } = getState().auth;
    if (!user || !tokens) return rejectWithValue('Нужно войти в аккаунт');
    try {
      return await withReAuth(
        tokens,
        (access) => {
          dispatch(setAccessToken(access));
          saveAuth({ user, tokens: { ...tokens, access } });
        },
        getFavorites,
      );
    } catch (error) {
      return rejectWithValue(
        getMessage(error, 'Не удалось загрузить избранное', dispatch),
      );
    }
  },
);

export const toggleLike = createAsyncThunk<
  { track: Track; isLiked: boolean },
  Track,
  ThunkConfig
>(
  'favorites/toggle',
  async (track, { getState, dispatch, rejectWithValue }) => {
    const { user, tokens } = getState().auth;
    if (!user || !tokens) {
      return rejectWithValue('Чтобы ставить лайки, нужно войти в аккаунт');
    }
    const isLiked = getState().favorites.tracks.some(
      (t) => t._id === track._id,
    );
    try {
      await withReAuth(
        tokens,
        (access) => {
          dispatch(setAccessToken(access));
          saveAuth({ user, tokens: { ...tokens, access } });
        },
        (access) =>
          isLiked
            ? removeFavorite(track._id, access)
            : addFavorite(track._id, access),
      );
      return { track, isLiked: !isLiked };
    } catch (error) {
      return rejectWithValue(
        getMessage(error, 'Не удалось изменить лайк', dispatch),
      );
    }
  },
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchFavorites.fulfilled,
        (state, action: PayloadAction<Track[]>) => {
          state.tracks = action.payload;
          state.isLoading = false;
        },
      )
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Не удалось загрузить избранное';
      })
      .addCase(toggleLike.fulfilled, (state, action) => {
        const { track, isLiked } = action.payload;
        state.tracks = isLiked
          ? [...state.tracks, track]
          : state.tracks.filter((t) => t._id !== track._id);
      })
      .addCase(toggleLike.rejected, (state, action) => {
        state.error = action.payload ?? 'Не удалось изменить лайк';
      })
      .addCase(logout, (state) => {
        state.tracks = [];
      });
  },
});

export const { clearError } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
