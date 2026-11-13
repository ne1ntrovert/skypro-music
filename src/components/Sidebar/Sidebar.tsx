import Image from 'next/image';
import Link from 'next/link';
import styles from './Sidebar.module.css';

const playlists = [
  { id: 2, src: '/img/playlist01.png', alt: 'Плейлист дня' },
  { id: 3, src: '/img/playlist02.png', alt: '100 танцевальных хитов' },
  { id: 4, src: '/img/playlist03.png', alt: 'Инди-заряд' },
];

export default function Sidebar() {
  return (
    <div className={styles.main__sidebar}>
      <div className={styles.sidebar__personal}>
        <div className={styles.sidebar__icon}>
          <svg className={styles.sidebar__svg}>
            <use href="/img/icon/sprite.svg#logout"></use>
          </svg>
        </div>
      </div>
      <div className={styles.sidebar__block}>
        <div className={styles.sidebar__list}>
          {playlists.map((playlist) => (
            <div key={playlist.id} className={styles.sidebar__item}>
              <Link
                className={styles.sidebar__link}
                href={`/selection/${playlist.id}`}
              >
                <Image
                  className={styles.sidebar__img}
                  src={playlist.src}
                  alt={playlist.alt}
                  width={250}
                  height={150}
                  priority
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
