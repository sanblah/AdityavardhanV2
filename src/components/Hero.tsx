"use client";

import { motion } from "framer-motion";
import { BrandLogo } from "./BrandLogo";

export function Hero() {
    return (
        <section className="relative z-10 min-h-[100svh] w-full md:min-h-screen">
            {/* Content - no video here, uses fixed background */}
            <div
                className="flex min-h-[100svh] flex-col items-center justify-center px-5 pb-16 pt-24 text-center md:min-h-screen md:px-6"
                style={{ paddingTop: "calc(6rem + var(--safe-top))" }}
            >
                {/* Animated Brand Name */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    <h1 className="sr-only">ADITYAVARDHAN</h1>
                    <BrandLogo
                        className="h-auto w-[min(90vw,980px)]"
                        alt="ADITYAVARDHAN"
                        priority
                    />
                </motion.div>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    className="mt-6 max-w-[22rem] text-balance text-sm font-book leading-relaxed tracking-[0.06em] text-brand-white/75 md:mt-8 md:max-w-2xl md:text-base md:tracking-[0.08em]"
                >
                    handcrafting lifelong relationships, one personalised ensemble at a time
                </motion.p>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="absolute bottom-8 flex flex-col items-center gap-3 md:bottom-12"
                >
                    <span className="text-xs font-book uppercase tracking-[0.4em] text-brand-white/50">
                        Scroll
                    </span>
                    <motion.div
                        animate={{ y: [0, 6, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="h-10 w-[1px] bg-gradient-to-b from-brand-gold to-transparent"
                    />
                </motion.div>
            </div>
        </section>
    );
}
