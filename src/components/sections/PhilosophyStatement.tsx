'use client';

interface SectionHeaderProps {
  number: string;
  label?: string;
  dark?: boolean;
}

export function SectionHeader({ number, label, dark = false }: SectionHeaderProps) {
  return (
    <div className={`section-header ${dark ? 'section-header--dark' : ''}`}>
      <span className="section-number">{number}</span>
      <div className="section-line" />
      {label && <span className="section-label">{label}</span>}
    </div>
  );
}

export default function PhilosophyStatement() {
  return (
    <section className="philosophy-section">
      <div className="philosophy-content">
        <SectionHeader number="01" />
        <p className="philosophy-text">
          A precision instrument for daily ritual.
          Dense foam technology, engineered simplicity,
          designed for permanence. Bringing the science
          of cleansing a little closer to you.
        </p>
      </div>
    </section>
  );
}
