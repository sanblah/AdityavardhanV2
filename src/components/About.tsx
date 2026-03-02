"use client";

import { motion } from "framer-motion";
import { DrawLineLink } from "./DrawLineLink";

const features = [
    {
        title: "Craftsmanship",
        description: "Every piece is meticulously crafted with attention to the finest details, ensuring unparalleled quality.",
        icon: "◇",
    },
    {
        title: "Heritage",
        description: "Rooted in tradition, our designs celebrate timeless elegance while embracing modern sensibilities.",
        icon: "◈",
    },
    {
        title: "Sustainability",
        description: "We prioritize ethical sourcing and sustainable practices in every step of our creation process.",
        icon: "◆",
    },
];

export function About() {
    return (
        <section
            id="about"
            className="relative z-10 min-h-screen py-16 md:py-32"
        >
            <div className="mx-auto max-w-7xl px-6 md:px-12">
                {/* Header - Liquid Glass Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                    className="mb-12 rounded-3xl border border-brand-white/10 bg-black/25 p-6 text-center backdrop-blur-2xl md:mb-20 md:p-12"
                >
                    <DrawLineLink className="text-brand-gold" strokeWidth={14}>
                        <span className="font-heading text-xs font-bold uppercase tracking-[0.5em] text-brand-gold">
                            About Us
                        </span>
                    </DrawLineLink>
                    <p className="mx-auto mt-6 max-w-3xl font-heading text-xl font-bold leading-relaxed text-brand-white md:mt-8 md:text-2xl lg:text-4xl">
                        We believe in the power of{" "}
                        <span className="text-brand-gold">exceptional design</span>{" "}
                        to transform everyday moments into extraordinary experiences.
                    </p>
                </motion.div>

                {/* Feature Cards - Liquid Glass Style */}
                <div className="grid gap-4 md:grid-cols-3 md:gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-30px" }}
                            transition={{ duration: 1, delay: index * 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                            className="group relative overflow-hidden rounded-2xl border border-brand-white/10 bg-black/25 p-5 backdrop-blur-xl transition-all duration-500 hover:border-brand-white/20 hover:bg-black/35 md:p-8"
                        >
                            {/* Soft Glow on Hover */}
                            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-gold/10 blur-3xl" />
                            </div>

                            {/* Icon */}
                            <span className="mb-4 block text-3xl text-brand-gold/80 md:mb-6">
                                {feature.icon}
                            </span>

                            {/* Content */}
                            <h3 className="mb-3 font-heading text-base font-bold uppercase tracking-[0.15em] text-brand-white md:mb-4 md:text-lg">
                                {feature.title}
                            </h3>
                            <p className="font-body text-sm font-book leading-relaxed text-brand-white/50">
                                {feature.description}
                            </p>

                            {/* Border Accent */}
                            <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-brand-gold/50 transition-all duration-700 group-hover:w-full" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
