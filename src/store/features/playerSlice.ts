import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Track } from '@/types';

type PlayerState = {
  currentTrack: Track | null;
  isPlaying: boolean;
  isShuffle: boolean;
  playlist: Track[];
  shuffledPlaylist: Track[];
};

const initialState: PlayerState = {
  currentTrack: null,
  isPlaying: false,
  isShuffle: false,
  playlist: [],
  shuffledPlaylist: [],
};

const shuffle = (tracks: Track[]) => {
  const result = [...tracks];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

const getActiveList = (state: PlayerState) =>
  state.isShuffle ? state.shuffledPlaylist : state.playlist;

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setCurrentTrack(
      state,
      action: PayloadAction<{ track: Track; playlist: Track[] }>,
    ) {
      state.currentTrack = action.payload.track;
      state.playlist = action.payload.playlist;
      state.shuffledPlaylist = shuffle(action.payload.playlist);
      state.isPlaying = true;
    },
    setIsPlaying(state, action: PayloadAction<boolean>) {
      state.isPlaying = action.payload;
    },
    toggleShuffle(state) {
      state.isShuffle = !state.isShuffle;
      state.shuffledPlaylist = shuffle(state.playlist);
    },
    nextTrack(state) {
      const list = getActiveList(state);
      const index = list.findIndex((t) => t._id === state.currentTrack?._id);
      if (index === -1 || index >= list.length - 1) return;
      state.currentTrack = list[index + 1];
      state.isPlaying = true;
    },
    prevTrack(state) {
      const list = getActiveList(state);
      const index = list.findIndex((t) => t._id === state.currentTrack?._id);
      if (index <= 0) return;
      state.currentTrack = list[index - 1];
      state.isPlaying = true;
    },
  },
});

export const {
  setCurrentTrack,
  setIsPlaying,
  toggleShuffle,
  nextTrack,
  prevTrack,
} = playerSlice.actions;
export const playerReducer = playerSlice.reducer;
