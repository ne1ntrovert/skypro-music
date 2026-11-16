import {
  defaultFilters,
  filterTracks,
  getAuthors,
  getGenres,
  toggleItem,
} from './filterTracks';
import { tracks } from '@/test/tracks';

const names = (list: { name: string }[]) => list.map((track) => track.name);

describe('getAuthors', () => {
  it('возвращает авторов без дубликатов', () => {
    expect(getAuthors(tracks)).toEqual(['Winniethemoog', 'Tim Kulig']);
  });

  it('для пустого списка возвращает пустой массив', () => {
    expect(getAuthors([])).toEqual([]);
  });
});

describe('getGenres', () => {
  it('собирает жанры из всех треков без дубликатов', () => {
    expect(getGenres(tracks)).toEqual([
      'Рок музыка',
      'Электронная музыка',
      'Классическая музыка',
    ]);
  });
});

describe('toggleItem', () => {
  it('добавляет элемент, если его нет', () => {
    expect(toggleItem(['a'], 'b')).toEqual(['a', 'b']);
  });

  it('убирает элемент, если он уже есть', () => {
    expect(toggleItem(['a', 'b'], 'a')).toEqual(['b']);
  });
});

describe('filterTracks', () => {
  it('без фильтров возвращает все треки в исходном порядке', () => {
    expect(filterTracks(tracks, defaultFilters)).toEqual(tracks);
  });

  it('ищет по первым буквам названия без учёта регистра и пробелов', () => {
    const result = filterTracks(tracks, { ...defaultFilters, search: ' haR ' });
    expect(names(result)).toEqual(['Hard Metal Intro', 'Harmony']);
  });

  it('не находит трек по совпадению в середине названия', () => {
    const result = filterTracks(tracks, { ...defaultFilters, search: 'Metal' });
    expect(result).toEqual([]);
  });

  it('фильтрует по автору', () => {
    const result = filterTracks(tracks, {
      ...defaultFilters,
      authors: ['Tim Kulig'],
    });
    expect(names(result)).toEqual(['Adrenalynne']);
  });

  it('фильтрует по жанру, если у трека несколько жанров', () => {
    const result = filterTracks(tracks, {
      ...defaultFilters,
      genres: ['Классическая музыка'],
    });
    expect(names(result)).toEqual(['Harmony']);
  });

  it('объединяет несколько значений одного фильтра', () => {
    const result = filterTracks(tracks, {
      ...defaultFilters,
      genres: ['Классическая музыка', 'Электронная музыка'],
    });
    expect(names(result)).toEqual(['Adrenalynne', 'Harmony']);
  });

  it('применяет все условия одновременно', () => {
    const result = filterTracks(tracks, {
      search: 'ha',
      authors: ['Winniethemoog'],
      genres: ['Классическая музыка'],
      sort: 'default',
    });
    expect(names(result)).toEqual(['Harmony']);
  });

  it('сортирует сначала новые', () => {
    const result = filterTracks(tracks, { ...defaultFilters, sort: 'new' });
    expect(names(result)).toEqual([
      'Adrenalynne',
      'Harmony',
      'Hard Metal Intro',
    ]);
  });

  it('сортирует сначала старые', () => {
    const result = filterTracks(tracks, { ...defaultFilters, sort: 'old' });
    expect(names(result)).toEqual([
      'Hard Metal Intro',
      'Harmony',
      'Adrenalynne',
    ]);
  });

  it('не меняет исходный массив при сортировке', () => {
    const copy = [...tracks];
    filterTracks(tracks, { ...defaultFilters, sort: 'new' });
    expect(tracks).toEqual(copy);
  });

  it('возвращает пустой массив, если ничего не подошло', () => {
    const result = filterTracks(tracks, {
      ...defaultFilters,
      authors: ['Nobody'],
    });
    expect(result).toEqual([]);
  });
});
