// src/app/shop/page.tsx
'use client';

import '@/styles/shop.css';
import ShopNavbar from '@/components/shop/ShopNavbar';
import ShopCart from '@/components/shop/ShopCart';
import ShopHeroEditorial from '@/components/shop/ShopHeroEditorial';
import ShopBrandStatement from '@/components/shop/ShopBrandStatement';
import ShopProductGrid from '@/components/shop/ShopProductGrid';
import ShopCheckoutBar from '@/components/shop/ShopCheckoutBar';
import Footer from '@/components/layout/Footer';

export default function ShopPage() {
  return (
    <>
      <ShopNavbar />
      <ShopCart />
      <main className="shop-page">
        <ShopHeroEditorial />
        <ShopBrandStatement />
        <ShopProductGrid />
      </main>
      <ShopCheckoutBar />
      <Footer />
    </>
  );
}
