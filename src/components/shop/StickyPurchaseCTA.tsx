'use client';

import { useEffect, useState } from 'react';

export default function StickyPurchaseCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling past 50vh (past the hero)
      const scrollThreshold = window.innerHeight * 0.5;
      setIsVisible(window.scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    const acquireSection = document.getElementById('acquire');
    if (acquireSection) {
      acquireSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <button
      className={`sticky-purchase-cta ${isVisible ? 'visible' : ''}`}
      onClick={handleClick}
      aria-label="Scroll to purchase section"
    >
      <span className="sticky-purchase-cta__price">499 EUR</span>
      <span className="sticky-purchase-cta__separator">—</span>
      <span className="sticky-purchase-cta__action">ACQUIRE</span>
    </button>
  );
}
