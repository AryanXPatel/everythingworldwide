'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { useCart } from '@/context/CartContext';

export default function ShopCheckoutBar() {
  const router = useRouter();
  const barRef = useRef<HTMLDivElement>(null);
  const { items, subtotal, itemCount } = useCart();
  const isVisible = items.length > 0;

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    if (isVisible) {
      gsap.to(bar, {
        y: 0,
        duration: 0.5,
        ease: 'power3.out',
      });
    } else {
      gsap.to(bar, {
        y: 100,
        duration: 0.3,
        ease: 'power2.in',
      });
    }
  }, [isVisible]);

  const handleCheckout = () => {
    router.push('/cart');
  };

  return (
    <div
      ref={barRef}
      className="shop-checkout-bar"
      style={{ transform: 'translateY(100%)' }}
    >
      <button
        className="shop-checkout-bar__btn"
        onClick={handleCheckout}
        aria-label={`View cart - ${itemCount} item(s) for €${subtotal.toFixed(2)}`}
      >
        <span className="shop-checkout-bar__action">View Cart</span>
        <span className="shop-checkout-bar__divider" aria-hidden="true">
          —
        </span>
        <span className="shop-checkout-bar__info">Free worldwide shipping</span>
        <span className="shop-checkout-bar__divider" aria-hidden="true">
          —
        </span>
        <span className="shop-checkout-bar__total">€{subtotal.toFixed(2)}</span>
      </button>
    </div>
  );
}
