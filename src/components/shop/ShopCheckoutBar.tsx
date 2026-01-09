'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useCart } from '@/context/CartContext';

export default function ShopCheckoutBar() {
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
    // For now, log and could redirect to Shopify
    console.log('Checkout with items:', items);
    // window.open('https://your-store.myshopify.com/cart', '_blank');
    alert(
      `Checkout: ${itemCount} item(s) for €${subtotal.toFixed(2)}\n\nShopify integration coming soon!`
    );
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
        aria-label={`Checkout - ${itemCount} item(s) for €${subtotal.toFixed(2)}`}
      >
        <span className="shop-checkout-bar__action">Checkout</span>
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
