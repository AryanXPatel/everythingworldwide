import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UseHorizontalScrollOptions {
  panels: number;
  scrub?: number;
}

export function useHorizontalScroll({ panels, scrub = 1 }: UseHorizontalScrollOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;

    if (!container || !track) return;

    const scrollDistance = (panels - 1) * 100;

    const scrollTween = gsap.to(track, {
      x: `-${scrollDistance}vw`,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: `+=${panels * 100}%`,
        pin: true,
        scrub,
        anticipatePin: 1,
      },
    });

    return () => {
      scrollTween.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === container) t.kill();
      });
    };
  }, [panels, scrub]);

  return { containerRef, trackRef };
}
