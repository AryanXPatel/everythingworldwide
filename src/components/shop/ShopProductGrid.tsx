'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { products } from '@/data/products';
import ShopProductCard from './ShopProductCard';

gsap.registerPlugin(ScrollTrigger);

export default function ShopProductGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;

    if (!section || !header || !grid) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
    });

    // Animate header
    tl.fromTo(
      header,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    );

    // Animate product cards
    tl.fromTo(
      grid.querySelectorAll('.shop-product-card'),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      },
      '-=0.3'
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="shop-grid-section">
      <div ref={headerRef} className="shop-grid-section__header">
        <span className="shop-grid-section__label">Collection</span>
        <div className="shop-grid-section__line" />
      </div>

      <div ref={gridRef} className="shop-product-grid">
        {products.map((product, index) => (
          <ShopProductCard
            key={product.id}
            product={product}
            index={index}
            featured={index === 0}
          />
        ))}
      </div>
    </section>
  );
}
