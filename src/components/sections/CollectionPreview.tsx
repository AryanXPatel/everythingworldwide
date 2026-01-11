'use client';

import Image from 'next/image';
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

const products = [
  {
    slug: 'kinuami-u',
    name: 'KINUAMI U',
    subtitle: 'The System',
    price: '€499',
    image: '/images/shop/Hero-product.webp',
  },
  {
    slug: 'shower-head',
    name: 'Shower Head',
    subtitle: 'Attachment',
    price: '€79',
    image: '/images/shop/shower-head.webp',
  },
];

export default function CollectionPreview() {
  return (
    <section className="collection-preview">
      <div className="collection-preview__inner">
        <SectionHeader number="05" label="Collection" />

        <div className="collection-preview__grid">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`/shop/${product.slug}`}
              className="collection-preview__card"
            >
              <div className="collection-preview__image">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  style={{ objectFit: 'contain', padding: '2rem' }}
                />
              </div>
              <h3 className="collection-preview__name">{product.name}</h3>
              <p className="collection-preview__meta">
                {product.subtitle} — {product.price}
              </p>
              <span className="collection-preview__link">
                Discover <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
