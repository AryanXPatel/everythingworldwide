'use client';

import '@/styles/shop.css';
import { useCart } from '@/context/CartContext';
import { createCheckoutWithItems } from '@/lib/shopify';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, subtotal, itemCount } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    // Filter items that have Shopify variant IDs
    const shopifyItems = items
      .filter(item => item.product.shopifyVariantId)
      .map(item => ({
        variantId: item.product.shopifyVariantId!,
        quantity: item.quantity,
      }));

    if (shopifyItems.length === 0) {
      // No Shopify products - show message
      alert('Checkout coming soon! Contact us to place your order.');
      return;
    }

    setIsCheckingOut(true);
    try {
      const checkout = await createCheckoutWithItems(shopifyItems);
      // Redirect to Shopify checkout
      if (checkout.webUrl) {
        window.location.href = checkout.webUrl as string;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('There was an error creating your checkout. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  // Empty cart state
  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="cart-page cart-page--empty">
          <div className="cart-page__container">
            <h1 className="cart-page__title">Your Cart</h1>
            <div className="cart-page__empty-state">
              <div className="cart-page__empty-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
              <p className="cart-page__empty-text">Your cart is empty</p>
              <Link href="/shop" className="cart-page__browse-btn">
                Browse Products
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="cart-page">
      <div className="cart-page__container">
        {/* Header */}
        <div className="cart-page__header">
          <h1 className="cart-page__title">Your Cart</h1>
          <Link href="/shop" className="cart-page__back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Continue Shopping
          </Link>
        </div>

        {/* Cart Items */}
        <div className="cart-page__items">
          {items.map((item) => (
            <div key={item.product.id} className="cart-item">
              <div className="cart-item__image">
                <Image
                  src={item.product.images.hero}
                  alt={item.product.name}
                  fill
                  sizes="120px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="cart-item__details">
                <h3 className="cart-item__name">{item.product.name}</h3>
                <p className="cart-item__subtitle">{item.product.subtitle}</p>
              </div>
              <div className="cart-item__quantity">
                <button
                  className="cart-item__qty-btn"
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="cart-item__qty-value">{item.quantity}</span>
                <button
                  className="cart-item__qty-btn"
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <div className="cart-item__price">
                {item.product.currency === 'EUR' ? '€' : '$'}
                {(item.product.price * item.quantity).toFixed(2)}
              </div>
              <button
                className="cart-item__remove"
                onClick={() => removeItem(item.product.id)}
                aria-label="Remove item"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="cart-page__summary">
          <div className="cart-page__summary-row">
            <span>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
            <span className="cart-page__subtotal">{'\u20AC'}{subtotal.toFixed(2)}</span>
          </div>
          <div className="cart-page__summary-row cart-page__summary-row--shipping">
            <span>Shipping</span>
            <span className="cart-page__shipping-free">Free worldwide</span>
          </div>
          <div className="cart-page__summary-divider" />
          <div className="cart-page__summary-row cart-page__summary-row--total">
            <span>Total</span>
            <span className="cart-page__total">{'\u20AC'}{subtotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="cart-page__actions">
          <button
            className="cart-page__checkout-btn"
            onClick={handleCheckout}
            disabled={isCheckingOut}
          >
            {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
          </button>
          <button
            className="cart-page__clear-btn"
            onClick={clearCart}
          >
            Clear Cart
          </button>
        </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
