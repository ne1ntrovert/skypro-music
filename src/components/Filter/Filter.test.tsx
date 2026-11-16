import { fireEvent, render, screen } from '@testing-library/react';
import Filter from './Filter';
import { tracks } from '@/test/tracks';
import { defaultFilters } from '@/utils/filterTracks';

describe('Filter', () => {
  it('открывает список исполнителей по клику', () => {
    render(
      <Filter tracks={tracks} filters={defaultFilters} onChange={jest.fn()} />,
    );
    expect(screen.queryByText('Winniethemoog')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('исполнителю'));
    expect(screen.getByText('Winniethemoog')).toBeInTheDocument();
    expect(screen.getByText('Tim Kulig')).toBeInTheDocument();
  });

  it('держит открытым только один список', () => {
    render(
      <Filter tracks={tracks} filters={defaultFilters} onChange={jest.fn()} />,
    );
    fireEvent.click(screen.getByText('исполнителю'));
    fireEvent.click(screen.getByText('жанру'));
    expect(screen.queryByText('Winniethemoog')).not.toBeInTheDocument();
    expect(screen.getByText('Рок музыка')).toBeInTheDocument();
  });

  it('закрывает список повторным кликом', () => {
    render(
      <Filter tracks={tracks} filters={defaultFilters} onChange={jest.fn()} />,
    );
    fireEvent.click(screen.getByText('жанру'));
    fireEvent.click(screen.getByText('жанру'));
    expect(screen.queryByText('Рок музыка')).not.toBeInTheDocument();
  });

  it('сообщает о выборе жанра', () => {
    const onChange = jest.fn();
    render(
      <Filter tracks={tracks} filters={defaultFilters} onChange={onChange} />,
    );
    fireEvent.click(screen.getByText('жанру'));
    fireEvent.click(screen.getByText('Рок музыка'));
    expect(onChange).toHaveBeenCalledWith({ genres: ['Рок музыка'] });
  });

  it('снимает выбранного исполнителя при повторном клике', () => {
    const onChange = jest.fn();
    render(
      <Filter
        tracks={tracks}
        filters={{ ...defaultFilters, authors: ['Tim Kulig'] }}
        onChange={onChange}
      />,
    );
    fireEvent.click(screen.getByText('исполнителю'));
    fireEvent.click(screen.getByText('Tim Kulig'));
    expect(onChange).toHaveBeenCalledWith({ authors: [] });
  });

  it('сообщает о выборе сортировки', () => {
    const onChange = jest.fn();
    render(
      <Filter tracks={tracks} filters={defaultFilters} onChange={onChange} />,
    );
    fireEvent.click(screen.getByText('году выпуска'));
    fireEvent.click(screen.getByText('Сначала новые'));
    expect(onChange).toHaveBeenCalledWith({ sort: 'new' });
  });

  it('показывает количество выбранных значений', () => {
    render(
      <Filter
        tracks={tracks}
        filters={{
          ...defaultFilters,
          genres: ['Рок музыка', 'Классическая музыка'],
        }}
        onChange={jest.fn()}
      />,
    );
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
