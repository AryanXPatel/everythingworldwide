'use client';

import Link from 'next/link';

const ArrowIcon = () => (
    <svg className="button-arrow" fill="none" viewBox="0 0 10 10" width="100%" xmlns="http://www.w3.org/2000/svg">
        <path
            clipRule="evenodd"
            d="M0 1.827 1.71 0H10v8.22L8.11 10V5.93c0-.992.009-1.89.03-2.695l-6.642 6.58-1.316-1.44 6.641-6.58c-.787.022-1.67.032-2.647.032H0Z"
            fill="currentColor"
            fillRule="evenodd"
        />
    </svg>
);

export default function Navbar() {
    return (
        <nav
            className="navbar w-nav"
            data-animation="default"
            data-collapse="medium"
            data-duration="400"
            data-easing="ease"
            data-easing2="ease"
            role="banner"
        >
            <div className="nav-container">
                <div className="grid-layout">
                    <div className="nav-social-media-inner" id="w-node-_084a53a4-1315-9fde-31ee-e99a4811c28c-4811c289">
                        <div
                            className="nav-logo"
                            style={{ fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-0.05em' }}
                        >
                            KINUAMI U
                        </div>
                    </div>

                    <div className="nav-link-inner" id="w-node-_084a53a4-1315-9fde-31ee-e99a4811c293-4811c289">
                        <Link className="nav-link w-inline-block" href="#innovation">
                            <div className="nav-text">Innovation</div>
                        </Link>
                        <Link className="nav-link w-inline-block" href="#benefits">
                            <div className="nav-text">Use Cases</div>
                        </Link>
                        <Link className="nav-link w-inline-block" href="#products">
                            <div className="nav-text">System</div>
                        </Link>
                        <Link className="nav-link w-inline-block" href="/shop">
                            <div className="nav-text">Shop</div>
                        </Link>
                    </div>

                    <Link
                        className="button is-white w-inline-block"
                        href="#buy"
                        id="w-node-c4e2d712-b9aa-e56d-102b-73576293bdd9-4811c289"
                    >
                        <div className="button-cycle is-first">
                            <ArrowIcon />
                            <div className="button-cycle-bg white-bg"></div>
                        </div>
                        <div className="button-bg white-bg">
                            <div className="button-text dark-font">Order Now</div>
                        </div>
                        <div className="button-cycle is-second">
                            <ArrowIcon />
                            <div className="button-cycle-bg white-bg"></div>
                        </div>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
