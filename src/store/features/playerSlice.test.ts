import {
  nextTrack,
  playerReducer,
  prevTrack,
  setCurrentTrack,
  toggleShuffle,
} from './playerSlice';
import { tracks } from '@/test/tracks';

const startFrom = (index: number) =>
  playerReducer(
    undefined,
    setCurrentTrack({ track: tracks[index], playlist: tracks }),
  );

describe('playerSlice', () => {
  it('включает выбранный трек и запоминает плейлист', () => {
    const state = startFrom(1);
    expect(state.currentTrack).toEqual(tracks[1]);
    expect(state.playlist).toEqual(tracks);
    expect(state.isPlaying).toBe(true);
  });

  it('переключает на следующий и предыдущий трек', () => {
    const next = playerReducer(startFrom(0), nextTrack());
    expect(next.currentTrack).toEqual(tracks[1]);
    const prev = playerReducer(next, prevTrack());
    expect(prev.currentTrack).toEqual(tracks[0]);
  });

  it('не уходит назад с первого трека и вперёд с последнего', () => {
    const first = playerReducer(startFrom(0), prevTrack());
    expect(first.currentTrack).toEqual(tracks[0]);
    const last = playerReducer(startFrom(tracks.length - 1), nextTrack());
    expect(last.currentTrack).toEqual(tracks[tracks.length - 1]);
  });

  it('ничего не делает, если трек не выбран', () => {
    const state = playerReducer(undefined, nextTrack());
    expect(state.currentTrack).toBeNull();
    expect(state.isPlaying).toBe(false);
  });

  it('в режиме shuffle идёт по перемешанному списку', () => {
    const shuffled = playerReducer(startFrom(0), toggleShuffle());
    expect(shuffled.isShuffle).toBe(true);
    expect(
      [...shuffled.shuffledPlaylist].sort((a, b) => a._id - b._id),
    ).toEqual(tracks);
    const index = shuffled.shuffledPlaylist.findIndex(
      (track) => track._id === tracks[0]._id,
    );
    const next = playerReducer(shuffled, nextTrack());
    const expected = shuffled.shuffledPlaylist[index + 1] ?? tracks[0];
    expect(next.currentTrack).toEqual(expected);
  });
});
