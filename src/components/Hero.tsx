"use client";

import { motion } from "framer-motion";

export function Hero() {
    return (
        <section className="relative z-10 h-screen w-full">
            {/* Content - no video here, uses fixed background */}
            <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                {/* Animated Brand Name */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    <h1 className="font-logo text-[clamp(2rem,8vw,6rem)] uppercase tracking-[0.15em] text-brand-white">
                        ADITYAVARDHAN
                    </h1>
                </motion.div>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    className="mt-8 max-w-xl text-sm font-demi uppercase tracking-[0.25em] text-brand-white/70 md:text-base"
                >
                    Where timeless elegance meets contemporary design
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
