'use client';

import Image from 'next/image';

export default function HeroEditorial() {
  return (
    <section className="hero-editorial">
      {/* Full-screen GIF Background */}
      <div className="hero-media">
        <Image
          src="/images/products/kinuami_u_usage_animation.gif"
          alt="KINUAMI U in action - dense foam bathing experience"
          fill
          sizes="100vw"
          style={{ objectFit: 'cover' }}
          priority
          unoptimized
        />
      </div>

      {/* Headline Overlay */}
      <div className="hero-overlay">
        <h1 className="hero-editorial-headline">
          Turning Your Shower<br />
          Into a Sanctuary.
        </h1>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll-indicator">
        <span>Scroll</span>
      </div>
    </section>
  );
}
