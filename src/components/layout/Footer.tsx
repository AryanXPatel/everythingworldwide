'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="eww-footer">
      <div className="eww-footer__container">
        {/* Brand Section */}
        <div className="eww-footer__brand">
          <h2 className="eww-footer__logo-text">EWW</h2>
          <p className="eww-footer__full-name">EverythingWorldWide</p>
          <p className="eww-footer__tagline">
            Bringing the science of living a little closer.
          </p>
        </div>

        {/* Divider */}
        <div className="eww-footer__divider" />

        {/* Links */}
        <nav className="eww-footer__links">
          <Link href="/shop" className="eww-footer__link">
            Shop
          </Link>
          <Link href="#contact" className="eww-footer__link">
            Contact
          </Link>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="eww-footer__link"
          >
            Instagram
          </a>
          <Link href="#legal" className="eww-footer__link">
            Legal
          </Link>
        </nav>

        {/* Copyright */}
        <p className="eww-footer__copyright">© 2026 EWW</p>
      </div>
    </footer>
  );
}
