import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import StoreProvider from '@/components/StoreProvider/StoreProvider';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'Skypro.Music',
  description: 'Музыкальный сервис',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={montserrat.variable}>
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
