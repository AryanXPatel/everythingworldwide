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
          <span className="philosophy-text--light">A precision instrument for</span>{' '}
          <span className="philosophy-text--emphasis">daily ritual.</span>
          <br />
          <span className="philosophy-text--light">Dense foam technology,</span>{' '}
          <span className="philosophy-text--emphasis">engineered simplicity,</span>
          <br />
          <span className="philosophy-text--light">designed for</span>{' '}
          <span className="philosophy-text--emphasis">permanence.</span>
          <br />
          <span className="philosophy-text--light">Bringing the science of cleansing</span>
          <br />
          <span className="philosophy-text--light">a little closer to</span>{' '}
          <span className="philosophy-text--emphasis">you.</span>
        </p>
      </div>
    </section>
  );
}
