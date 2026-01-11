'use client';

import Image from 'next/image';
import { SectionHeader } from './PhilosophyStatement';

export default function BenefitsGrid() {
  return (
    <section className="benefits-grid">
      <div className="benefits-grid__inner">
        <SectionHeader number="03" label="Why KINUAMI" />

        <div className="benefits-grid__layout">
          {/* Top-left: Frictionless Cleansing text */}
          <div className="benefits-grid__cell benefits-grid__cell--text benefits-grid__cell--text1">
            <h3 className="benefits-grid__headline">
              Frictionless<br />Cleansing.
            </h3>
            <p className="benefits-grid__description">
              Touch-free foam technology delivers perfect coverage without manual effort
            </p>
          </div>

          {/* Top-right: Hand image (spans 2 rows) */}
          <div className="benefits-grid__cell benefits-grid__cell--image benefits-grid__cell--image1">
            <Image
              src="/images/products/hands_covered_in_foam.jpg"
              alt="Hands covered in dense foam"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
            />
          </div>

          {/* Middle-left: Foam blob image */}
          <div className="benefits-grid__cell benefits-grid__cell--image benefits-grid__cell--image2">
            <Image
              src="/images/products/white_foam_swirl_1.png"
              alt="Dense foam swirl"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'contain' }}
            />
          </div>

          {/* Middle-right: Warmth Retention text */}
          <div className="benefits-grid__cell benefits-grid__cell--text benefits-grid__cell--text2">
            <h3 className="benefits-grid__headline">
              Warmth<br />Retention.
            </h3>
            <p className="benefits-grid__description">
              Dense micro-foam holds warmth longer for a more comfortable bathing experience
            </p>
          </div>

          {/* Bottom-left: For All Skin Types text */}
          <div className="benefits-grid__cell benefits-grid__cell--text benefits-grid__cell--text3">
            <h3 className="benefits-grid__headline">
              For All<br />Skin Types.
            </h3>
            <p className="benefits-grid__description">
              Gentle care formulated for sensitive skin, safe for the whole family
            </p>
          </div>

          {/* Bottom-right: 99% stat */}
          <div className="benefits-grid__cell benefits-grid__cell--stat">
            <span className="benefits-grid__stat">99%</span>
            <p className="benefits-grid__stat-label">Cleaning Power</p>
          </div>
        </div>
      </div>
    </section>
  );
}
