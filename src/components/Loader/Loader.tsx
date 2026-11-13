import styles from './Loader.module.css';

const rows = [1, 2, 3, 4, 5, 6, 7, 8];

export default function Loader() {
  return (
    <div className={styles.loader}>
      {rows.map((row) => (
        <div key={row} className={styles.loader__row}>
          <div className={styles.loader__image}></div>
          <div className={styles.loader__name}></div>
          <div className={styles.loader__author}></div>
          <div className={styles.loader__album}></div>
        </div>
      ))}
    </div>
  );
}
