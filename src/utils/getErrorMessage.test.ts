import { getErrorMessage } from './getErrorMessage';

describe('getErrorMessage', () => {
  it('возвращает текст ошибки', () => {
    expect(getErrorMessage(new Error('Сервер недоступен'), 'Ошибка')).toBe(
      'Сервер недоступен',
    );
  });

  it('возвращает запасной текст, если пришла не ошибка', () => {
    expect(getErrorMessage('строка', 'Ошибка')).toBe('Ошибка');
    expect(getErrorMessage(null, 'Ошибка')).toBe('Ошибка');
    expect(getErrorMessage({ message: 'объект' }, 'Ошибка')).toBe('Ошибка');
  });
});
