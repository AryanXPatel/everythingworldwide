'use client';

import Image from 'next/image';

export default function HeroSplit() {
    return (
        <section className="hero">
            {/* Full-viewport product media */}
            <div className="hero-media">
                <Image
                    src="/images/products/kinuami_u_usage_animation.gif"
                    alt="KINUAMI U in action"
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                    unoptimized
                />
            </div>

            {/* Minimal text overlay */}
            <div className="hero-content">
                <h1 className="hero-headline">
                    Dense Foam.
                </h1>
            </div>

            {/* Scroll indicator */}
            <div className="hero-scroll">
                <span className="hero-scroll-text">Scroll</span>
            </div>
        </section>
    );
}
