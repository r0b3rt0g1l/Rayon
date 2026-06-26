import { Inter } from 'next/font/google';

// Rediseño: todo Inter (sin serifs). Se removieron Playfair Display, Lora y
// JetBrains Mono. Los tokens --font-display/--font-serif (app/globals.css)
// apuntan a Inter; --font-mono usa el stack monoespaciado del sistema.
export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});
