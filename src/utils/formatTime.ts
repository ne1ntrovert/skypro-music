export const formatTime = (seconds: number) => {
  const total = Math.floor(seconds || 0);
  const minutes = Math.floor(total / 60);
  const rest = total % 60;
  return `${minutes}:${rest.toString().padStart(2, '0')}`;
};
