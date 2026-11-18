import styles from './Skeleton.module.css';

const rows = [1, 2, 3, 4, 5, 6, 7, 8];

export default function Skeleton() {
  return (
    <div className={styles.skeleton}>
      {rows.map((row) => (
        <div key={row} className={styles.skeleton__row}>
          <div className={styles.skeleton__image}></div>
          <div className={styles.skeleton__name}></div>
          <div className={styles.skeleton__author}></div>
          <div className={styles.skeleton__album}></div>
        </div>
      ))}
    </div>
  );
}
