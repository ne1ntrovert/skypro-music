import { configureStore } from '@reduxjs/toolkit';
import { playerReducer } from './features/playerSlice';
import { authReducer } from './features/authSlice';
import { favoritesReducer } from './features/favoritesSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      player: playerReducer,
      auth: authReducer,
      favorites: favoritesReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
