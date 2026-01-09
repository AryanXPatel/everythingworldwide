// src/components/shop/ShopClosingStatement.tsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ShopClosingStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    wordsRef.current.forEach((word, index) => {
      if (!word) return;

      gsap.fromTo(
        word,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: `top+=${index * 5}% 70%`,
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const words = ['The', 'future', 'of', 'bathing', 'is', 'frictionless.'];

  return (
    <section ref={sectionRef} className="shop-closing shop-section shop-section--dark" aria-label="Closing brand statement">
      <div className="shop-closing__content">
        <p className="shop-closing__statement shop-headline-display">
          {words.map((word, i) => (
            <span
              key={i}
              ref={(el) => { if (el) wordsRef.current[i] = el; }}
              className="shop-closing__word"
            >
              {word}{' '}
            </span>
          ))}
        </p>
        <span className="shop-closing__logo shop-label shop-accent">KINUAMI</span>
      </div>
    </section>
  );
}
