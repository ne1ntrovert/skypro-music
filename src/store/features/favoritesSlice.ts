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
import { getErrorMessage } from '@/utils/getErrorMessage';
import { logout, setAccessToken } from './authSlice';
import type { AppDispatch, RootState } from '../store';

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
  dispatch: AppDispatch;
  rejectValue: string;
};

type ThunkApi = {
  getState: () => RootState;
  dispatch: AppDispatch;
};

const FETCH_ERROR = 'Не удалось загрузить избранное';
const TOGGLE_ERROR = 'Не удалось изменить лайк';

export const selectIsLiked = (state: RootState, trackId: number) =>
  state.favorites.tracks.some((track) => track._id === trackId);

const requestWithAuth = async <T>(
  { getState, dispatch }: ThunkApi,
  request: (access: string) => Promise<T>,
): Promise<T> => {
  const { user, tokens } = getState().auth;
  if (!user || !tokens) throw new Error('Нужно войти в аккаунт');

  const saveAccessToken = (access: string) => {
    dispatch(setAccessToken(access));
    saveAuth({ user, tokens: { ...tokens, access } });
  };

  try {
    return await withReAuth(tokens, saveAccessToken, request);
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      dispatch(logout());
      clearAuth();
      throw new Error('Сессия истекла, войдите заново');
    }
    throw error;
  }
};

export const fetchFavorites = createAsyncThunk<Track[], void, ThunkConfig>(
  'favorites/fetch',
  async (_, thunkApi) => {
    try {
      return await requestWithAuth(thunkApi, getFavorites);
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error, FETCH_ERROR));
    }
  },
);

export const toggleLike = createAsyncThunk<
  { track: Track; isLiked: boolean },
  Track,
  ThunkConfig
>('favorites/toggle', async (track, thunkApi) => {
  const state = thunkApi.getState();
  if (!state.auth.user) {
    return thunkApi.rejectWithValue(
      'Чтобы ставить лайки, нужно войти в аккаунт',
    );
  }
  const isLiked = selectIsLiked(state, track._id);
  try {
    await requestWithAuth(thunkApi, (access) =>
      isLiked
        ? removeFavorite(track._id, access)
        : addFavorite(track._id, access),
    );
    return { track, isLiked: !isLiked };
  } catch (error) {
    return thunkApi.rejectWithValue(getErrorMessage(error, TOGGLE_ERROR));
  }
});

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
        state.error = action.payload ?? FETCH_ERROR;
      })
      .addCase(toggleLike.fulfilled, (state, action) => {
        const { track, isLiked } = action.payload;
        state.tracks = isLiked
          ? [...state.tracks, track]
          : state.tracks.filter((favorite) => favorite._id !== track._id);
      })
      .addCase(toggleLike.rejected, (state, action) => {
        state.error = action.payload ?? TOGGLE_ERROR;
      })
      .addCase(logout, (state) => {
        state.tracks = [];
      });
  },
});

export const { clearError } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
