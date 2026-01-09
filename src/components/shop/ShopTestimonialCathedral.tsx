'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const testimonials = [
  {
    quote: 'Bath time has become my favorite hour.',
    author: 'Daniela A.',
    image: '/images/testimonials/daniela.jpg',
  },
  {
    quote: 'Pure luxury, every single day.',
    author: 'Tina H.',
    image: '/images/testimonials/tina.jpg',
  },
  {
    quote: 'My skin has never felt this soft.',
    author: 'Sandra D.',
    image: '/images/testimonials/sandra.jpg',
  },
];

export default function ShopTestimonialCathedral() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % testimonials.length);
        setIsTransitioning(false);
      }, 300);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const testimonial = testimonials[current];

  return (
    <section className="shop-testimonial shop-section shop-section--cream">
      <div className={`shop-testimonial__content ${isTransitioning ? 'transitioning' : ''}`} aria-live="polite">
        <blockquote className="shop-testimonial__quote shop-headline-display">
          "{testimonial.quote}"
        </blockquote>

        <div className="shop-testimonial__author">
          <div className="shop-testimonial__avatar">
            <Image
              src={testimonial.image}
              alt={testimonial.author}
              width={80}
              height={80}
            />
          </div>
          <span className="shop-testimonial__name shop-label">{testimonial.author}</span>
          <span className="shop-testimonial__badge shop-muted">Verified Owner</span>
        </div>
      </div>
    </section>
  );
}
