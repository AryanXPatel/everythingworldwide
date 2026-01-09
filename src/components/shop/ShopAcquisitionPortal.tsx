'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createCheckout } from '@/lib/shopify';

gsap.registerPlugin(ScrollTrigger);

// Product variant ID from Shopify (replace with actual)
const PRODUCT_VARIANT_ID = 'gid://shopify/ProductVariant/XXXXXXXXXX';

export default function ShopAcquisitionPortal() {
  const sectionRef = useRef<HTMLElement>(null);
  const priceRef = useRef<HTMLSpanElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const price = priceRef.current;
    const card = cardRef.current;

    if (!section || !price || !card) return;

    // Staggered reveal animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo(
      card.querySelectorAll('.shop-acquisition__animate'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handleAcquire = async () => {
    setIsLoading(true);
    try {
      const checkout = await createCheckout(PRODUCT_VARIANT_ID);
      if (checkout?.webUrl) {
        window.location.href = checkout.webUrl;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      window.open('https://your-store.myshopify.com/cart', '_blank');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section ref={sectionRef} id="acquire" className="shop-acquisition shop-section shop-section--white">
      {/* Product Image with hover effect */}
      <div className="shop-acquisition__image">
        <div className="shop-acquisition__image-float">
          <Image
            src="/images/products/Main_unit_front_angle.jpg"
            alt="KINUAMI U Foam Dispensing System"
            width={500}
            height={600}
            className="shop-acquisition__product"
          />
        </div>
      </div>

      {/* Purchase Card */}
      <div ref={cardRef} className="shop-acquisition__card">
        <h2 className="shop-acquisition__title shop-headline-display shop-acquisition__animate">
          KINUAMI U
        </h2>
        <span className="shop-acquisition__type shop-label shop-acquisition__animate">
          Foam Dispensing System
        </span>

        <div className="shop-divider shop-divider--gold shop-acquisition__animate" />

        <span ref={priceRef} className="shop-acquisition__price shop-acquisition__animate">
          499.00 <span className="shop-acquisition__currency">EUR</span>
        </span>

        <p className="shop-acquisition__includes shop-body shop-muted shop-acquisition__animate">
          Includes: Main unit, wall mount,<br />starter soap cartridge
        </p>

        <button
          className="shop-btn shop-btn--wide shop-acquisition__cta shop-acquisition__animate"
          onClick={handleAcquire}
          disabled={isLoading}
          aria-busy={isLoading}
        >
          {isLoading ? 'LOADING...' : 'ACQUIRE'}
        </button>

        <div className="shop-acquisition__trust shop-acquisition__animate">
          <div className="shop-acquisition__trust-item">
            <svg className="shop-acquisition__trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM19 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
              <path d="M13 16V6a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v8a1 1 0 0 0 1 1h1m8 0H9m4 0h2m0 0a1 1 0 0 1 1-1h2l3-3v7a1 1 0 0 1-1 1h-1" />
            </svg>
            <span className="shop-muted">Free worldwide shipping</span>
          </div>
          <div className="shop-acquisition__trust-item">
            <svg className="shop-acquisition__trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 14l-4-4m0 0l4-4m-4 4h11a4 4 0 0 1 0 8h-1" />
            </svg>
            <span className="shop-muted">30-day return policy</span>
          </div>
        </div>
      </div>
    </section>
  );
}
