"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const collectionItems = [
    { id: 1, title: "Atelier", image: "/images/collection-1.jpg" },
    { id: 2, title: "Ensembles", image: "/images/collection-3.jpg" },
    { id: 3, title: "Materials", image: "/images/collection-2.jpg" },
];

export function ParallaxGallery() {
    const containerRef = useRef<HTMLDivElement>(null);
    const totalSlides = collectionItems.length;
    const sectionHeight = totalSlides * 100;
    const slideTravel = (totalSlides - 1) * 100;

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${slideTravel}vw`]);

    return (
        <div id="collection" className="relative z-20">
            <section className="relative bg-brand-black px-5 py-20 md:hidden">
                <div className="space-y-5">
                    {collectionItems.map((item) => (
                        <article
                            key={item.id}
                            className="relative aspect-[4/5] overflow-hidden rounded-lg border border-brand-white/10"
                        >
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover"
                                sizes="100vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-5">
                                <h3 className="font-heading text-2xl font-book uppercase tracking-[0.06em] text-brand-white">
                                    {item.title}
                                </h3>
                                <div className="mt-3 h-[2px] w-16 bg-brand-gold" />
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section
                ref={containerRef}
                className="relative hidden md:block"
                style={{ height: `${sectionHeight}vh` }}
            >
                {/* Sticky container */}
                <div className="sticky top-0 h-[100svh] overflow-hidden">
                    {/* Horizontal Scroll Track */}
                    <motion.div
                        style={{ x }}
                        className="flex h-full w-max items-stretch gap-0"
                    >
                        {collectionItems.map((item) => (
                            <div
                                key={item.id}
                                className="group relative h-full w-screen flex-shrink-0 overflow-hidden"
                            >
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="100vw"
                                />

                                {/* Permanent gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                                {/* Title — always visible */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                                    <h3 className="font-heading text-2xl font-book uppercase tracking-[0.08em] text-brand-white md:text-4xl lg:text-6xl">
                                        {item.title}
                                    </h3>
                                    <div className="mt-3 h-[2px] w-16 bg-brand-gold transition-all duration-500 group-hover:w-28 md:mt-4 md:w-20 md:group-hover:w-32" />
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
