'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { itemCount } = useCart();

  return (
    <nav className="eww-navbar">
      <div className="eww-navbar__container">
        {/* Left: Navigation Links */}
        <div className="eww-navbar__left">
          <Link href="/shop" className="eww-navbar__link">
            Shop
          </Link>
          <Link href="#about" className="eww-navbar__link">
            About
          </Link>
          <Link href="#contact" className="eww-navbar__link">
            Contact
          </Link>
        </div>

        {/* Center: Logo */}
        <Link href="/" className="eww-navbar__brand">
          <Image
            src="/logo.png"
            alt="EWW"
            width={36}
            height={36}
            className="eww-navbar__logo"
          />
          <span className="eww-navbar__name">EWW</span>
        </Link>

        {/* Right: Cart */}
        <div className="eww-navbar__right">
          <Link
            href="/cart"
            className="eww-navbar__cart"
            aria-label={`Cart with ${itemCount} items`}
          >
            <span className="eww-navbar__cart-text">Cart</span>
            {itemCount > 0 && (
              <span className="eww-navbar__cart-count">({itemCount})</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
