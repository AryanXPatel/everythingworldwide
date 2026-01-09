'use client';

import { ReactNode, useEffect } from 'react';
import { CartProvider } from '@/context/CartContext';

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Add ready class immediately to enable pointer events
    document.documentElement.classList.add('is-ready');

    // Add fonts-loaded class when fonts are ready
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        document.documentElement.classList.add('fonts-loaded');
      });
    } else {
      // Fallback for browsers without document.fonts API
      document.documentElement.classList.add('fonts-loaded');
    }
  }, []);

  return <CartProvider>{children}</CartProvider>;
}
