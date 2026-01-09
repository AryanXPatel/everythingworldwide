'use client';

import Image from 'next/image';

export default function SystemShowcase() {
    return (
        <section className="product" id="products">
            <div className="product-media">
                <Image
                    src="/images/products/KINUAMI_U.jpg"
                    alt="KINUAMI U"
                    width={800}
                    height={1000}
                    className="product-image"
                />
            </div>
            <div className="product-info">
                <span className="product-label">The System</span>
                <h2 className="product-name">KINUAMI U</h2>
            </div>
        </section>
    );
}
