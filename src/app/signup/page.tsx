'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { signup } from '@/api/api';
import styles from './signup.module.css';

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    if (password !== passwordRepeat) {
      setError('Пароли не совпадают');
      return;
    }
    setIsLoading(true);
    try {
      await signup(email, password, email);
      router.push('/signin');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Не удалось зарегистрироваться',
      );
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
              className={styles.modal__input}
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
            <input
              className={styles.modal__input}
              type="password"
              name="passwordRepeat"
              placeholder="Повторите пароль"
              value={passwordRepeat}
              onChange={(event) => setPasswordRepeat(event.target.value)}
            />
            <div className={styles.errorContainer}>{error}</div>
            <button className={styles.modal__btnSignupEnt} disabled={isLoading}>
              Зарегистрироваться
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
