// src/app/shop/page.tsx
'use client';

import '@/styles/shop.css';
import Navbar from '@/components/layout/Navbar';
import ShopHeroEditorial from '@/components/shop/ShopHeroEditorial';
import ShopBrandStatement from '@/components/shop/ShopBrandStatement';
import ShopProductGrid from '@/components/shop/ShopProductGrid';
import Footer from '@/components/layout/Footer';

export default function ShopPage() {
  return (
    <>
      <Navbar />
      <main className="shop-page">
        <ShopHeroEditorial />
        <ShopBrandStatement />
        <ShopProductGrid />
      </main>
      <Footer />
    </>
  );
}
