import { clearAuth, loadAuth, saveAuth } from './authStorage';

const auth = {
  user: { _id: 1, email: 'test@test.ru', username: 'test' },
  tokens: { access: 'access', refresh: 'refresh' },
};

describe('authStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('сохраняет и читает данные пользователя', () => {
    saveAuth(auth);
    expect(loadAuth()).toEqual(auth);
  });

  it('возвращает null, если ничего не сохранено', () => {
    expect(loadAuth()).toBeNull();
  });

  it('возвращает null, если сохранён только пользователь без токенов', () => {
    localStorage.setItem('user', JSON.stringify(auth.user));
    expect(loadAuth()).toBeNull();
  });

  it('возвращает null, если в хранилище битый JSON', () => {
    localStorage.setItem('user', '{broken');
    localStorage.setItem('tokens', '{broken');
    expect(loadAuth()).toBeNull();
  });

  it('очищает данные', () => {
    saveAuth(auth);
    clearAuth();
    expect(localStorage.getItem('user')).toBeNull();
    expect(localStorage.getItem('tokens')).toBeNull();
  });
});
