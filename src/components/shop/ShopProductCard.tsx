'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/data/products';

interface ShopProductCardProps {
  product: Product;
  index: number;
  featured?: boolean;
}

export default function ShopProductCard({ product, index, featured = false }: ShopProductCardProps) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className={`shop-product-card ${featured ? 'shop-product-card--featured' : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <article>
        <div className="shop-product-card__image-container">
          <Image
            src={product.images.hero}
            alt={product.name}
            fill
            className="shop-product-card__image"
            sizes={featured ? '(max-width: 768px) 100vw, 60vw' : '(max-width: 768px) 100vw, 40vw'}
          />
          <div className="shop-product-card__image-overlay" />
        </div>
        <div className="shop-product-card__info">
          <h3 className="shop-product-card__name">{product.name}</h3>
          <span className="shop-product-card__price">
            {product.currency === 'EUR' ? '€' : '$'}
            {product.price.toFixed(2)}
          </span>
        </div>
      </article>
    </Link>
  );
}
