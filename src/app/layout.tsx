import { Playfair_Display, Inter } from 'next/font/google';

import { CartProvider } from '@/components/providers/cart-provider';

import type { Metadata } from 'next';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'market&story - Modern Retail & Media',
  description: 'Discover curated products and inspiring stories',
  icons: {
    icon: 'https://res.cloudinary.com/jlml/image/upload/v1765993699/market_and_story/logo.png',
    apple: 'https://res.cloudinary.com/jlml/image/upload/v1765993699/market_and_story/logo.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <html lang='en'>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
      >
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
