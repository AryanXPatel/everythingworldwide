'use client';

import { useRef, useEffect, useState } from 'react';
import { useSequenceAnimation } from '@/hooks/useSequenceAnimation';

// Benefit card data - numbered editorial style
const benefitCards = [
    {
        id: 1,
        number: '01',
        heading: 'Frictionless Cleansing',
        position: 'left'
    },
    {
        id: 2,
        number: '02',
        heading: 'Dense Micro-Foam',
        position: 'right'
    },
    {
        id: 3,
        number: '03',
        heading: 'Sanctuary Bathing',
        position: 'left'
    },
    {
        id: 4,
        number: '04',
        heading: 'For Everyone',
        position: 'right'
    }
];

// Section header component
function SectionHeader({ number, label }: { number: string; label?: string }) {
    return (
        <div className="section-header" style={{
            position: 'absolute',
            top: 'var(--space-6)',
            left: 'var(--space-6)',
            right: 'var(--space-6)',
            zIndex: 10
        }}>
            <span className="section-number">{number}</span>
            <div className="section-line" />
            {label && <span className="section-label">{label}</span>}
        </div>
    );
}

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
                <div className="sequence-scroll-wrap-v2" ref={wrapperRef} style={{ minHeight: '500vh' }}>
                    <div className="sequence-sticky-v2" ref={stickyRef} style={{ background: 'var(--cream)' }}>
                        {/* Section Header */}
                        <SectionHeader number="02" label="The System" />

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

                        {/* Benefit Cards - numbered editorial style */}
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
                                        backdropFilter: 'none',
                                        padding: 'var(--space-6)'
                                    }}
                                >
                                    <span style={{
                                        fontFamily: 'var(--font-body)',
                                        fontSize: 'var(--text-micro)',
                                        fontWeight: 500,
                                        letterSpacing: 'var(--tracking-wide)',
                                        color: 'var(--text-muted)',
                                        display: 'block',
                                        marginBottom: 'var(--space-2)'
                                    }}>
                                        {card.number}
                                    </span>
                                    <h3 className="sequence-card-heading" style={{
                                        fontFamily: 'var(--font-display)',
                                        fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                                        fontWeight: 300,
                                        lineHeight: 1.1,
                                        letterSpacing: '-0.01em',
                                        color: 'var(--black)',
                                        textTransform: 'none',
                                        textShadow: 'none',
                                        margin: 0
                                    }}>
                                        {card.heading}
                                    </h3>
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
                    {/* Mobile Section Header */}
                    <div className="section-header" style={{ marginBottom: 'var(--space-6)' }}>
                        <span className="section-number">02</span>
                        <div className="section-line" />
                        <span className="section-label">The System</span>
                    </div>

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
                                <span style={{
                                    fontFamily: 'var(--font-body)',
                                    fontSize: 'var(--text-micro)',
                                    fontWeight: 500,
                                    letterSpacing: 'var(--tracking-wide)',
                                    color: 'var(--text-muted)',
                                    display: 'block',
                                    marginBottom: 'var(--space-2)'
                                }}>
                                    {card.number}
                                </span>
                                <h3 style={{
                                    fontFamily: 'var(--font-display)',
                                    fontSize: 'var(--text-heading)',
                                    fontWeight: 300,
                                    lineHeight: 1.1,
                                    color: 'var(--black)',
                                    margin: 0
                                }}>
                                    {card.heading}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}
