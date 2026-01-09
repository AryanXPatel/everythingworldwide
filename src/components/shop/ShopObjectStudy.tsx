'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const specs = {
  form: [
    'Hand-sculpted ergonomics',
    'Bathroom-grade materials',
    'Neutral white finish',
  ],
  function: [
    'Micro-bubble generation',
    'One-touch operation',
    '30-second foam cycle',
  ],
};

export default function ShopObjectStudy() {
  const sectionRef = useRef<HTMLElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const specsContainer = specsRef.current;

    if (!section || !specsContainer) return;

    const specLines = specsContainer.querySelectorAll('.shop-object__spec-line');

    gsap.fromTo(
      specLines,
      { opacity: 0, x: 20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="shop-object shop-section shop-section--cream">
      {/* Image Side */}
      <div
        className="shop-object__image-container"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className={`shop-object__image-wrapper ${isPaused ? 'paused' : ''}`}>
          <Image
            src="/images/products/kinuami-u-detail.png"
            alt="KINUAMI U Detail"
            fill
            sizes="(max-width: 991px) 100vw, 55vw"
            className="shop-object__image"
          />
        </div>
      </div>

      {/* Specs Side */}
      <div ref={specsRef} className="shop-object__specs">
        <div className="shop-object__specs-group">
          <span className="shop-object__specs-label shop-label">Form</span>
          {specs.form.map((spec, i) => (
            <p key={i} className="shop-object__spec-line shop-body">
              {spec}
            </p>
          ))}
        </div>

        <div className="shop-object__specs-group">
          <span className="shop-object__specs-label shop-label">Function</span>
          {specs.function.map((spec, i) => (
            <p key={i} className="shop-object__spec-line shop-body">
              {spec}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
