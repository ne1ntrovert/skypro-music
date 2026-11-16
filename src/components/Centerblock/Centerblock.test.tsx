import { fireEvent, screen } from '@testing-library/react';
import Centerblock from './Centerblock';
import { renderWithStore } from '@/test/renderWithStore';
import { tracks } from '@/test/tracks';

describe('Centerblock', () => {
  it('показывает заголовок и все треки', () => {
    renderWithStore(<Centerblock title="Треки" tracks={tracks} />);
    expect(screen.getByText('Треки')).toBeInTheDocument();
    expect(screen.getByText('Hard Metal Intro')).toBeInTheDocument();
    expect(screen.getByText('Adrenalynne')).toBeInTheDocument();
    expect(screen.getByText('Harmony')).toBeInTheDocument();
  });

  it('фильтрует треки по поисковому запросу', () => {
    renderWithStore(<Centerblock title="Треки" tracks={tracks} />);
    fireEvent.change(screen.getByPlaceholderText('Поиск'), {
      target: { value: 'har' },
    });
    expect(screen.getByText('Hard Metal Intro')).toBeInTheDocument();
    expect(screen.getByText('Harmony')).toBeInTheDocument();
    expect(screen.queryByText('Adrenalynne')).not.toBeInTheDocument();
  });

  it('применяет поиск и фильтр по жанру вместе', () => {
    renderWithStore(<Centerblock title="Треки" tracks={tracks} />);
    fireEvent.change(screen.getByPlaceholderText('Поиск'), {
      target: { value: 'har' },
    });
    fireEvent.click(screen.getByText('жанру'));
    fireEvent.click(screen.getByText('Классическая музыка'));
    expect(screen.getByText('Harmony')).toBeInTheDocument();
    expect(screen.queryByText('Hard Metal Intro')).not.toBeInTheDocument();
  });

  it('оставляет в списке фильтра всех исполнителей после поиска', () => {
    renderWithStore(<Centerblock title="Треки" tracks={tracks} />);
    fireEvent.change(screen.getByPlaceholderText('Поиск'), {
      target: { value: 'adr' },
    });
    fireEvent.click(screen.getByText('исполнителю'));
    expect(screen.getByText('Winniethemoog')).toBeInTheDocument();
  });

  it('пишет, что треков нет, если ничего не найдено', () => {
    renderWithStore(<Centerblock title="Треки" tracks={tracks} />);
    fireEvent.change(screen.getByPlaceholderText('Поиск'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('Нет подходящих треков')).toBeInTheDocument();
  });

  it('показывает ошибку вместо списка', () => {
    renderWithStore(
      <Centerblock title="Треки" tracks={[]} error="Сервер недоступен" />,
    );
    expect(screen.getByText('Сервер недоступен')).toBeInTheDocument();
    expect(screen.queryByText('Нет подходящих треков')).not.toBeInTheDocument();
  });

  it('не показывает треки во время загрузки', () => {
    renderWithStore(<Centerblock title="Треки" tracks={tracks} isLoading />);
    expect(screen.queryByText('Hard Metal Intro')).not.toBeInTheDocument();
  });
});
