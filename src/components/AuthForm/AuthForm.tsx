'use client';

import { FormEvent, useState } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { getErrorMessage } from '@/utils/getErrorMessage';
import styles from './AuthForm.module.css';

export type AuthFormValues = {
  email: string;
  password: string;
};

type AuthFormProps = {
  mode: 'signin' | 'signup';
  onSubmit: (values: AuthFormValues) => Promise<void>;
};

export default function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const isSignup = mode === 'signup';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    if (isSignup && password !== passwordRepeat) {
      setError('Пароли не совпадают');
      return;
    }
    setIsLoading(true);
    try {
      await onSubmit({ email, password });
    } catch (err) {
      setError(
        getErrorMessage(
          err,
          isSignup ? 'Не удалось зарегистрироваться' : 'Не удалось войти',
        ),
      );
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.containerEnter}>
        <div className={styles.modal__block}>
          <form
            className={classNames(
              styles.modal__form,
              isSignup ? styles.modal__form_signup : styles.modal__form_signin,
            )}
            onSubmit={handleSubmit}
          >
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
            {isSignup && (
              <input
                className={styles.modal__input}
                type="password"
                name="passwordRepeat"
                placeholder="Повторите пароль"
                value={passwordRepeat}
                onChange={(event) => setPasswordRepeat(event.target.value)}
              />
            )}
            <div className={styles.errorContainer}>{error}</div>
            <button className={styles.modal__btnSubmit} disabled={isLoading}>
              {isSignup ? 'Зарегистрироваться' : 'Войти'}
            </button>
            {!isSignup && (
              <Link href="/signup" className={styles.modal__btnSignup}>
                Зарегистрироваться
              </Link>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
