import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Google Map Test',
  description: 'Created by Azfar Syal for testing purposes',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
