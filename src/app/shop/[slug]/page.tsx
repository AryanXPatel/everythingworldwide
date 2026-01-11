'use client';

import { useState, useEffect } from 'react';
import { useParams, notFound, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import '@/styles/shop.css';
import { getProductBySlug, products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Get adjacent products for navigation
function getAdjacentProducts(currentSlug: string) {
  const currentIndex = products.findIndex((p) => p.slug === currentSlug);
  const prevProduct = currentIndex > 0 ? products[currentIndex - 1] : null;
  const nextProduct = currentIndex < products.length - 1 ? products[currentIndex + 1] : null;
  return { prevProduct, nextProduct };
}

export default function ProductPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);
  const { prevProduct, nextProduct } = getAdjacentProducts(slug);

  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  // Reset state when product changes
  useEffect(() => {
    setQuantity(1);
    setActiveImage(0);
  }, [slug]);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    router.push('/cart');
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <>
      <Navbar />
      <main className="product-page">
        <div className="product-page__grid">
          {/* Product Info - Left Side */}
          <div className="product-page__info">
            <div className="product-page__header">
              <h1 className="product-page__title">{product.name}</h1>
              <span className="product-page__price">
                €{product.price.toFixed(2)}
              </span>
            </div>

            <div className="product-page__divider" />

            {/* Quantity Selector */}
            <div className="product-page__quantity-section">
              <span className="product-page__label">Quantity</span>
              <div className="product-page__quantity">
                <button
                  className="product-page__quantity-btn"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="product-page__quantity-value">{quantity}</span>
                <button
                  className="product-page__quantity-btn"
                  onClick={increaseQuantity}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Buy Now Button */}
            <button className="product-page__buy" onClick={handleAddToCart}>
              Buy Now
            </button>

            {/* Includes */}
            {product.includes && product.includes.length > 0 && (
              <div className="product-page__includes">
                <span className="product-page__includes-label">Includes:</span>
                <ul className="product-page__includes-list">
                  {product.includes.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Product Specifications */}
            {product.specs && product.specs.length > 0 && (
              <div className="product-page__specs">
                <h3 className="product-page__specs-title">Specifications</h3>
                <dl className="product-page__specs-list">
                  {product.specs.map((spec, i) => (
                    <div key={i} className="product-page__spec-row">
                      <dt className="product-page__spec-label">{spec.label}</dt>
                      <dd className="product-page__spec-value">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {/* Product Story */}
            {(product.details || (product.features && product.features.length > 0)) && (
              <div className="product-page__story">
                {product.details && (
                  <p className="product-page__story-text">{product.details}</p>
                )}
                {product.features && product.features.length > 0 && (
                  <ul className="product-page__features">
                    {product.features.map((feature, i) => (
                      <li key={i} className="product-page__feature">{feature}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Product Navigation */}
            <div className="product-page__nav">
              {prevProduct ? (
                <Link href={`/shop/${prevProduct.slug}`} className="product-page__nav-link product-page__nav-link--prev">
                  <span className="product-page__nav-arrow">←</span>
                  <span className="product-page__nav-text">
                    <span className="product-page__nav-label">Previous</span>
                    <span className="product-page__nav-name">{prevProduct.name}</span>
                  </span>
                </Link>
              ) : (
                <div />
              )}
              {nextProduct ? (
                <Link href={`/shop/${nextProduct.slug}`} className="product-page__nav-link product-page__nav-link--next">
                  <span className="product-page__nav-text">
                    <span className="product-page__nav-label">Next</span>
                    <span className="product-page__nav-name">{nextProduct.name}</span>
                  </span>
                  <span className="product-page__nav-arrow">→</span>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>

          {/* Product Images - Right Side */}
          <div className="product-page__images">
            <div className="product-page__main-image">
              <Image
                src={product.images.gallery[activeImage]}
                alt={product.name}
                fill
                className="product-page__img"
                sizes="(max-width: 768px) 100vw, 60vw"
                priority
              />
            </div>

            {/* Thumbnails */}
            {product.images.gallery.length > 1 && (
              <div className="product-page__thumbnails">
                {product.images.gallery.map((img, i) => (
                  <button
                    key={i}
                    className={`product-page__thumbnail ${
                      i === activeImage ? 'active' : ''
                    }`}
                    onClick={() => setActiveImage(i)}
                    aria-label={`View image ${i + 1}`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${i + 1}`}
                      fill
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
