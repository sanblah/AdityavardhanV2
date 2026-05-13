"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

const filters = [
    {
        label: "Ceremonial & Occasion Wear",
        subline: "Hand-embroidered, custom-designed ensembles",
        images: [
            "/images/parallax/parallax-15.jpg",
            "/images/parallax/parallax-19.jpg",
            "/images/group/group-10.jpg",
            "/images/group/group-20.jpg",
        ],
    },
    {
        label: "Ethnicwear",
        subline: "Kurtas & contemporary Indian classics",
        images: [
            "/images/group/group-1.jpg",
            "/images/group/group-5.jpg",
            "/images/group/group-14.jpg",
            "/images/group/group-18.jpg",
        ],
    },
    {
        label: "True Bespoke Tailoring",
        subline: "Suiting, shirting & refined formals",
        images: [
            "/images/parallax/parallax-1.jpg",
            "/images/parallax/parallax-11.jpg",
            "/images/parallax/parallax-13.jpg",
            "/images/parallax/parallax-22.jpg",
        ],
    },
    {
        label: "Relaxed Luxury",
        subline: "Elevated everyday wear",
        images: [
            "/images/edited/edited-1.jpg",
            "/images/edited/edited-4.jpg",
            "/images/edited/edited-6.jpg",
            "/images/edited/edited-8.jpg",
        ],
    },
];

export function LookbookGallery() {
    const [activeFilter, setActiveFilter] = useState(filters[0].label);
    const active = useMemo(
        () => filters.find((filter) => filter.label === activeFilter) ?? filters[0],
        [activeFilter]
    );

    return (
        <section className="bg-brand-black pb-24 pt-10 md:pb-32">
            <div className="mx-auto max-w-7xl px-6 md:px-12">
                <div className="flex flex-wrap justify-center gap-3">
                    {filters.map((filter) => (
                        <button
                            key={filter.label}
                            onClick={() => setActiveFilter(filter.label)}
                            className={`min-h-20 max-w-[280px] border px-5 py-3 text-left transition-all duration-300 ${
                                activeFilter === filter.label
                                    ? "border-brand-gold bg-brand-gold/10 text-brand-white"
                                    : "border-brand-white/10 text-brand-white/60 hover:border-brand-white/25 hover:text-brand-white"
                            }`}
                        >
                            <span className="block font-heading text-xs font-demi tracking-[0.12em]">
                                {filter.label}
                            </span>
                            <span className="mt-2 block font-body text-xs font-book leading-relaxed text-brand-white/45">
                                {filter.subline}
                            </span>
                        </button>
                    ))}
                </div>

                <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {active.images.map((src, index) => (
                        <div
                            key={src}
                            className="relative aspect-[3/4] overflow-hidden rounded-sm border border-brand-white/10 bg-brand-white/5"
                        >
                            <Image
                                src={src}
                                alt={`${active.label} ${index + 1}`}
                                fill
                                className="object-cover transition-transform duration-700 hover:scale-105"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
