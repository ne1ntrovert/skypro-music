import styles from './ProgressBar.module.css';

type ProgressBarProps = {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
};

export default function ProgressBar({
  currentTime,
  duration,
  onSeek,
}: ProgressBarProps) {
  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <input
      className={styles.progress}
      type="range"
      min={0}
      max={duration || 0}
      step={0.1}
      value={currentTime}
      onChange={(event) => onSeek(Number(event.target.value))}
      style={{
        background: `linear-gradient(to right, #b672ff ${progress}%, #2e2e2e ${progress}%)`,
      }}
    />
  );
}
