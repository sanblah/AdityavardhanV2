"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface TextRevealProps {
    text: string;
    className?: string;
    tag?: "h1" | "h2" | "h3" | "p";
    delay?: number;
}

export function TextReveal({
    text,
    className = "",
    tag: Tag = "p",
    delay = 0,
}: TextRevealProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;
        const lines = containerRef.current.querySelectorAll(".line-reveal");
        gsap.fromTo(
            lines,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                delay,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
            }
        );
    }, { scope: containerRef });

    // Split text by newlines or sentences for line-by-line reveal
    const lines = text.split("\n").filter(Boolean);

    return (
        <div ref={containerRef}>
            {lines.map((line, i) => (
                <Tag key={i} className={`line-reveal ${className}`} style={{ opacity: 0 }}>
                    {line}
                </Tag>
            ))}
        </div>
    );
}
