import Centerblock from '@/components/Centerblock/Centerblock';
import { getTracks } from '@/api/api';
import { Track } from '@/types';
import { getErrorMessage } from '@/utils/getErrorMessage';

export default async function Home() {
  let tracks: Track[] = [];
  let error = '';
  try {
    tracks = await getTracks();
  } catch (err) {
    error = getErrorMessage(err, 'Не удалось загрузить треки');
  }
  return <Centerblock title="Треки" tracks={tracks} error={error} />;
}
