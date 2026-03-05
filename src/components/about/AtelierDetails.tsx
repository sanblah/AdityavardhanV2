"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";

const storeImages = [
    { src: "/images/store/store-1.jpg", alt: "Atelier interior" },
    { src: "/images/store/store-2.jpg", alt: "Fabric display" },
    { src: "/images/store/store-3.jpg", alt: "Tailoring workshop" },
];

const pillars = [
    {
        icon: "◇",
        title: "Craftsmanship",
        text: "Every piece is meticulously crafted with attention to the finest details, ensuring unparalleled quality.",
    },
    {
        icon: "◈",
        title: "Heritage",
        text: "Rooted in tradition, our designs celebrate timeless elegance while embracing modern sensibilities.",
    },
    {
        icon: "◆",
        title: "Sustainability",
        text: "We prioritize ethical sourcing and sustainable practices in every step of our creation process.",
    },
];

export function AtelierDetails() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;
        const images = containerRef.current.querySelectorAll(".atelier-image");
        const cards = containerRef.current.querySelectorAll(".pillar-card");

        gsap.fromTo(
            images,
            { opacity: 0, y: 40, scale: 0.95 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%",
                    toggleActions: "play none none none",
                },
            }
        );

        gsap.fromTo(
            cards,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                delay: 0.3,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: cards[0]?.parentElement,
                    start: "top 75%",
                    toggleActions: "play none none none",
                },
            }
        );
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="bg-brand-black py-24 md:py-32">
            <div className="mx-auto max-w-7xl px-6 md:px-12">
                {/* Store Images Grid */}
                <div className="grid gap-4 md:grid-cols-3">
                    {storeImages.map((img) => (
                        <div
                            key={img.src}
                            className="atelier-image relative aspect-[4/3] overflow-hidden"
                            style={{ opacity: 0 }}
                        >
                            <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                        </div>
                    ))}
                </div>

                {/* Philosophy Pillars */}
                <div className="mt-12 grid gap-6 md:mt-24 md:gap-12 md:grid-cols-3">
                    {pillars.map((pillar) => (
                        <div key={pillar.title} className="pillar-card text-center" style={{ opacity: 0 }}>
                            <span className="mb-6 block text-3xl text-brand-gold/80">
                                {pillar.icon}
                            </span>
                            <h3 className="font-heading text-lg font-bold uppercase tracking-[0.15em] text-brand-white">
                                {pillar.title}
                            </h3>
                            <p className="mt-4 font-body text-sm font-book leading-relaxed text-brand-white/50">
                                {pillar.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
