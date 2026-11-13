import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tokens, User } from '@/types';
import { AuthData } from '@/utils/authStorage';

type AuthState = {
  user: User | null;
  tokens: Tokens | null;
  isReady: boolean;
};

const initialState: AuthState = {
  user: null,
  tokens: null,
  isReady: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<AuthData | null>) {
      state.user = action.payload?.user ?? null;
      state.tokens = action.payload?.tokens ?? null;
      state.isReady = true;
    },
    setAccessToken(state, action: PayloadAction<string>) {
      if (state.tokens) state.tokens.access = action.payload;
    },
    logout(state) {
      state.user = null;
      state.tokens = null;
    },
  },
});

export const { setAuth, setAccessToken, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
