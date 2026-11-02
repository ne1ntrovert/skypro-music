'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Nav.module.css';

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={styles.main__nav}>
      <div className={styles.nav__logo}>
        <Image
          className={styles.logo__image}
          src="/img/logo.png"
          alt="logo"
          width={227}
          height={34}
          priority
        />
      </div>
      <div
        className={styles.nav__burger}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
      </div>
      {isMenuOpen && (
        <div className={styles.nav__menu}>
          <ul className={styles.menu__list}>
            <li className={styles.menu__item}>
              <Link href="/" className={styles.menu__link}>
                Главное
              </Link>
            </li>
            <li className={styles.menu__item}>
              <Link href="#" className={styles.menu__link}>
                Мои треки
              </Link>
            </li>
            <li className={styles.menu__item}>
              <Link href="/signin" className={styles.menu__link}>
                Выйти
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
