import { fireEvent, screen, waitFor } from '@testing-library/react';
import TrackItem from './Track';
import { renderWithStore } from '@/test/renderWithStore';
import { tracks } from '@/test/tracks';

const track = tracks[2];

describe('Track', () => {
  it('показывает название, автора, альбом и длительность', () => {
    renderWithStore(<TrackItem track={track} playlist={tracks} />);
    expect(screen.getByText('Harmony')).toBeInTheDocument();
    expect(screen.getByText('Winniethemoog')).toBeInTheDocument();
    expect(screen.getByText('1:05')).toBeInTheDocument();
  });

  it('делает трек текущим по клику', () => {
    const { store } = renderWithStore(
      <TrackItem track={track} playlist={tracks} />,
    );
    fireEvent.click(screen.getByText('Harmony'));
    const { currentTrack, isPlaying, playlist } = store.getState().player;
    expect(currentTrack?._id).toBe(track._id);
    expect(isPlaying).toBe(true);
    expect(playlist).toEqual(tracks);
  });

  it('не даёт поставить лайк без входа и не запускает трек', async () => {
    const { store, container } = renderWithStore(
      <TrackItem track={track} playlist={tracks} />,
    );
    const like = container
      .querySelector('use[href*="icon-like"]')
      ?.closest('svg');
    fireEvent.click(like as SVGSVGElement);
    await waitFor(() => {
      expect(store.getState().favorites.error).toBe(
        'Чтобы ставить лайки, нужно войти в аккаунт',
      );
    });
    expect(store.getState().player.currentTrack).toBeNull();
  });
});
