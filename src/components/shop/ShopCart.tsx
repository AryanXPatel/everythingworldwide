'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useCart } from '@/context/CartContext';

export default function ShopCart() {
  const { items, isOpen, updateQuantity, removeItem } = useCart();
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cart = cartRef.current;
    if (!cart) return;

    if (isOpen && items.length > 0) {
      gsap.to(cart, {
        height: 'auto',
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      });
    } else {
      gsap.to(cart, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      });
    }
  }, [isOpen, items.length]);

  if (items.length === 0) return null;

  return (
    <div
      ref={cartRef}
      className="shop-cart"
      style={{ height: 0, opacity: 0, overflow: 'hidden' }}
    >
      <div className="shop-cart__container">
        {/* Table Header */}
        <div className="shop-cart__header">
          <span className="shop-cart__col shop-cart__col--product">Product</span>
          <span className="shop-cart__col shop-cart__col--quantity">Quantity</span>
          <span className="shop-cart__col shop-cart__col--remove"></span>
          <span className="shop-cart__col shop-cart__col--price">Price</span>
        </div>

        {/* Cart Items */}
        <div className="shop-cart__items">
          {items.map((item) => (
            <div key={item.product.id} className="shop-cart__row">
              <span className="shop-cart__col shop-cart__col--product">
                {item.product.name}
              </span>

              <div className="shop-cart__col shop-cart__col--quantity">
                <div className="shop-cart__quantity-controls">
                  <button
                    className="shop-cart__quantity-btn"
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity - 1)
                    }
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="shop-cart__quantity-value">
                    {item.quantity}
                  </span>
                  <button
                    className="shop-cart__quantity-btn"
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity + 1)
                    }
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <span className="shop-cart__col shop-cart__col--remove">
                <button
                  className="shop-cart__remove-btn"
                  onClick={() => removeItem(item.product.id)}
                  aria-label={`Remove ${item.product.name} from cart`}
                >
                  Remove
                </button>
              </span>

              <span className="shop-cart__col shop-cart__col--price">
                €{(item.product.price * item.quantity).toFixed(2)}
                <span className="shop-cart__currency">
                  {item.product.currency}
                </span>
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="shop-cart__footer">
          <span className="shop-cart__shipping">Shipping &amp; Taxes</span>
          <span className="shop-cart__shipping-note">
            Calculated at Checkout
          </span>
        </div>
      </div>
    </div>
  );
}
