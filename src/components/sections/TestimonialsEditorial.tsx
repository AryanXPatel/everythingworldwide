'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface SectionHeaderProps {
  number: string;
  label?: string;
  dark?: boolean;
}

function SectionHeader({ number, label, dark = false }: SectionHeaderProps) {
  return (
    <div className={`section-header ${dark ? 'section-header--dark' : ''}`} style={{ padding: '0 var(--space-6)' }}>
      <span className="section-number">{number}</span>
      <div className="section-line" />
      {label && <span className="section-label">{label}</span>}
    </div>
  );
}

const heroTestimonials = [
  {
    quote: 'My skin has never felt better.',
    author: 'Sandra D.',
    location: 'Munich, Germany',
    image: '/images/products/woman_washing_back_with_foam.png',
  },
  {
    quote: 'Bath time has been completely transformed.',
    author: 'Daniela A.',
    location: 'Vienna, Austria',
    image: '/images/products/mom_washing_daughter_scene_1.jpg',
  },
  {
    quote: 'A spa experience in my own bathroom.',
    author: 'Tina H.',
    location: 'Zurich, Switzerland',
    image: '/images/products/caregiver_washing_elderly_man_smiling.jpg',
  },
];

const miniTestimonials = [
  {
    quote: 'Bath time transformed.',
    author: 'Daniela A.',
  },
  {
    quote: 'Pure luxury, every day.',
    author: 'Tina H.',
  },
  {
    quote: 'Worth every penny.',
    author: 'Marcus K.',
  },
];

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export default function TestimonialsEditorial() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % heroTestimonials.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const currentTestimonial = heroTestimonials[currentIndex];

  return (
    <section className="testimonials-editorial">
      <SectionHeader number="04" label="Voices" dark />

      {/* Hero Testimonial */}
      <div className="testimonials-hero">
        <div className="testimonials-hero__bg">
          <Image
            src={currentTestimonial.image}
            alt=""
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        <div className="testimonials-hero__content">
          <p className="testimonials-hero__quote">
            {currentTestimonial.quote}
          </p>
          <cite className="testimonials-hero__author">
            — {currentTestimonial.author}
            <span className="testimonials-hero__location">
              {currentTestimonial.location}
            </span>
          </cite>
          <div className="testimonials-indicators">
            {heroTestimonials.map((_, index) => (
              <button
                key={index}
                className={`testimonials-indicator ${
                  index === currentIndex ? 'testimonials-indicator--active' : ''
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mini Testimonials Grid */}
      <div className="testimonials-mini">
        {miniTestimonials.map((testimonial, index) => (
          <div key={index} className="testimonials-mini__item">
            <div className="testimonials-mini__stars">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} />
              ))}
            </div>
            <p className="testimonials-mini__quote">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <cite className="testimonials-mini__author">
              — {testimonial.author}
            </cite>
          </div>
        ))}
      </div>
    </section>
  );
}
