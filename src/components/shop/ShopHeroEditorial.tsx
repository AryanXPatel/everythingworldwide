'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

export default function ShopHeroEditorial() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const scroll = scrollRef.current;

    if (!section || !title || !scroll) return;

    const tl = gsap.timeline({ delay: 0.2 });

    // Fade in the title
    tl.fromTo(
      title,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );

    // Fade in scroll indicator
    tl.fromTo(
      scroll,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    );

    // Subtle scroll indicator bounce
    gsap.to(scroll, {
      y: 8,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    return () => {
      gsap.killTweensOf([title, scroll]);
    };
  }, []);

  const handleScrollDown = () => {
    const nextSection = document.querySelector('.shop-statement');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="shop-hero-editorial">
      {/* Hero Image */}
      <div className="shop-hero-editorial__image">
        <Image
          src="/images/shop/shop-hero.webp"
          alt="Experience the Kinuami foam dispensing system"
          fill
          priority
          className="shop-hero-editorial__img"
          sizes="100vw"
        />
        <div className="shop-hero-editorial__overlay" />
      </div>

      {/* Title */}
      <div ref={titleRef} className="shop-hero-editorial__content">
        <span className="shop-hero-editorial__label">The Kinuami Collection</span>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollRef}
        className="shop-hero-editorial__scroll"
        onClick={handleScrollDown}
        role="button"
        tabIndex={0}
        aria-label="Scroll to content"
        onKeyDown={(e) => e.key === 'Enter' && handleScrollDown()}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}
