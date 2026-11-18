import Icon from '@/components/Icon/Icon';
import styles from './Volume.module.css';

type VolumeProps = {
  volume: number;
  onChange: (volume: number) => void;
};

export default function Volume({ volume, onChange }: VolumeProps) {
  return (
    <div className={styles.volume__content}>
      <div className={styles.volume__image}>
        <Icon name="icon-volume" className={styles.volume__svg} />
      </div>
      <div className={styles.volume__progress}>
        <input
          className={styles.volume__progressLine}
          type="range"
          name="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(event) => onChange(Number(event.target.value))}
        />
      </div>
    </div>
  );
}
