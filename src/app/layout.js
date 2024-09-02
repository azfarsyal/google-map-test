import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

import './globals.css';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });
const myFont = localFont({ src: '../assets/fonts/Headlines-Bold.otf' });

export const metadata = {
  title: 'Google Map Test',
  description: 'Created by Azfar Syal for testing purposes',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
