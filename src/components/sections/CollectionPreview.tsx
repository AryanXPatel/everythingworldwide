'use client';

import Image from 'next/image';
import Link from 'next/link';
import { SectionHeader } from './PhilosophyStatement';

const products = [
  {
    slug: 'kinuami-u',
    name: 'KINUAMI U',
    subtitle: 'The System',
    price: '€499',
    image: '/images/shop/Hero-product.webp',
    isHero: true,
  },
  {
    slug: 'shower-head',
    name: 'Shower Head',
    subtitle: 'Attachment',
    price: '€79',
    image: '/images/shop/shower-head.webp',
    isHero: false,
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
              className={`collection-preview__card ${product.isHero ? 'collection-preview__card--hero' : ''}`}
            >
              <div className="collection-preview__image">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes={product.isHero ? '(max-width: 768px) 100vw, 60vw' : '(max-width: 768px) 100vw, 40vw'}
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div className="collection-preview__info">
                <h3 className="collection-preview__name">{product.name}</h3>
                <p className="collection-preview__meta">
                  {product.subtitle} — {product.price}
                </p>
                <span className="collection-preview__link">
                  <span className="collection-preview__link-text">Discover</span>
                  <span className="collection-preview__link-arrow" aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
