import { formatTime } from './formatTime';

describe('formatTime', () => {
  it('форматирует секунды в м:сс', () => {
    expect(formatTime(65)).toBe('1:05');
  });

  it('добавляет ведущий ноль к секундам', () => {
    expect(formatTime(600)).toBe('10:00');
  });

  it('отбрасывает дробную часть', () => {
    expect(formatTime(59.9)).toBe('0:59');
  });

  it('возвращает 0:00 для нуля и NaN', () => {
    expect(formatTime(0)).toBe('0:00');
    expect(formatTime(NaN)).toBe('0:00');
  });

  it('не переводит минуты в часы', () => {
    expect(formatTime(3725)).toBe('62:05');
  });
});
