'use client';

import Image from 'next/image';

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

export default function BenefitsGrid() {
  return (
    <section className="benefits-grid">
      <div className="benefits-grid__inner">
        <SectionHeader number="03" label="Why KINUAMI" />

        <div className="benefits-grid__layout">
          {/* Row 1: Text + Image */}
          <div className="benefits-grid__cell">
            <h3 className="benefits-grid__headline">
              Frictionless<br />Cleansing.
            </h3>
            <p className="benefits-grid__description">
              Touch-free foam technology delivers perfect coverage without manual effort
            </p>
          </div>
          <div className="benefits-grid__cell benefits-grid__cell--image">
            <Image
              src="/images/products/hands_covered_in_foam.jpg"
              alt="Hands covered in dense foam"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>

          {/* Row 2: Image + Text */}
          <div className="benefits-grid__cell benefits-grid__cell--image">
            <Image
              src="/images/products/white_foam_swirl_1.png"
              alt="Dense foam swirl"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="benefits-grid__cell">
            <h3 className="benefits-grid__headline">
              Warmth<br />Retention.
            </h3>
            <p className="benefits-grid__description">
              Dense micro-foam holds warmth longer for a more comfortable bathing experience
            </p>
          </div>

          {/* Row 3: Text + Stat */}
          <div className="benefits-grid__cell">
            <h3 className="benefits-grid__headline">
              For All<br />Skin Types.
            </h3>
            <p className="benefits-grid__description">
              Gentle care formulated for sensitive skin, safe for the whole family
            </p>
          </div>
          <div className="benefits-grid__cell" style={{ textAlign: 'center' }}>
            <span className="benefits-grid__stat">99%</span>
            <p className="benefits-grid__stat-label">Cleaning Power</p>
          </div>
        </div>
      </div>
    </section>
  );
}
