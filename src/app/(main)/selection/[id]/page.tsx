import Centerblock from '@/components/Centerblock/Centerblock';
import { getSelection, getTracks } from '@/api/api';
import { Track } from '@/types';

type SelectionPageProps = {
  params: Promise<{ id: string }>;
};

export default async function SelectionPage({ params }: SelectionPageProps) {
  const { id } = await params;
  let title = 'Подборка';
  let tracks: Track[] = [];
  let error = '';
  try {
    const [selection, allTracks] = await Promise.all([
      getSelection(id),
      getTracks(),
    ]);
    if (selection) {
      title = selection.name;
      tracks = selection.items
        .map((trackId) => allTracks.find((track) => track._id === trackId))
        .filter((track): track is Track => Boolean(track));
    } else {
      error = 'Подборка не найдена';
    }
  } catch (err) {
    error =
      err instanceof Error ? err.message : 'Не удалось загрузить подборку';
  }
  return <Centerblock title={title} tracks={tracks} error={error} />;
}
