'use client';

import { useHorizontalScroll } from '@/hooks/useHorizontalScroll';

const statements = [
  { text: 'We didn\'t improve the shower.', highlight: 'We reimagined touch.' },
  { text: '', highlight: '4,000', suffix: ' micro-bubbles per cubic centimeter.' },
  { text: 'Where engineering', highlight: 'becomes sensation.' },
];

export default function ShopManifestoStrip() {
  const { containerRef, trackRef } = useHorizontalScroll({ panels: 3, scrub: 1.2 });

  return (
    <section ref={containerRef} className="shop-manifesto shop-section shop-section--white" aria-label="Brand manifesto statements">
      <div ref={trackRef} className="shop-manifesto__track">
        {statements.map((statement, index) => (
          <div key={index} className="shop-manifesto__panel">
            <p className="shop-manifesto__text shop-statement">
              {statement.text && <span>{statement.text} </span>}
              <span className="shop-accent">{statement.highlight}</span>
              {statement.suffix && <span>{statement.suffix}</span>}
            </p>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="shop-manifesto__progress">
        <div className="shop-manifesto__progress-bar" />
      </div>
    </section>
  );
}
