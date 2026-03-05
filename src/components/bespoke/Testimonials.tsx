"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const testimonials = [
    {
        quote: "The attention to detail is extraordinary. Every stitch tells a story of craftsmanship that I've never experienced anywhere else.",
        name: "Rajesh Sharma",
        occasion: "Wedding Ensemble",
    },
    {
        quote: "This atelier doesn't just make suits — they create confidence. The moment I put on my bespoke piece, everything changed.",
        name: "Vikram Patel",
        occasion: "Business Collection",
    },
    {
        quote: "From the first consultation to the final fitting, the experience was nothing short of exceptional. Truly bespoke in every sense.",
        name: "Arjun Mehta",
        occasion: "Anniversary Celebration",
    },
];

export function Testimonials() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;
        const cards = containerRef.current.querySelectorAll(".testimonial-card");
        gsap.fromTo(
            cards,
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%",
                    toggleActions: "play none none none",
                },
            }
        );
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative z-10 bg-brand-black py-24 md:py-32">
            <div className="mx-auto max-w-6xl px-6 md:px-12">
                <p className="text-center font-heading text-xs uppercase tracking-[0.4em] text-brand-gold">
                    Client Stories
                </p>
                <h2 className="mt-4 text-center font-heading text-3xl font-bold uppercase tracking-[0.1em] text-brand-white md:text-4xl">
                    Words of Trust
                </h2>

                <div className="mt-10 grid gap-8 md:mt-16 md:gap-12 md:grid-cols-3">
                    {testimonials.map((t) => (
                        <div
                            key={t.name}
                            className="testimonial-card text-center"
                            style={{ opacity: 0 }}
                        >
                            <p className="font-logo text-lg leading-relaxed text-brand-white/80 italic">
                                &ldquo;{t.quote}&rdquo;
                            </p>
                            <div className="mt-8">
                                <p className="font-heading text-sm uppercase tracking-[0.15em] text-brand-gold">
                                    {t.name}
                                </p>
                                <p className="mt-1 font-body text-xs text-brand-white/40">
                                    {t.occasion}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
