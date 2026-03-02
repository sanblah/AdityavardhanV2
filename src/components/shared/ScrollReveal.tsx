"use client";

import { useRef, ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

interface ScrollRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    y?: number;
    duration?: number;
}

export function ScrollReveal({
    children,
    className = "",
    delay = 0,
    y = 40,
    duration = 1,
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!ref.current) return;
        gsap.fromTo(
            ref.current,
            { opacity: 0, y },
            {
                opacity: 1,
                y: 0,
                duration,
                delay,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ref.current,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
            }
        );
    }, { scope: ref });

    return (
        <div ref={ref} className={className} style={{ opacity: 0 }}>
            {children}
        </div>
    );
}
