'use client';

import Link from 'next/link';

interface SectionHeaderProps {
  number: string;
  label?: string;
  dark?: boolean;
}

function SectionHeader({ number, label, dark = false }: SectionHeaderProps) {
  return (
    <div className={`section-header ${dark ? 'section-header--dark' : ''}`}>
      <span className="section-number">{number}</span>
      <div className="section-line" />
      {label && <span className="section-label">{label}</span>}
    </div>
  );
}

export default function ClosingCTA() {
  return (
    <section className="closing-cta">
      <SectionHeader number="06" dark />
      <div className="closing-cta__content">
        <h2 className="closing-cta__headline">
          Transform Your<br />
          Daily Ritual.
        </h2>
        <Link href="/shop/kinuami-u" className="closing-cta__button">
          Order KINUAMI U
        </Link>
        <div className="closing-cta__details">
          <span className="closing-cta__detail">Free worldwide shipping</span>
          <span className="closing-cta__detail">30-day satisfaction guarantee</span>
        </div>
      </div>
    </section>
  );
}
