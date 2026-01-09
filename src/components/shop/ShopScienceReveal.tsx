'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    frontImage: '/images/products/dad_washing_child_laughing.jpg',
    frontAlt: 'Parent washing child with foam',
    backTitle: 'Bubble Architecture',
    backText: 'Each bubble maintains structural integrity 3x longer than conventional soap foam.',
  },
  {
    frontImage: '/images/products/hands_covered_in_foam.jpg',
    frontAlt: 'Dense foam on skin',
    backTitle: 'Temperature Retention',
    backText: 'Micro-foam insulates warmth, maintaining optimal temperature throughout your routine.',
  },
  {
    frontImage: '/images/products/woman_washing_back_smiling.jpg',
    frontAlt: 'Person relaxing',
    backTitle: '99% Efficacy',
    backText: 'Clinical studies demonstrate superior cleansing with 40% less product consumption.',
  },
];

export default function ShopScienceReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      const inner = card.querySelector('.shop-science__card-inner');
      if (!inner) return;

      gsap.to(inner, {
        rotateY: 180,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: section,
          start: `top+=${index * 15}% center`,
          end: `top+=${index * 15 + 30}% center`,
          scrub: 1,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="shop-science shop-section shop-section--dark">
      <div className="shop-science__header">
        <span className="shop-label shop-label--light">THE SCIENCE</span>
        <h2 className="shop-science__headline shop-headline-display">
          Dense foam is not<br />an accident.
        </h2>
      </div>

      <div className="shop-science__cards">
        {cards.map((card, index) => (
          <div
            key={index}
            ref={(el) => { cardsRef.current[index] = el; }}
            className="shop-science__card"
            tabIndex={0}
            role="article"
            aria-label={`${card.backTitle}: ${card.backText}`}
          >
            <div className="shop-science__card-inner">
              {/* Front */}
              <div className="shop-science__card-face shop-science__card-front">
                <Image
                  src={card.frontImage}
                  alt={card.frontAlt}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 991px) 50vw, 33vw"
                  className="shop-science__card-image"
                />
              </div>

              {/* Back */}
              <div className="shop-science__card-face shop-science__card-back">
                <h3 className="shop-science__card-title">{card.backTitle}</h3>
                <p className="shop-science__card-text">{card.backText}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
