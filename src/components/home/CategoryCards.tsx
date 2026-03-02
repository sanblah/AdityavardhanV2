"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";

const categories = [
    {
        title: "Our Story",
        subtitle: "Heritage & Craft",
        href: "/about",
        image: "/images/collection-1.jpg",
    },
    {
        title: "Bespoke Experience",
        subtitle: "The Process",
        href: "/bespoke",
        image: "/images/collection-4.jpg",
    },
    {
        title: "The Journal",
        subtitle: "Lookbook & Stories",
        href: "/journal",
        image: "/images/collection-2.jpg",
    },
    {
        title: "Book Appointment",
        subtitle: "Begin Your Journey",
        href: "/appointment",
        image: "/images/collection-5.jpg",
    },
];

export function CategoryCards() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;
        const cards = containerRef.current.querySelectorAll(".category-card");
        gsap.fromTo(
            cards,
            { opacity: 0, y: 60 },
            {
                opacity: 1,
                y: 0,
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
    }, { scope: containerRef });

    return (
        <section className="relative z-20 bg-brand-black py-24 md:py-32">
            <div ref={containerRef} className="mx-auto max-w-7xl px-6 md:px-12">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {categories.map((cat) => (
                        <Link
                            key={cat.title}
                            href={cat.href}
                            className="category-card group relative block aspect-[3/4] overflow-hidden"
                            style={{ opacity: 0 }}
                        >
                            <Image
                                src={cat.image}
                                alt={cat.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-brand-black/40 transition-all duration-500 group-hover:bg-brand-black/60" />
                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                                <p className="font-heading text-[10px] uppercase tracking-[0.4em] text-brand-gold">
                                    {cat.subtitle}
                                </p>
                                <h3 className="mt-3 font-heading text-xl font-bold uppercase tracking-[0.15em] text-brand-white md:text-2xl">
                                    {cat.title}
                                </h3>
                                <div className="mt-4 h-[1px] w-8 bg-brand-gold transition-all duration-500 group-hover:w-16" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
