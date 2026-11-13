'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { getTokens, login } from '@/api/api';
import styles from './signin.module.css';

export default function Signin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const user = await login(email, password);
      const tokens = await getTokens(email, password);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('tokens', JSON.stringify(tokens));
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось войти');
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.containerEnter}>
        <div className={styles.modal__block}>
          <form className={styles.modal__form} onSubmit={handleSubmit}>
            <Link href="/">
              <div className={styles.modal__logo}>
                <Image
                  src="/img/logo_modal.png"
                  alt="logo"
                  width={140}
                  height={21}
                />
              </div>
            </Link>
            <input
              className={classNames(styles.modal__input, styles.login)}
              type="text"
              name="login"
              placeholder="Почта"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              className={styles.modal__input}
              type="password"
              name="password"
              placeholder="Пароль"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <div className={styles.errorContainer}>{error}</div>
            <button className={styles.modal__btnEnter} disabled={isLoading}>
              Войти
            </button>
            <Link href="/signup" className={styles.modal__btnSignup}>
              Зарегистрироваться
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
