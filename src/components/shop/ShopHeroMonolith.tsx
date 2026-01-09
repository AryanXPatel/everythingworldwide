'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ShopHeroMonolith() {
  const sectionRef = useRef<HTMLElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    const product = productRef.current;
    const headline = headlineRef.current;

    if (!section || !product || !headline) return;

    // Initial animations
    const tl = gsap.timeline({ delay: 0.3 });

    // Product fade in with subtle rotation
    tl.fromTo(
      product,
      { opacity: 0, rotateY: 5, scale: 0.95 },
      { opacity: 1, rotateY: 0, scale: 1, duration: 1.2, ease: 'power3.out' }
    );

    // Headline character reveal
    const chars = headline.querySelectorAll('.shop-hero__char');
    tl.fromTo(
      chars,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.04, ease: 'power3.out' },
      '-=0.6'
    );

    // Subtle parallax on scroll (reduced since page is shorter)
    gsap.to(product, {
      y: 50,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Mouse tracking for subtle product rotation (desktop only)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    if (window.innerWidth > 991) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Split headline into characters
  const headlineText = 'DENSE FOAM.';
  const chars = headlineText.split('').map((char, i) => (
    <span key={i} className="shop-hero__char">
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  return (
    <section ref={sectionRef} className="shop-hero shop-section shop-section--dark">
      {/* Bottom gradient overlay for visual flow */}
      <div className="shop-hero__gradient" aria-hidden="true" />

      {/* Product Image */}
      <div
        ref={productRef}
        className="shop-hero__product"
        style={{
          transform: `perspective(1000px) rotateX(${mousePosition.y * -2}deg) rotateY(${mousePosition.x * 2}deg)`,
        }}
      >
        <Image
          src="/images/products/KINUAMI_U.jpg"
          alt="KINUAMI U Foam Dispensing System"
          width={600}
          height={800}
          priority
          className="shop-hero__product-image"
        />
      </div>

      {/* Headline */}
      <div className="shop-hero__content">
        <h1 ref={headlineRef} className="shop-hero__headline shop-headline-massive">
          {chars}
        </h1>
        <p className="shop-hero__subtitle shop-label shop-label--light">
          THE KINUAMI U FOAM DISPENSING SYSTEM
        </p>
      </div>
    </section>
  );
}
