"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

const filters = [
    {
        label: "Ceremonial & Occasion Wear",
        subline: "Hand-embroidered, custom-designed ensembles",
        images: [
            "/images/parallax/parallax-15.jpg",
            "/images/parallax/parallax-19.jpg",
            "/images/parallax/parallax-21.jpg",
            "/images/parallax/parallax-22.jpg",
            "/images/group/group-10.jpg",
            "/images/group/group-14.jpg",
            "/images/group/group-20.jpg",
            "/images/group/group-21.jpg",
        ],
    },
    {
        label: "Ethnicwear",
        subline: "Kurtas & contemporary Indian classics",
        images: [
            "/images/group/group-1.jpg",
            "/images/group/group-3.jpg",
            "/images/group/group-5.jpg",
            "/images/group/group-8.jpg",
            "/images/group/group-14.jpg",
            "/images/group/group-16.jpg",
            "/images/group/group-18.jpg",
            "/images/group/group-23.jpg",
        ],
    },
    {
        label: "True Bespoke Tailoring",
        subline: "Suiting, shirting & refined formals",
        images: [
            "/images/parallax/parallax-1.jpg",
            "/images/parallax/parallax-3.jpg",
            "/images/parallax/parallax-9.jpg",
            "/images/parallax/parallax-11.jpg",
            "/images/parallax/parallax-12.jpg",
            "/images/parallax/parallax-13.jpg",
            "/images/parallax/parallax-16.jpg",
            "/images/parallax/parallax-22.jpg",
        ],
    },
    {
        label: "Relaxed Luxury",
        subline: "Elevated everyday wear",
        images: [
            "/images/edited/edited-1.jpg",
            "/images/edited/edited-2.jpg",
            "/images/edited/edited-3.jpg",
            "/images/edited/edited-4.jpg",
            "/images/edited/edited-6.jpg",
            "/images/edited/edited-7.jpg",
            "/images/edited/edited-8.jpg",
            "/images/edited/edited-10.jpg",
        ],
    },
];

export function LookbookGallery() {
    const [activeFilter, setActiveFilter] = useState(filters[0].label);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const active = useMemo(
        () => filters.find((filter) => filter.label === activeFilter) ?? filters[0],
        [activeFilter]
    );

    useEffect(() => {
        if (selectedIndex === null) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setSelectedIndex(null);
            }
            if (event.key === "ArrowRight") {
                setSelectedIndex((index) =>
                    index === null ? index : (index + 1) % active.images.length
                );
            }
            if (event.key === "ArrowLeft") {
                setSelectedIndex((index) =>
                    index === null
                        ? index
                        : (index - 1 + active.images.length) % active.images.length
                );
            }
        };

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [active.images.length, selectedIndex]);

    const selectedImage = selectedIndex === null ? null : active.images[selectedIndex];
    const showPrevious = () => {
        setSelectedIndex((index) =>
            index === null ? index : (index - 1 + active.images.length) % active.images.length
        );
    };
    const showNext = () => {
        setSelectedIndex((index) =>
            index === null ? index : (index + 1) % active.images.length
        );
    };

    return (
        <section className="bg-brand-black pb-24 pt-10 md:pb-32">
            <div className="mx-auto max-w-7xl px-6 md:px-12">
                <div className="flex flex-wrap justify-center gap-3">
                    {filters.map((filter) => (
                        <button
                            key={filter.label}
                            onClick={() => {
                                setActiveFilter(filter.label);
                                setSelectedIndex(null);
                            }}
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
                        <button
                            key={src}
                            type="button"
                            onClick={() => setSelectedIndex(index)}
                            className="group relative aspect-[3/4] overflow-hidden rounded-sm border border-brand-white/10 bg-brand-white/5 text-left"
                            aria-label={`Open ${active.label} image ${index + 1}`}
                        >
                            <Image
                                src={src}
                                alt={`${active.label} ${index + 1}`}
                                fill
                                className="object-cover transition-transform duration-700 hover:scale-105"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            />
                            <span className="pointer-events-none absolute inset-0 bg-brand-black/0 transition-colors duration-300 group-hover:bg-brand-black/15" />
                        </button>
                    ))}
                </div>
            </div>

            {selectedImage && selectedIndex !== null && (
                <div
                    className="fixed inset-0 z-[80] flex items-center justify-center bg-brand-black/90 px-4 py-8 backdrop-blur-md"
                    onClick={() => setSelectedIndex(null)}
                >
                    <button
                        type="button"
                        onClick={(event) => {
                            event.stopPropagation();
                            showPrevious();
                        }}
                        className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-brand-white/20 text-2xl text-brand-white/70 transition-colors hover:border-brand-gold hover:text-brand-gold md:left-8"
                        aria-label="Previous image"
                    >
                        ‹
                    </button>
                    <div
                        className="relative h-full max-h-[82vh] w-full max-w-5xl"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <Image
                            src={selectedImage}
                            alt={`${active.label} ${selectedIndex + 1}`}
                            fill
                            className="object-contain"
                            sizes="100vw"
                            priority
                        />
                    </div>
                    <button
                        type="button"
                        onClick={(event) => {
                            event.stopPropagation();
                            showNext();
                        }}
                        className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-brand-white/20 text-2xl text-brand-white/70 transition-colors hover:border-brand-gold hover:text-brand-gold md:right-8"
                        aria-label="Next image"
                    >
                        ›
                    </button>
                    <button
                        type="button"
                        onClick={() => setSelectedIndex(null)}
                        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center border border-brand-white/20 text-xl text-brand-white/70 transition-colors hover:border-brand-gold hover:text-brand-gold md:right-8 md:top-8"
                        aria-label="Close gallery"
                    >
                        ×
                    </button>
                    <p className="absolute bottom-5 left-1/2 -translate-x-1/2 font-body text-xs tracking-[0.2em] text-brand-white/45">
                        {selectedIndex + 1} / {active.images.length}
                    </p>
                </div>
            )}
        </section>
    );
}
