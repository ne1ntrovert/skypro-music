import Centerblock from '@/components/Centerblock/Centerblock';
import { getTracks } from '@/api/api';
import { Track } from '@/types';

export default async function Home() {
  let tracks: Track[] = [];
  let error = '';
  try {
    tracks = await getTracks();
  } catch (err) {
    error = err instanceof Error ? err.message : 'Не удалось загрузить треки';
  }
  return <Centerblock title="Треки" tracks={tracks} error={error} />;
}
