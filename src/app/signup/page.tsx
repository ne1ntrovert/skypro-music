'use client';

import { useRouter } from 'next/navigation';
import AuthForm, { AuthFormValues } from '@/components/AuthForm/AuthForm';
import { signup } from '@/api/api';

export default function Signup() {
  const router = useRouter();

  const handleSubmit = async ({ email, password }: AuthFormValues) => {
    await signup(email, password, email);
    router.push('/signin');
  };

  return <AuthForm mode="signup" onSubmit={handleSubmit} />;
}
