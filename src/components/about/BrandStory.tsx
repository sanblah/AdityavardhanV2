"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";

const storyBlocks = [
    {
        title: "A Legacy of Craft",
        text: "Our atelier was born from a deep reverence for the art of bespoke tailoring. Every garment we create is a testament to generations of sartorial expertise, meticulously refined to meet the standards of the modern gentleman.",
        image: "/images/edited/edited-3.jpg",
    },
    {
        title: "The Pursuit of Perfection",
        text: "We believe that true luxury lies in the details — the hand-finished buttonhole, the perfectly balanced lapel, the fabric that drapes just so. Our master tailors bring decades of experience to every piece, ensuring nothing less than perfection.",
        image: "/images/edited/edited-5.jpg",
    },
    {
        title: "Modern Elegance",
        text: "While our techniques honour tradition, our designs speak to the contemporary world. We blend classic silhouettes with modern sensibilities, creating pieces that feel timeless yet undeniably of the moment.",
        image: "/images/edited/edited-7.jpg",
    },
];

export function BrandStory() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;
        const blocks = containerRef.current.querySelectorAll(".story-block");
        blocks.forEach((block) => {
            const text = block.querySelector(".story-text");
            const image = block.querySelector(".story-image");

            if (text) {
                gsap.fromTo(
                    text,
                    { opacity: 0, x: -40 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: block,
                            start: "top 75%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            }
            if (image) {
                gsap.fromTo(
                    image,
                    { opacity: 0, x: 40, scale: 0.95 },
                    {
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        duration: 1,
                        delay: 0.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: block,
                            start: "top 75%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            }
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="bg-brand-black py-24 md:py-32">
            <div className="mx-auto max-w-6xl space-y-32 px-6 md:px-12">
                {storyBlocks.map((block, i) => {
                    const isReversed = i % 2 === 1;
                    return (
                        <div
                            key={block.title}
                            className={`story-block grid items-center gap-12 md:grid-cols-2 ${isReversed ? "md:[direction:rtl]" : ""
                                }`}
                        >
                            <div className={`story-text space-y-6 ${isReversed ? "md:[direction:ltr]" : ""}`} style={{ opacity: 0 }}>
                                <p className="font-heading text-xs uppercase tracking-[0.4em] text-brand-gold">
                                    0{i + 1}
                                </p>
                                <h3 className="font-heading text-2xl font-bold uppercase tracking-[0.1em] text-brand-white md:text-3xl">
                                    {block.title}
                                </h3>
                                <p className="font-body text-base font-book leading-relaxed text-brand-white/60">
                                    {block.text}
                                </p>
                            </div>
                            <div
                                className={`story-image relative aspect-[4/5] overflow-hidden ${isReversed ? "md:[direction:ltr]" : ""}`}
                                style={{ opacity: 0 }}
                            >
                                <Image
                                    src={block.image}
                                    alt={block.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
