'use client';

import { useRef, useEffect, useState } from 'react';
import { useSequenceAnimation } from '@/hooks/useSequenceAnimation';

// Benefit card data - elegant copy
const benefitCards = [
    {
        id: 1,
        heading: 'Frictionless Cleansing',
        description: 'Touch-free foam technology that protects delicate skin.',
        position: 'left'
    },
    {
        id: 2,
        heading: 'Dense Micro-Foam',
        description: 'Ultra-fine bubbles that warm every contour.',
        position: 'right'
    },
    {
        id: 3,
        heading: 'Sanctuary Bathing',
        description: 'Transform washing into a restorative ritual.',
        position: 'left'
    },
    {
        id: 4,
        heading: 'For Everyone',
        description: 'Gentle care for all ages and skin types.',
        position: 'right'
    }
];

export default function SequenceSection() {
    const [isMobile, setIsMobile] = useState(false);

    // Refs for the animation
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const finalRef = useRef<HTMLDivElement>(null);
    const linesRef = useRef<(SVGPathElement | null)[]>([]);

    // Check for mobile on mount
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 992);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Initialize sequence animation
    useSequenceAnimation(
        {
            canvasRef,
            wrapperRef,
            stickyRef,
            cardsRef,
            finalRef,
            linesRef
        },
        {
            imagePath: '/images/sequence/',
            imageCount: 150,
            imagePrefix: '',
            imageExtension: 'webp'
        }
    );

    return (
        <section className="sequence-section-v2" style={{ background: 'var(--cream)' }}>
            {/* Desktop: Scroll-driven animation */}
            {!isMobile && (
                <div className="sequence-scroll-wrap-v2" ref={wrapperRef}>
                    <div className="sequence-sticky-v2" ref={stickyRef} style={{ background: 'var(--cream)' }}>
                        {/* Centered Canvas Container */}
                        <div className="sequence-canvas-container">
                            <div className="sequence-canvas-frame" style={{
                                background: 'var(--white)',
                                boxShadow: 'none',
                                border: 'none'
                            }}>
                                <canvas
                                    ref={canvasRef}
                                    className="sequence-canvas-v2"
                                />
                            </div>
                        </div>

                        {/* Benefit Cards - minimal white cards */}
                        <div className="sequence-cards-v2">
                            {benefitCards.map((card, index) => (
                                <div
                                    key={card.id}
                                    ref={(el) => { cardsRef.current[index] = el; }}
                                    className={`sequence-card is-${card.position} is-card-${index + 1}`}
                                    style={{
                                        background: 'var(--white)',
                                        boxShadow: 'none',
                                        border: 'none',
                                        backdropFilter: 'none'
                                    }}
                                >
                                    <h3 className="sequence-card-heading" style={{
                                        fontFamily: 'var(--font-display)',
                                        fontSize: 'var(--text-heading)',
                                        fontWeight: 300,
                                        lineHeight: 'var(--leading-heading)',
                                        letterSpacing: 'var(--tracking-tight)',
                                        color: 'var(--black)',
                                        textTransform: 'none',
                                        textShadow: 'none',
                                        marginBottom: 'var(--space-3)'
                                    }}>
                                        {card.heading}
                                    </h3>
                                    <p className="sequence-card-description" style={{
                                        fontFamily: 'var(--font-body)',
                                        fontSize: 'var(--text-body)',
                                        lineHeight: 'var(--leading-body)',
                                        color: 'var(--text-muted)'
                                    }}>
                                        {card.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Final heading */}
                        <div className="sequence-final-v2" ref={finalRef}>
                            <h2 style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: 'var(--text-display)',
                                fontWeight: 300,
                                letterSpacing: 'var(--tracking-display)',
                                lineHeight: 'var(--leading-display)',
                                color: 'var(--black)',
                                textAlign: 'center'
                            }}>
                                The Future of Bathing
                            </h2>
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile: Static layout */}
            {isMobile && (
                <div className="sequence-mobile-v2" style={{ background: 'var(--cream)' }}>
                    <div className="sequence-mobile-canvas-wrap" style={{
                        boxShadow: 'none',
                        borderRadius: '0'
                    }}>
                        <img
                            src="/images/sequence/0075.webp"
                            alt="KINUAMI U foam bathing"
                            className="sequence-mobile-image"
                        />
                    </div>
                    <div className="sequence-mobile-cards">
                        {benefitCards.map((card) => (
                            <div
                                key={card.id}
                                className="sequence-card is-mobile"
                                style={{
                                    background: 'var(--white)',
                                    boxShadow: 'none',
                                    padding: 'var(--space-4)',
                                    textAlign: 'left'
                                }}
                            >
                                <h3 style={{
                                    fontFamily: 'var(--font-display)',
                                    fontSize: 'var(--text-heading)',
                                    fontWeight: 300,
                                    lineHeight: 'var(--leading-heading)',
                                    color: 'var(--black)',
                                    marginBottom: 'var(--space-2)'
                                }}>
                                    {card.heading}
                                </h3>
                                <p style={{
                                    fontFamily: 'var(--font-body)',
                                    fontSize: 'var(--text-body)',
                                    lineHeight: 'var(--leading-body)',
                                    color: 'var(--text-muted)',
                                    margin: 0
                                }}>
                                    {card.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}
