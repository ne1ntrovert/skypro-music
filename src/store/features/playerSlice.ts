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

const switchTrack = (state: PlayerState, step: 1 | -1) => {
  const tracks = state.isShuffle ? state.shuffledPlaylist : state.playlist;
  const currentIndex = tracks.findIndex(
    (track) => track._id === state.currentTrack?._id,
  );
  const targetTrack = tracks[currentIndex + step];
  if (currentIndex === -1 || !targetTrack) return;
  state.currentTrack = targetTrack;
  state.isPlaying = true;
};

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
      switchTrack(state, 1);
    },
    prevTrack(state) {
      switchTrack(state, -1);
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
