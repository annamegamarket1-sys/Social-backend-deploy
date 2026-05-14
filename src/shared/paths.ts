// После перехода на Cloudinary значения в БД хранятся как полные https:// URL.
// Если значение уже является URL — возвращаем как есть; иначе — пустая строка
// (фронтенд покажет дефолтную иконку).

export const postImageUrl = (value: string): string =>
  value?.startsWith('http') ? value : '';

export const avatarUrl = (value: string | null): string =>
  value?.startsWith('http') ? value : '';

export const coverUrl = (value: string | null): string =>
  value?.startsWith('http') ? value : '';
