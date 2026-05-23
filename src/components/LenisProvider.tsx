"use client";

import { useEffect, useRef, ReactNode } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface LenisProviderProps {
    children: ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        const shouldUseNativeScroll =
            window.matchMedia("(max-width: 767px)").matches ||
            window.matchMedia("(pointer: coarse)").matches ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (shouldUseNativeScroll) return;

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            touchMultiplier: 2,
        });

        lenisRef.current = lenis;

        // Sync Lenis scroll position with GSAP ScrollTrigger
        lenis.on("scroll", ScrollTrigger.update);

        // Use GSAP ticker for Lenis RAF loop (ensures sync)
        const tick = (time: number) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(tick);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    return <>{children}</>;
}
