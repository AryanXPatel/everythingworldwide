'use client';

import { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import '@/styles/shop.css';
import { getProductBySlug, products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/layout/Navbar';
import ShopCart from '@/components/shop/ShopCart';
import ShopCheckoutBar from '@/components/shop/ShopCheckoutBar';
import Footer from '@/components/layout/Footer';

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);

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
    setQuantity(1);
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
      <ShopCart />
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
      <ShopCheckoutBar />
      <Footer />
    </>
  );
}
