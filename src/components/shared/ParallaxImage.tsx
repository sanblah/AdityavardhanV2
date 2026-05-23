"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { useIsMobile } from "@/hooks/useIsMobile";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface ParallaxImageProps {
    src: string;
    alt: string;
    className?: string;
    speed?: number;
}

export function ParallaxImage({
    src,
    alt,
    className = "",
    speed = 0.3,
}: ParallaxImageProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();
    const prefersReducedMotion = usePrefersReducedMotion();

    useGSAP(() => {
        if (isMobile || prefersReducedMotion) return;
        if (!containerRef.current || !imageRef.current) return;
        gsap.fromTo(
            imageRef.current,
            { yPercent: -speed * 100 },
            {
                yPercent: speed * 100,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            }
        );
    }, { scope: containerRef, dependencies: [isMobile, prefersReducedMotion, speed] });

    return (
        <div ref={containerRef} className={`overflow-hidden ${className}`}>
            <div ref={imageRef} className="relative h-[120%] w-full">
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover"
                    sizes="100vw"
                />
            </div>
        </div>
    );
}
