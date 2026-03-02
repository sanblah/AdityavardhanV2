"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { JournalCard } from "./JournalCard";

const filters = ["All", "Lookbook", "Behind the Scenes", "Fabric Stories", "Campaign"];

const journalItems = [
    { image: "/images/parallax/parallax-1.jpg", title: "The Eternal Suit", category: "Lookbook", height: "tall" as const },
    { image: "/images/edited/edited-1.jpg", title: "Fabric Heritage", category: "Fabric Stories", height: "short" as const },
    { image: "/images/group/group-1.jpg", title: "The Collective", category: "Campaign", height: "medium" as const },
    { image: "/images/parallax/parallax-9.jpg", title: "Studio Session", category: "Behind the Scenes", height: "tall" as const },
    { image: "/images/collection-3.jpg", title: "The Process", category: "Behind the Scenes", height: "medium" as const },
    { image: "/images/parallax/parallax-11.jpg", title: "Monsoon Edit", category: "Lookbook", height: "short" as const },
    { image: "/images/edited/edited-4.jpg", title: "Italian Wools", category: "Fabric Stories", height: "medium" as const },
    { image: "/images/group/group-5.jpg", title: "Brotherhood", category: "Campaign", height: "tall" as const },
    { image: "/images/parallax/parallax-13.jpg", title: "Modern Gentleman", category: "Lookbook", height: "short" as const },
    { image: "/images/collection-5.jpg", title: "Hand Finishing", category: "Behind the Scenes", height: "medium" as const },
    { image: "/images/edited/edited-6.jpg", title: "Silk & Satin", category: "Fabric Stories", height: "tall" as const },
    { image: "/images/parallax/parallax-15.jpg", title: "Ceremonial Grace", category: "Campaign", height: "medium" as const },
    { image: "/images/group/group-8.jpg", title: "Together We Rise", category: "Campaign", height: "short" as const },
    { image: "/images/parallax/parallax-17.jpg", title: "Portrait Study", category: "Lookbook", height: "tall" as const },
    { image: "/images/edited/edited-8.jpg", title: "The Details", category: "Behind the Scenes", height: "medium" as const },
    { image: "/images/collection-2.jpg", title: "Raw Textiles", category: "Fabric Stories", height: "short" as const },
    { image: "/images/parallax/parallax-19.jpg", title: "Evening Wear", category: "Lookbook", height: "tall" as const },
    { image: "/images/group/group-10.jpg", title: "Celebration", category: "Campaign", height: "medium" as const },
    { image: "/images/edited/edited-10.jpg", title: "Finishing Touch", category: "Behind the Scenes", height: "short" as const },
    { image: "/images/parallax/parallax-22.jpg", title: "Heritage Collection", category: "Lookbook", height: "medium" as const },
    { image: "/images/collection-4.jpg", title: "The Cut", category: "Behind the Scenes", height: "tall" as const },
    { image: "/images/group/group-14.jpg", title: "The Entourage", category: "Campaign", height: "short" as const },
    { image: "/images/parallax/parallax-10.jpg", title: "Bespoke Journey", category: "Lookbook", height: "medium" as const },
    { image: "/images/edited/edited-3.jpg", title: "Linen Waves", category: "Fabric Stories", height: "tall" as const },
    { image: "/images/group/group-18.jpg", title: "Bonds", category: "Campaign", height: "short" as const },
    { image: "/images/parallax/parallax-12.jpg", title: "Classic Tailoring", category: "Lookbook", height: "medium" as const },
    { image: "/images/edited/edited-9.jpg", title: "Thread Work", category: "Behind the Scenes", height: "tall" as const },
    { image: "/images/collection-6.jpg", title: "Final Stitch", category: "Behind the Scenes", height: "short" as const },
    { image: "/images/group/group-20.jpg", title: "Grand Gathering", category: "Campaign", height: "medium" as const },
    { image: "/images/parallax/parallax-16.jpg", title: "Studio Light", category: "Lookbook", height: "tall" as const },
    { image: "/images/edited/edited-7.jpg", title: "Cashmere Touch", category: "Fabric Stories", height: "medium" as const },
    { image: "/images/group/group-3.jpg", title: "Brothers in Style", category: "Campaign", height: "short" as const },
];

export function JournalGrid() {
    const [activeFilter, setActiveFilter] = useState("All");
    const gridRef = useRef<HTMLDivElement>(null);

    const filteredItems =
        activeFilter === "All"
            ? journalItems
            : journalItems.filter((item) => item.category === activeFilter);

    useGSAP(() => {
        if (!gridRef.current) return;
        const cards = gridRef.current.querySelectorAll(".journal-card");
        gsap.fromTo(
            cards,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.08,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            }
        );
    }, { scope: gridRef, dependencies: [activeFilter] });

    return (
        <section className="bg-brand-black py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-6 md:px-12">
                {/* Filter Pills */}
                <div className="mb-12 flex flex-wrap justify-center gap-3">
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-5 py-2 font-heading text-[10px] uppercase tracking-[0.2em] transition-all duration-300 border ${activeFilter === filter
                                    ? "border-brand-gold bg-brand-gold/10 text-brand-gold"
                                    : "border-brand-white/10 text-brand-white/50 hover:border-brand-white/20 hover:text-brand-white/70"
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Masonry Grid */}
                <div
                    ref={gridRef}
                    className="columns-1 gap-4 sm:columns-2 lg:columns-3"
                >
                    {filteredItems.map((item, i) => (
                        <JournalCard key={`${item.image}-${i}`} {...item} />
                    ))}
                </div>
            </div>
        </section>
    );
}
