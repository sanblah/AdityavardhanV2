"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { DrawLineLink } from "./DrawLineLink";
import { useIsMobile } from "@/hooks/useIsMobile";

const collectionItems = [
    { id: 1, title: "The Atelier", subtitle: "Where vision takes form", image: "/images/collection-1.jpg" },
    { id: 2, title: "Crafted Details", subtitle: "Precision in every stitch", image: "/images/collection-4.jpg" },
    { id: 3, title: "Raw Materials", subtitle: "Only the finest textiles", image: "/images/collection-2.jpg" },
    { id: 4, title: "The Studio", subtitle: "A space for creation", image: "/images/collection-5.jpg" },
    { id: 5, title: "Signature Pieces", subtitle: "Defining modern elegance", image: "/images/collection-3.jpg" },
    { id: 6, title: "Behind The Seams", subtitle: "Art meets craftsmanship", image: "/images/collection-6.jpg" },
];

export function ParallaxGallery() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "-85%" : "-65%"]);

    const sectionHeight = collectionItems.length * (isMobile ? 80 : 100);

    return (
        <section
            ref={containerRef}
            id="collection"
            className="relative z-20 bg-brand-black"
            style={{ height: `${sectionHeight}vh` }}
        >
            {/* Sticky container */}
            <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                    className="flex-shrink-0 pb-6 pt-20 text-center"
                >
                    <h2 className="font-heading text-xs font-bold uppercase tracking-[0.5em] text-brand-gold">
                        Our Collection
                    </h2>
                    <DrawLineLink className="mt-4 text-brand-gold" strokeWidth={18}>
                        <span className="font-heading text-2xl font-bold uppercase tracking-[0.2em] text-brand-white md:text-4xl lg:text-5xl">
                            Timeless Pieces
                        </span>
                    </DrawLineLink>
                </motion.div>

                {/* Horizontal Scroll Track */}
                <motion.div
                    style={{ x }}
                    className="flex flex-1 items-stretch gap-4 px-4 md:gap-6 md:px-8"
                >
                    {collectionItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.08 }}
                            className="group relative flex-shrink-0 overflow-hidden rounded-2xl"
                            style={{
                                width: isMobile ? "85vw" : "55vw",
                                height: isMobile ? "60vh" : "75vh",
                            }}
                        >
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes={isMobile ? "85vw" : "55vw"}
                            />

                            {/* Permanent gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                            {/* Title — always visible */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                                <p className="font-heading text-xs font-bold uppercase tracking-[0.4em] text-brand-gold">
                                    {item.subtitle}
                                </p>
                                <h3 className="mt-2 font-heading text-2xl font-bold uppercase tracking-[0.15em] text-brand-white md:mt-3 md:text-4xl lg:text-6xl">
                                    {item.title}
                                </h3>
                                <div className="mt-3 h-[2px] w-16 bg-brand-gold transition-all duration-500 group-hover:w-28 md:mt-4 md:w-20 md:group-hover:w-32" />
                            </div>

                            {/* Border */}
                            <div className="absolute inset-0 rounded-2xl border border-brand-white/10 transition-colors duration-500 group-hover:border-brand-gold/30" />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Scroll progress indicator */}
                <div className="flex-shrink-0 px-6 pb-6 pt-4 md:px-12 md:pb-8">
                    <div className="mx-auto h-[1px] max-w-md bg-brand-white/10">
                        <motion.div
                            style={{ scaleX: scrollYProgress }}
                            className="h-full origin-left bg-brand-gold"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
