'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { Product } from '@/data/products';
import { createCheckout } from '@/lib/shopify';

interface ShopProductDetailProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export default function ShopProductDetail({
  product,
  onClose,
  onAddToCart,
}: ShopProductDetailProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!product) return;

    const overlay = overlayRef.current;
    const content = contentRef.current;

    if (!overlay || !content) return;

    // Animate in
    gsap.fromTo(
      overlay,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    );
    gsap.fromTo(
      content,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.1 }
    );

    // Lock body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, [product]);

  const handleClose = () => {
    const overlay = overlayRef.current;
    const content = contentRef.current;

    if (!overlay || !content) {
      onClose();
      return;
    }

    gsap.to(content, {
      opacity: 0,
      y: 20,
      duration: 0.25,
      ease: 'power2.in',
    });
    gsap.to(overlay, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      delay: 0.1,
      onComplete: onClose,
    });
  };

  const handleAddToCart = async () => {
    if (!product) return;

    setIsLoading(true);

    // Add to local cart state
    onAddToCart(product);

    // Optional: Direct to Shopify checkout
    if (product.shopifyVariantId && !product.shopifyVariantId.includes('XXX')) {
      try {
        const checkout = await createCheckout(product.shopifyVariantId);
        if (checkout?.webUrl) {
          window.location.href = checkout.webUrl;
          return;
        }
      } catch (error) {
        console.error('Checkout error:', error);
      }
    }

    setIsLoading(false);
    handleClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  if (!product) return null;

  return (
    <div
      ref={overlayRef}
      className="shop-detail-overlay"
      onClick={(e) => e.target === overlayRef.current && handleClose()}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-title"
    >
      <div ref={contentRef} className="shop-detail">
        {/* Close Button */}
        <button
          className="shop-detail__close"
          onClick={handleClose}
          aria-label="Close product details"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Image Gallery */}
        <div className="shop-detail__gallery">
          <div className="shop-detail__main-image">
            <Image
              src={product.images.gallery[activeImage]}
              alt={product.name}
              fill
              className="shop-detail__img"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          {product.images.gallery.length > 1 && (
            <div className="shop-detail__thumbnails">
              {product.images.gallery.map((img, i) => (
                <button
                  key={i}
                  className={`shop-detail__thumbnail ${i === activeImage ? 'active' : ''}`}
                  onClick={() => setActiveImage(i)}
                  aria-label={`View image ${i + 1}`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} view ${i + 1}`}
                    fill
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="shop-detail__info">
          <h2 id="product-title" className="shop-detail__title">
            {product.name}
          </h2>
          <span className="shop-detail__subtitle">{product.subtitle}</span>

          <div className="shop-detail__divider" />

          <span className="shop-detail__price">
            {product.price.toFixed(2)}{' '}
            <span className="shop-detail__currency">{product.currency}</span>
          </span>

          {product.includes && product.includes.length > 0 && (
            <p className="shop-detail__includes">
              Includes: {product.includes.join(', ')}
            </p>
          )}

          <button
            className="shop-detail__cta"
            onClick={handleAddToCart}
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? 'Processing...' : 'Add to Cart'}
          </button>

          <div className="shop-detail__trust">
            <div className="shop-detail__trust-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM19 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
                <path d="M13 16V6a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v8a1 1 0 0 0 1 1h1m8 0H9m4 0h2m0 0a1 1 0 0 1 1-1h2l3-3v7a1 1 0 0 1-1 1h-1" />
              </svg>
              <span>Free worldwide shipping</span>
            </div>
            <div className="shop-detail__trust-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 14l-4-4m0 0l4-4m-4 4h11a4 4 0 0 1 0 8h-1" />
              </svg>
              <span>30-day return policy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
