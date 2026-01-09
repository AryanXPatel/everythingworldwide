'use client';

import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface UseSequenceAnimationOptions {
    imagePath: string;
    imageCount: number;
    imagePrefix?: string;
    imageExtension?: string;
}

interface UseSequenceAnimationRefs {
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
    wrapperRef: React.RefObject<HTMLDivElement | null>;
    stickyRef: React.RefObject<HTMLDivElement | null>;
    cardsRef: React.RefObject<(HTMLDivElement | null)[]>;
    finalRef: React.RefObject<HTMLDivElement | null>;
    linesRef: React.RefObject<(SVGPathElement | null)[]>;
}

// Custom spring easing for organic motion
const springEase = "elastic.out(1, 0.5)";
const smoothEase = "power3.out";

export function useSequenceAnimation(
    refs: UseSequenceAnimationRefs,
    options: UseSequenceAnimationOptions
) {
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const frameRef = useRef(0);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
    const cardTimelinesRef = useRef<gsap.core.Timeline[]>([]);

    const {
        imagePath,
        imageCount,
        imagePrefix = '',
        imageExtension = 'webp'
    } = options;

    // Preload all images
    const preloadImages = useCallback(() => {
        const images: HTMLImageElement[] = [];
        let loadedCount = 0;

        return new Promise<HTMLImageElement[]>((resolve) => {
            for (let i = 1; i <= imageCount; i++) {
                const img = new Image();
                const paddedNum = String(i).padStart(4, '0');
                img.src = `${imagePath}${imagePrefix}${paddedNum}.${imageExtension}`;

                img.onload = () => {
                    loadedCount++;
                    if (loadedCount === imageCount) {
                        resolve(images);
                    }
                };

                img.onerror = () => {
                    loadedCount++;
                    if (loadedCount === imageCount) {
                        resolve(images);
                    }
                };

                images[i - 1] = img;
            }
        });
    }, [imagePath, imageCount, imagePrefix, imageExtension]);

    // Render a specific frame to canvas
    const renderFrame = useCallback((frameIndex: number) => {
        const canvas = refs.canvasRef.current;
        const ctx = contextRef.current;
        const images = imagesRef.current;

        if (!canvas || !ctx || !images.length) return;

        const clampedIndex = Math.min(Math.max(0, frameIndex), images.length - 1);
        const img = images[clampedIndex];

        if (img && img.complete && img.naturalWidth > 0) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Subtle vignette effect background
            const gradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, canvas.width * 0.7
            );
            gradient.addColorStop(0, '#ffffff');
            gradient.addColorStop(1, '#f5f3f0');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Scale image to CONTAIN
            const scale = Math.min(
                canvas.width / img.naturalWidth,
                canvas.height / img.naturalHeight
            );
            const x = (canvas.width - img.naturalWidth * scale) / 2;
            const y = (canvas.height - img.naturalHeight * scale) / 2;

            ctx.drawImage(
                img,
                x, y,
                img.naturalWidth * scale,
                img.naturalHeight * scale
            );
        }
    }, [refs.canvasRef]);

    // Setup canvas dimensions
    const setupCanvas = useCallback(() => {
        const canvas = refs.canvasRef.current;
        if (!canvas) return;

        const container = canvas.parentElement;
        if (container) {
            const size = Math.min(container.clientWidth, container.clientHeight);
            canvas.width = size * window.devicePixelRatio;
            canvas.height = size * window.devicePixelRatio;
            canvas.style.width = `${size}px`;
            canvas.style.height = `${size}px`;
        }

        contextRef.current = canvas.getContext('2d');

        if (imagesRef.current.length > 0) {
            renderFrame(frameRef.current);
        }
    }, [refs.canvasRef, renderFrame]);

    // Simplified card animations - elegant fade + translateY only
    const animateCards = useCallback((progress: number) => {
        const cards = refs.cardsRef.current;
        if (!cards) return;

        // Simple timing - one card visible at a time
        const cardTimings = [
            { start: 0.05, end: 0.28 },
            { start: 0.28, end: 0.51 },
            { start: 0.51, end: 0.74 },
            { start: 0.74, end: 0.97 },
        ];

        cards.forEach((card, index) => {
            if (!card) return;
            const timing = cardTimings[index];

            if (progress >= timing.start && progress <= timing.end) {
                const localProgress = (progress - timing.start) / (timing.end - timing.start);

                // Simple fade + subtle vertical shift - NO blur, NO rotation, NO 3D
                let opacity: number;
                let translateY: number;

                if (localProgress < 0.2) {
                    // Fade in
                    const t = localProgress / 0.2;
                    opacity = t;
                    translateY = 30 * (1 - t);
                } else if (localProgress < 0.8) {
                    // Hold - fully visible
                    opacity = 1;
                    translateY = 0;
                } else {
                    // Fade out
                    const t = (localProgress - 0.8) / 0.2;
                    opacity = 1 - t;
                    translateY = -15 * t;
                }

                card.style.opacity = String(opacity);
                card.style.visibility = 'visible';
                card.style.transform = `translateY(${translateY}px)`;
                card.style.filter = 'none';
            } else {
                card.style.opacity = '0';
                card.style.visibility = 'hidden';
                card.style.transform = 'translateY(30px)';
                card.style.filter = 'none';
            }
        });

        // Final section - simple fade
        const finalSection = refs.finalRef.current;
        if (finalSection) {
            if (progress > 0.92) {
                const finalProgress = (progress - 0.92) / 0.08;
                finalSection.style.opacity = String(finalProgress);
                finalSection.style.visibility = 'visible';
                finalSection.style.transform = 'none';
            } else {
                finalSection.style.opacity = '0';
                finalSection.style.visibility = 'hidden';
                finalSection.style.transform = 'none';
            }
        }
    }, [refs.cardsRef, refs.finalRef]);

    // Animate decorative lines with drawing effect
    const animateLines = useCallback((progress: number) => {
        const lines = refs.linesRef.current;
        if (!lines) return;

        lines.forEach((path, index) => {
            if (!path) return;

            const length = path.getTotalLength();
            path.style.strokeDasharray = String(length);

            const lineStart = 0.1 + index * 0.15;
            const lineProgress = Math.max(0, Math.min((progress - lineStart) / 0.4, 1));
            const eased = 1 - Math.pow(1 - lineProgress, 3);

            path.style.strokeDashoffset = String(length * (1 - eased));
            path.style.opacity = String(0.15 + (0.15 * eased));
        });
    }, [refs.linesRef]);

    // Canvas - no animation, just stable display
    const animateCanvas = useCallback((_progress: number) => {
        const canvas = refs.canvasRef.current;
        if (!canvas) return;
        // Keep canvas stable - no gimmicky transforms
        canvas.style.transform = 'none';
    }, [refs.canvasRef]);

    // Main scroll animation setup
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const isMobile = window.innerWidth < 992;
        if (isMobile) return;

        let mounted = true;

        const init = async () => {
            const images = await preloadImages();
            if (!mounted) return;

            imagesRef.current = images;
            setupCanvas();

            const wrapper = refs.wrapperRef.current;
            const sticky = refs.stickyRef.current;

            if (!wrapper || !sticky) return;

            scrollTriggerRef.current = ScrollTrigger.create({
                trigger: wrapper,
                start: 'top top',
                end: '+=600%',
                pin: sticky,
                scrub: 1.2, // Smoother scrub for premium feel
                onUpdate: (self) => {
                    const progress = self.progress;

                    const frameIndex = Math.floor(progress * (imageCount - 1));
                    if (frameIndex !== frameRef.current) {
                        frameRef.current = frameIndex;
                        renderFrame(frameIndex);
                    }

                    animateCards(progress);
                    animateLines(progress);
                    animateCanvas(progress);
                }
            });

            const handleResize = () => {
                if (window.innerWidth < 992) return;
                setupCanvas();
                ScrollTrigger.refresh();
            };

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        };

        init();

        return () => {
            mounted = false;
            cardTimelinesRef.current.forEach(tl => tl.kill());
            if (scrollTriggerRef.current) {
                scrollTriggerRef.current.kill();
            }
        };
    }, [
        preloadImages,
        setupCanvas,
        renderFrame,
        animateCards,
        animateLines,
        animateCanvas,
        imageCount,
        refs.wrapperRef,
        refs.stickyRef
    ]);

    return {
        renderFrame,
        setupCanvas
    };
}
