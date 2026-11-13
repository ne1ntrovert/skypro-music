# Skypro.Music

## Запуск

```bash
npm install
npm run dev
```

Открыть http://localhost:3000

## Структура

```
src/
  api/          запросы к API и типы ответов
  app/          страницы и layout
    (main)/     общий layout для главной и подборок
    signin/     вход
    signup/     регистрация
  components/   компоненты главной страницы
  store/        redux store и слайс плеера
  utils/        форматирование времени
  types.ts      типы трека, подборки, пользователя
public/img/     картинки и спрайт иконок
```

Треки и подборки берутся с https://webdev-music-003b5b991590.herokuapp.com, данные для фильтров собираются из полученных треков. При входе токены сохраняются в localStorage.
