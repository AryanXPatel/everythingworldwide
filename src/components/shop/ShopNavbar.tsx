'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function ShopNavbar() {
  const { itemCount, toggleCart } = useCart();

  return (
    <nav className="shop-navbar">
      <div className="shop-navbar__container">
        <Link href="/shop" className="shop-navbar__brand">
          KINUAMI Goods
        </Link>

        <button
          className="shop-navbar__cart"
          onClick={toggleCart}
          aria-label={`Cart with ${itemCount} items`}
        >
          <span className="shop-navbar__cart-text">Cart</span>
          {itemCount > 0 && (
            <span className="shop-navbar__cart-count">{itemCount}</span>
          )}
        </button>
      </div>
    </nav>
  );
}
