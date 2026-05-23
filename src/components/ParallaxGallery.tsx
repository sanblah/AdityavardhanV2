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

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

    const sectionHeight = collectionItems.length * 100;

    return (
        <>
            <section id="collection" className="relative z-20 bg-brand-black px-5 py-20 md:hidden">
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
                                <h3 className="font-heading text-2xl font-bold tracking-[0.06em] text-brand-white">
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
                className="relative z-20 hidden bg-brand-black md:block"
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
                        className="flex-shrink-0 pt-20"
                        aria-hidden="true"
                    />

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
                                    width: "55vw",
                                    height: "75vh",
                                }}
                            >
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="55vw"
                                />

                                {/* Permanent gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                                {/* Title — always visible */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                                    <h3 className="font-heading text-2xl font-bold tracking-[0.08em] text-brand-white md:text-4xl lg:text-6xl">
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
        </>
    );
}
